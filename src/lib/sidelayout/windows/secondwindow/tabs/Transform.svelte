<script lang="ts">
	import {
		rotateSelectedFeatures,
		flipSelectedFeaturesVertically,
		flipSelectedFeaturesHorizontally
	} from '../../../../../utils/mapUtils';
	import { onMount } from 'svelte';
	import WindowButton from '$lib/common/WindowButton.svelte';
	import '@fortawesome/fontawesome-free/css/all.css';

	let rotationAngle = 0; // Current rotation angle

	function rotate(angle: number) {
		rotateSelectedFeatures(angle);
		rotationAngle = (rotationAngle + angle) % 360; // Update and keep rotation within 0-359 degrees
		if (rotationAngle < 0) {
			rotationAngle += 360; // Handle negative angles
		}
	}

	function updateRotationFromSlider(event: Event) {
		const target = event.target as HTMLInputElement;
		const angle = parseFloat(target.value);
		const delta = angle - rotationAngle; // Calculate the difference from current angle
		rotate(delta); // Rotate by the difference
	}

	function flipVertically() {
		flipSelectedFeaturesVertically();
	}

	function flipHorizontally() {
		flipSelectedFeaturesHorizontally();
	}

	onMount(() => {
		// Set initial rotation value if needed
		rotationAngle = 0;
	});
</script>

<div class="transform-controls">
	<div class="buttons">
		<div class="row">
			<WindowButton onClick={() => rotate(90)} iconClass="fas fa-redo" label="-90°" width="auto" flexGrow={true} />
			<WindowButton onClick={() => rotate(-90)} iconClass="fas fa-undo" label="+90°" width="auto" flexGrow={true} />
			<WindowButton onClick={() => rotate(45)} iconClass="fas fa-redo" label="-45°" width="auto" flexGrow={true} />
			<WindowButton onClick={() => rotate(-45)} iconClass="fas fa-undo" label="+45°" width="auto" flexGrow={true} />
		</div>
		<div class="row">
			<WindowButton onClick={flipVertically} iconClass="fas fa-arrows-alt-v" label="Flip Vertically" width="auto" flexGrow={true} />
			<WindowButton onClick={flipHorizontally} iconClass="fas fa-arrows-alt-h" label="Flip Horizontally" width="auto" flexGrow={true} />
		</div>
	</div>
	<input
		type="range"
		min="0"
		max="360"
		value={rotationAngle}
		on:input={updateRotationFromSlider}
		class="slider"
	/>
	<span>Rotation: {rotationAngle}°</span>
</div>

<style lang="scss">
	$slider-height: 16px;
	$slider-thumb-size: 16px;
	$slider-color: rgba(221, 221, 221, 0.1);
	$slider-thumb-color: green;
	$slider-thumb-hover-color: rgb(53, 120, 56);

	.transform-controls {
		width: 100%;
		height: 100%;
		padding: 8px;
        text-align: center;

		.row {
			width: 100%;
			display: flex;
			justify-content: space-around;
			gap: 8px;
			padding-bottom: 8px;

		}

		input[type='range'] {
			appearance: none;
			-webkit-appearance: none;
			width: 100%;
			height: $slider-height;
			background: $slider-color;
			outline: 1px solid rgba(255, 255, 255, 0.2);
			transition: opacity 0.2s;
            margin-bottom: 8px;

			// Style the slider thumb
			&::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: $slider-thumb-size;
				height: $slider-thumb-size;
				background: $slider-thumb-color;
                border: 1px solid rgba(255, 255, 255, 0.2);
				cursor: pointer;
				transition: background 0.2s;

				&:hover {
					background: $slider-thumb-hover-color;
				}
			}

			&::-moz-range-thumb {
				width: $slider-thumb-size;
				height: $slider-thumb-size;
				background: $slider-thumb-color;
                border: 1px solid rgba(255, 255, 255, 0.2);
				cursor: pointer;
				transition: background 0.2s;

				&:hover {
					background: $slider-thumb-hover-color;
				}
			}
		}

        span {
            color: white;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: bold;
            font-size: 0.6rem;
			user-select: none;
        }
	}
</style>
