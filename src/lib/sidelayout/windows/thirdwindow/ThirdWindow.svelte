<script lang="ts">
    import Window from '../../components/Window.svelte';
    
    import Layers from './tabs/Layers.svelte';
    import Geojson from './tabs/Geojson.svelte';

    const components = {
        'Layers': Layers,
        'GeoJSON': Geojson,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    height={100} 
    index={2} 
    onResize={onResize} 
    components={components}
/>
