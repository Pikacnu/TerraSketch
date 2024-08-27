<script lang="ts">
    import '@fortawesome/fontawesome-free/css/all.css';

    // Define props
    export let iconClass: string;
    export let label: string = ''; // Default label
    export let width: string = '32px'; // Default width
    export let minHeight: string = '32px'; // Default min-height
    export let onClick: () => void = () => {}; // Default onClick handler
    export let flexGrow: boolean = false; // Prop for flex grow
</script>

<button 
    class="btn" 
    style="width: {flexGrow ? 'auto' : width}; flex-grow: {flexGrow ? 1 : 0}; min-height: {minHeight};" 
    on:click={onClick}
>
    <i class={iconClass}></i>
    {label}
</button>

<style lang="scss">
    .btn {
        flex: 1;
        min-height: 32px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        padding: 8px;
        font-size: 0.8rem;
        border: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        user-select: none;

        i {
            font-size: 0.8rem;
            padding-right: 4px;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
</style>
