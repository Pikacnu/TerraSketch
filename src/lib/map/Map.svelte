<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { initializeMap } from "../../utils/mapUtils";
  import {
    initializeKeyboardListeners,
    removeKeyboardListeners,
  } from "../../utils/keyboardUtils";
  import { storeLayers } from "../../utils/saveLayers";
  import { attributionText } from "../../utils/mapUtils";

  let mapContainer: HTMLElement;

  onMount(() => {
    if (mapContainer) {
      initializeMap(mapContainer);
      initializeKeyboardListeners(); // Set up keyboard listeners
    }
  });

  onDestroy(() => {
    removeKeyboardListeners(); // Clean up keyboard listeners
  });
</script>

<div bind:this={mapContainer} class="map-container">
  <button on:click={storeLayers} class="save">Save</button>
  <div class="info">
    <div id="coordinates"></div>
    <div id="attribution">© {$attributionText}</div>
  </div>
</div>

<style lang="scss">
  .map-container {
    flex: 1;
    height: 100%;
    position: relative;

    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 5;
      margin: 12px;

      #coordinates {
        color: white;
        font-size: 0.8rem;
        background: rgba(0, 0, 0, 0.6);
        padding: 8px;

      }

      #attribution {
        background: rgba(255, 255, 255, 0.8);
        padding: 8px;
        font-size: 0.8rem;
      }
    }

    .save {
      position: absolute;
      z-index: 5;
      bottom: 0;
      right: 0;
      margin: 12px;
      cursor: pointer;
      padding: 8px 16px;
      background-color: green;
      border-top: 3px solid rgba(255, 255, 255, 0.1);
      border-left: 3px solid rgba(255, 255, 255, 0.1);
      border-bottom: 3px solid rgba(0, 0, 0, 0.3);
      border-right: 3px solid rgba(0, 0, 0, 0.3);
      font-size: 0.6rem;
      font-weight: bold;
      color: white;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
</style>
