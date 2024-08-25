<script lang="ts">
    import Window from '../../components/Window.svelte';
    import Layers from './tabs/Layers.svelte';

    const components = {
        'Layers': Layers,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    height={100} 
    index={2} 
    onResize={onResize} 
    components={components}
/>
