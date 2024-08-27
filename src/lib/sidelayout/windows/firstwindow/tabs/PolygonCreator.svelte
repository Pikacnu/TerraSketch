<script lang="ts">
  import WindowButton from "$lib/common/WindowButton.svelte";
  import { activeLayerId, addPolygonToLayer, vectorLayers } from "../../../../../utils/mapUtils";

  // Explicitly type the coordinates array as an array of tuples
  let coordinates: [number, number][] = [];

  async function handlePaste() {
    try {
      // Step 1: Retrieve clipboard content
      const clipboardText = await navigator.clipboard.readText();

      // Step 2: Split and parse the coordinates
      const [lat, lng] = clipboardText
        .split(",")
        .map((coord) => parseFloat(coord.trim()));

      // Step 3: Validate and add the coordinates to the array
      if (!isNaN(lat) && !isNaN(lng)) {
        // Unshift the new coordinates to place them at the top
        coordinates = [[lng, lat], ...coordinates];
      } else {
        alert("Invalid coordinates in clipboard.");
      }
    } catch (error) {
      alert("Failed to read clipboard contents.");
    }
  }

  function handleGenerate(): void {
	coordinates.push(coordinates[0]);
    addPolygonToLayer(coordinates, activeLayerId!);
	coordinates = [];
  }

  function deleteCoordinate(index: number): void {
    coordinates = coordinates.filter((_, i) => i !== index);
  }
</script>

<div class="polygon-creator">
  <div class="btn-container">
    <WindowButton
      onClick={handlePaste}
      iconClass="fas fa-paste"
      label="Paste"
      minHeight="32px"
      width="auto"
      flexGrow={true}
    />
    <WindowButton
      onClick={handleGenerate}
      iconClass="fas fa-cogs"
      label="Generate"
      minHeight="32px"
      width="auto"
      flexGrow={true}
    />
  </div>
  <div id="latlng-list">
    {#each coordinates as [lat, lng], index}
      <div class="latlng">
        <div class="coord-info">
          <span>Latitude: {lat}</span>
          <span>Longitude: {lng}</span>
        </div>
        <div class="delete-icon" on:click={() => deleteCoordinate(index)}>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .polygon-creator {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 8px;

    .btn-container {
      display: flex;
      gap: 8px;
      padding-bottom: 8px;
      user-select: none;
    }

    #latlng-list {
      height: 100%;
      overflow-y: scroll;
      scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
      scrollbar-width: thin;

      .latlng {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);

        .coord-info {
          display: flex;
          flex-direction: column;

          span {
            color: white;
            font-size: 0.8rem;
            user-select: none;
          }
        }

        .delete-icon {
          cursor: pointer;
          color: white;
          align-self: center;

          &:hover {
            color: red;
          }

          i {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>
