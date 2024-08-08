<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createVectorLayer,
		removeVectorLayer,
		setActiveLayer,
		getMap,
		importGeoJSON
	} from '../../../../../utils/mapUtils';
	import WindowButton from '$lib/common/WindowButton.svelte';
	import type { Vector as VectorLayer } from 'ol/layer';
	import type { Feature } from 'ol';
	import Geometry from 'ol/geom/Geometry';
	import Vector from 'ol/source/Vector';
	import Circle from 'ol/geom/Circle';
	import { generateCircleVertices, transformToLatLng } from '../../../../../utils/exportLayers';
	import LineString from 'ol/geom/LineString';
	import Polygon from 'ol/geom/Polygon';

	interface Layer {
		id: string; // Unique ID
		name: string; // Display name
		visible: boolean;
	}

	let layers: Layer[] = [];
	let newLayerName: string = '';
	let selectedLayerId: string | null = null;
	let fileInput: HTMLInputElement;

	onMount(() => {
		const initialLayer = createVectorLayer('Layer 1');
		const initialLayerId = initialLayer.get('id');

		layers.push({ id: initialLayerId, name: 'Layer 1', visible: true });
		setActiveLayer(initialLayerId);
		selectedLayerId = initialLayerId;

		console.log('Mounted with initial layer:', initialLayerId);
	});

	// Function to add a new layer
	function addLayer() {
		const name = newLayerName.trim() || `Layer ${layers.length + 1}`;
		const newLayer = createVectorLayer(name);
		const newLayerId = newLayer.get('id');

		layers.push({ id: newLayerId, name: name, visible: true });
		setActiveLayer(newLayerId);
		selectedLayerId = newLayerId;

		console.log(`Added and activated layer: ${name} with ID: ${newLayerId}`);
		newLayerName = ''; // Clear the input field
	}

	// Function to delete the selected layer
	function deleteLayer() {
		if (selectedLayerId) {
			removeVectorLayer(selectedLayerId);
			layers = layers.filter((layer) => layer.id !== selectedLayerId);
			console.log(`Deleted layer with ID: ${selectedLayerId}`);
			selectedLayerId = null; // Clear the selection
		}
	}

	// Function to select a layer by its unique ID
	function selectLayer(layerId: string) {
		if (selectedLayerId !== layerId) {
			setActiveLayer(layerId);
			selectedLayerId = layerId;
			console.log(`Selected layer with ID: ${layerId}`);
		} else {
			console.log(`Layer with ID ${layerId} is already active.`);
		}
	}

	// Function to toggle the visibility of a layer
	function toggleVisibility(layer: Layer, event: Event) {
		event.stopPropagation(); // Prevent the click event from bubbling up
		layer.visible = !layer.visible;
		const mapLayer = getMap()
			.getLayers()
			.getArray()
			.find((l) => l.get('id') === layer.id) as VectorLayer;
		if (mapLayer) {
			mapLayer.setVisible(layer.visible);
			console.log(`Toggled visibility for ${layer.name} to ${layer.visible}`);
		}
	}

	// Function to handle GeoJSON file import
	async function handleImport(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			try {
				await importGeoJSON(file);
				const newLayer = getMap().getLayers().getArray().slice(-1)[0] as VectorLayer;
				const newLayerId = newLayer.get('id') as string;

				layers.push({ id: newLayerId, name: file.name, visible: true });
				setActiveLayer(newLayerId);
				selectedLayerId = newLayerId;

				console.log('GeoJSON file imported and added as new layer:', newLayerId);
			} catch (error) {
				console.error('Error importing GeoJSON file:', error);
			}
		}
	}

	function handleExport() {
		if (selectedLayerId) {
			const features = getFeaturesOfSelectedLayer(selectedLayerId);

			// List to store final coordinates
			let finalList: [number, number][][] = [];

			if (features) {
				// Process each feature in the featureList
				features.forEach((feature) => {
					// Get the geometry from the feature
					const geometry = feature.getGeometry();

					if (geometry) {
						// Check if geometry is not undefined
						if (geometry instanceof Circle) {
							// If the geometry is a Circle
							const flatCoordinates = geometry.getFlatCoordinates();
							const latLngCoordinates = transformToLatLng(flatCoordinates);

							// Ensure that we have exactly two points: center and a point on the circumference
							if (latLngCoordinates.length >= 2) {
								const circleVertices = generateCircleVertices(
									[latLngCoordinates[0], latLngCoordinates[1]],
									100
								);
								finalList.push(circleVertices);
							}
						} else if (geometry instanceof LineString || geometry instanceof Polygon) {
							// If the geometry is a LineString or Polygon
							const flatCoordinates = geometry.getFlatCoordinates();
							const latLngCoordinates = transformToLatLng(flatCoordinates);

							finalList.push(latLngCoordinates);
						} else if ('getFlatCoordinates' in geometry) {
							// Use a type guard to check if geometry has getFlatCoordinates method
							const flatCoordinates = (geometry as any).getFlatCoordinates(); // Use type assertion to bypass errors
							const latLngCoordinates = transformToLatLng(flatCoordinates);
							latLngCoordinates.pop();

							finalList.push(latLngCoordinates);
						}
					}
				});
			}

      console.log(finalList);

		} else {
			console.log('No layer selected.');
		}
	}

	// Function to get features of the selected layer
	function getFeaturesOfSelectedLayer(layerId: string): Feature<Geometry>[] | null {
		const map = getMap();
		const layer = map
			.getLayers()
			.getArray()
			.find((l) => l.get('id') === layerId) as VectorLayer;

		if (layer) {
			const source = layer.getSource();
			if (source && source instanceof Vector) {
				return source.getFeatures();
			}
		}
		return null;
	}

	// Function to trigger the file input click
	function triggerFileInput() {
		if (fileInput) {
			fileInput.click();
		}
	}
