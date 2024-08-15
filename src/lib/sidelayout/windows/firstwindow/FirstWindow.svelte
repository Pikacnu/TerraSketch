<script lang="ts">
    import Window from '../../components/Window.svelte';
    
    import PolygonCreator from './tabs/PolygonCreator.svelte';
    import Converter from './tabs/Converter.svelte';

    const components = {
        'Polygon Creator': PolygonCreator,
        'Converter': Converter,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    height={100} 
    index={0} 
    onResize={onResize} 
    components={components}
/>
