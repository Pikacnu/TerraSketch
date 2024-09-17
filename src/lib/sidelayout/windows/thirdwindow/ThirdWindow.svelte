<script lang="ts">
    import Window from '../../components/Window.svelte';
    import Layers from './tabs/Layers.svelte';
    import Images from './tabs/Images.svelte';

    const components = {
        'Layers': Layers,
        'Images': Images,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    index={2} 
    components={components}
/>