</script>

<div class="layers-manager">
	<div class="row">
		<WindowButton
			onClick={triggerFileInput}
			iconClass="fas fa-download"
			label="Import"
			width="auto"
			flexGrow={true}
		/>
		<WindowButton
			onClick={handleExport}
			iconClass="fas fa-upload"
			label="Export"
			width="auto"
			flexGrow={true}
		/>
		<input
			type="file"
			accept=".geojson"
			on:change={handleImport}
			bind:this={fileInput}
			style="display: none;"
		/>
	</div>
	<div class="list">
		{#each layers as layer}
			<div
				class="layer-item {selectedLayerId === layer.id ? 'selected' : ''}"
				on:click={() => selectLayer(layer.id)}
			>
				<span>{layer.name}</span>
				<input
					type="checkbox"
					checked={layer.visible}
					on:change={(event) => toggleVisibility(layer, event)}
				/>
			</div>
		{/each}
	</div>
	<div class="controls">
		<button on:click={addLayer}><i class="fas fa-plus"></i></button>
		<button on:click={deleteLayer} disabled={!selectedLayerId}
			><i class="fas fa-trash-can"></i></button
		>
	</div>
</div>

<style lang="scss">
	.layers-manager {
		width: 100%;
		height: 100%;
		padding: 8px;
		display: flex;
		flex-direction: column;

		.row {
			width: 100%;
			display: flex;
			justify-content: space-around;
			gap: 8px;
			padding-bottom: 8px;
		}

		.list {
			flex: 1;
			overflow-y: auto;

			.layer-item {
				padding: 8px;
				height: 32px;
				margin-bottom: 5px;
				background: rgba(255, 255, 255, 0.1);
				cursor: pointer;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: white;
				transition: background 0.3s;

				span {
					font-size: 0.8rem;
					font-weight: bold;
				}

				&:hover {
					background: rgba(255, 255, 255, 0.1);
				}

				&.selected {
					background: rgba(255, 255, 255, 0.2);
				}

				input[type='checkbox'] {
					margin-left: 10px;
					cursor: pointer;
				}
			}
		}

		.controls {
			width: 100%;
			height: 32px;
			background: rgba(255, 255, 255, 0.05);
			display: flex;
			justify-content: flex-end;

			button {
				width: 32px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				background: rgba(255, 255, 255, 0.1);
				border: 1px solid rgba(255, 255, 255, 0.05);
				cursor: pointer;
				font-weight: bold;
				text-transform: uppercase;

				i {
					font-size: 0.8rem;
				}

				&:disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}
			}
		}
	}
</style>
