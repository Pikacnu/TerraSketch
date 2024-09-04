<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../common/Button.svelte";
  import Modal from "../common/Modal.svelte"; // Ensure the correct path to the Modal component
  import {
    enableDrawing,
    enableMoveMode,
    enableModifyMode,
    onSelectionChange,
    deleteSelectedFeatures,
    initializeMap,
    moveToLocation,
    attributionText,
  } from "../../utils/mapUtils"; // Adjust path to the utils file

  import { changeMapTileLayer } from "../../utils/mapUtils"; // Import the function
  import { MapTileLayer } from "../../utils/mapTileUtils"; // Import the enum

  let showModal = false;
  let mapContainer: HTMLElement;
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
    enableDrawing("Polygon");
  }

  function drawCircle() {
    enableDrawing("Circle");
  }

  function drawRectangle() {
    enableDrawing("Box"); // Use 'Box' for rectangles
  }

  function drawLineString() {
    enableDrawing("LineString");
  }

  function drawPoint() {
    enableDrawing("Point");
  }

  function deleteFeature() {
    deleteSelectedFeatures();
  }

  // Function to change the map's tile layer
  function changeToOSM() {
    changeMapTileLayer(MapTileLayer.OSM);
    attributionText.set("OpenStreetMap contributors");
  }

  function changeToSingaporeOneMap() {
    changeMapTileLayer(MapTileLayer.SgOneMap);
    moveToLocation(1.2968385068315018, 103.84873212021657, 16);
    attributionText.set("Singapore Land Authority");
  }

  function changeToHongKongGeodata() {
    changeMapTileLayer(MapTileLayer.HkGeoData);
    moveToLocation(22.317398261032935, 114.17602235778912, 16);
    attributionText.set("Hong Kong Geodata");
  }

  function changeToTaiwanNlsc() {
    changeMapTileLayer(MapTileLayer.TwNlsc);
    moveToLocation(25.043068726118506, 121.51940799136668, 16);
    attributionText.set("Taiwan NLSC");
  }

  function changeToTaiwanTaipeiUdd() {
    changeMapTileLayer(MapTileLayer.TwTpeUdd);
    moveToLocation(25.043068726118506, 121.51940799136668, 16);
    attributionText.set("Taipei UDD");
  }

  function changeToJapanGsi() {
    changeMapTileLayer(MapTileLayer.JpGsi);
    moveToLocation(35.70385573841528, 139.74940023465922, 16);
    attributionText.set("Japan GSI");
  }

  function changeToKoreaNaver() {
    changeMapTileLayer(MapTileLayer.KrNaver);
    moveToLocation(37.53071864244086, 127.001106171178, 16);
    attributionText.set("Korea Naver Maps");
  }

  function changeToBlank() {
    changeMapTileLayer(MapTileLayer.Blank);
    moveToLocation(0, 0, 2);
    attributionText.set("TerraSketch");
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
      <Button
        iconClass="fas fa-arrows-alt"
        label=""
        onClick={toggleMoveMode}
        bordered={isMoveMode}
      />
      <Button
        iconClass="fas fa-pen-fancy"
        label=""
        onClick={toggleModifyMode}
        bordered={isModifyMode}
      />
      <Button
        iconClass="fas fa-trash-can"
        label=""
        onClick={deleteFeature}
        danger
      />
    {/if}
  </div>
  <div class="bottom-buttons">
    <Button iconClass="fas fa-info" label="" />
    <Button iconClass="fas fa-cog" label="" onClick={toggleModal} />
  </div>
</aside>

<Modal title="Settings" show={showModal} on:close={toggleModal}>
  <h3>Map tiles</h3>
  <div class="tiles-container">
    <button class="settings-tile" on:click={changeToBlank}>blank</button>
    <button class="settings-tile" on:click={changeToOSM}>OSM</button>
    <button class="settings-tile" on:click={changeToSingaporeOneMap}
      >Singapore</button
    >
    <button class="settings-tile" on:click={changeToHongKongGeodata}
      >Hong Kong</button
    >
    <button class="settings-tile" on:click={changeToTaiwanNlsc}>Taiwan</button>
    <button class="settings-tile" on:click={changeToTaiwanTaipeiUdd}
      >Taiwan (Taipei)</button
    >
    <button class="settings-tile" on:click={changeToJapanGsi}>Japan</button>
    <button class="settings-tile" on:click={changeToKoreaNaver}>Korea</button>
  </div>
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

  h3 {
    padding-left: 4px;
    padding-bottom: 8px;
    font-weight: bold;
    font-size: 0.8rem;
  }

  .tiles-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    .settings-tile {
      padding: 8px;
      height: 84px;
      width: 84px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 0.8rem;
    }
  }
</style>
