<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { initializeMap } from '../../utils/mapUtils';
    import { initializeKeyboardListeners, removeKeyboardListeners } from '../../utils/keyboardUtils';

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

<div bind:this={mapContainer} class="map-container"></div>

<style>
    .map-container {
        flex: 1;
        height: 100%;
    }
</style>
