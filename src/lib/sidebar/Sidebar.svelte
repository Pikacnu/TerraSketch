<script lang="ts">
    import { onMount } from 'svelte';
    import Button from '../common/Button.svelte';
    import Modal from '../common/Modal.svelte'; // Ensure the correct path to the Modal component
    import {
        enableDrawing,
        enableMoveMode,
        enableModifyMode,
        onSelectionChange,
        deleteSelectedFeatures,
        initializeMap
    } from '../../utils/mapUtils'; // Adjust path to the utils file

    import { changeMapTileLayer } from '../../utils/mapUtils'; // Import the function
    import { MapTileLayer } from '../../utils/mapTileUtils'; // Import the enum

    let showModal = false;
    let mapContainer: any;
    let featuresSelected = false; // Track if features are selected
    let isMoveMode = true; // Track if the move mode is active
    let isModifyMode = false; // Track if the modify mode is active

    function toggleModal() {
        showModal = !showModal;
    }

    function toggleMoveMode() {
        enableMoveMode();
        isMoveMode = true;
        isModifyMode = false;
    }

    function toggleModifyMode() {
        enableModifyMode();
        isMoveMode = false;
        isModifyMode = true;
    }

    // Functions to switch drawing modes
    function drawPolygon() {
        enableDrawing('Polygon');
    }

    function drawCircle() {
        enableDrawing('Circle');
    }

    function drawRectangle() {
        enableDrawing('Box'); // Use 'Box' for rectangles
    }

    function drawLineString() {
        enableDrawing('LineString');
    }

    function drawPoint() {
        enableDrawing('Point');
    }

    function deleteFeature() {
        deleteSelectedFeatures();
    }

    // Function to change the map's tile layer
    function changeToOSM() {
        changeMapTileLayer(MapTileLayer.OSM);
    }

    function changeToOneMap() {
        changeMapTileLayer(MapTileLayer.OneMap);
    }

    function changeToBlank() {
        changeMapTileLayer(MapTileLayer.Blank);
    }

    onMount(() => {
        if (mapContainer) {
            initializeMap(mapContainer); // Initialize map with the container
        }
        // Set up selection change listener
        onSelectionChange((selectedFeatures) => {
            featuresSelected = selectedFeatures.getLength() > 0;
            if (!featuresSelected) {
                toggleMoveMode(); // Ensure move mode is active if no features are selected
            }
        });
    });
</script>

<aside class="sidebar">
    <div class="top-buttons">
        {#if !featuresSelected}
            <!-- <Button iconClass="far fa-circle-dot" label="" onClick={drawPoint} /> -->
            <Button iconClass="fas fa-slash" label="" onClick={drawLineString} />
            <Button iconClass="fas fa-draw-polygon" label="" onClick={drawPolygon} />
            <Button iconClass="far fa-square" label="" onClick={drawRectangle} />
            <!-- <Button iconClass="far fa-circle" label="" onClick={drawCircle} /> -->
        {/if}
        {#if featuresSelected}
            <Button iconClass="fas fa-arrows-alt" label="" onClick={toggleMoveMode} bordered={isMoveMode} />
            <Button iconClass="fas fa-pen-fancy" label="" onClick={toggleModifyMode} bordered={isModifyMode} />
            <Button iconClass="fas fa-trash-can" label="" onClick={deleteFeature} danger />
        {/if}
    </div>
    <div class="bottom-buttons">
        <Button iconClass="fas fa-info" label="" />
        <Button iconClass="fas fa-cog" label="" onClick={toggleModal} />
    </div>
</aside>

<Modal title="Settings" show={showModal} on:close={toggleModal}>
    <button on:click={changeToOSM}>osm</button>
    <button on:click={changeToOneMap}>onemap</button>
    <button on:click={changeToBlank}>blank</button>
</Modal>

<style lang="scss">
    .sidebar {
        width: 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: rgb(23, 25, 26);
        padding: calc((48px - 36px) / 2) 0;
    }

    .top-buttons,
    .bottom-buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc((48px - 36px) / 2); // space between buttons
    }
</style>
