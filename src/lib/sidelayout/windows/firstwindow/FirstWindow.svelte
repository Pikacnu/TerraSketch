<script lang="ts">
    import Window from '../../components/Window.svelte';
    
    import PolygonCreator from './tabs/PolygonCreator.svelte';
    import Convertor from './tabs/Convertor.svelte';

    const components = {
        'Polygon Creator': PolygonCreator,
        'Convertor': Convertor,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    height={100} 
    index={0} 
    onResize={onResize} 
    components={components}
/>
