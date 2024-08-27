<script lang="ts">
    import Window from '../../components/Window.svelte';
    
    import Features from './tabs/Features.svelte';
    import Transform from './tabs/Transform.svelte';

    const components = {
        'Transform': Transform,
        'Features': Features,
    };

    export let onResize: (event: MouseEvent, index: number) => void;

</script>

<Window
    index={1} 
    components={components}
/>
