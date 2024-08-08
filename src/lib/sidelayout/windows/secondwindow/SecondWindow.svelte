<script lang="ts">
    import Window from '../../components/Window.svelte';
    
    import Features from './tabs/Features.svelte';
    import Transform from './tabs/Transform.svelte';
    import Color from './tabs/Color.svelte';

    const components = {
        'Transform': Transform,
        'Features': Features,
        'Color': Color,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    height={100} 
    index={1} 
    onResize={onResize} 
    components={components}
/>
