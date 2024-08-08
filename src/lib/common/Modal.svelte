<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import '@fortawesome/fontawesome-free/css/all.css';

    export let show: boolean = false;
    export let title: string = ''; // Default title

    const dispatch = createEventDispatcher();

    function handleOverlayClick() {
        dispatch('close');
    }

    function handleCloseClick() {
        dispatch('close');
    }
</script>

{#if show}
    <div class="modal-overlay" on:click={handleOverlayClick}>
        <div class="modal-content" on:click|stopPropagation>
            <div class="modal-header">
                <h2>{title}</h2>
                <button class="close-button" on:click={handleCloseClick}>
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    $modal-bg: rgb(23, 25, 26);
    $overlay-bg: rgba(0, 0, 0, 0.6);
    $box-shadow: 4px 4px 0px 0px green;
    $transition: 0.3s ease;
    $header-bg:       rgba(255, 255, 255, 0.05);
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: $overlay-bg;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        .modal-content {
            background: $modal-bg;
            color: white;
            max-width: 500px;
            width: 90%;
            box-shadow: $box-shadow;
            transition: width $transition;
            overflow: hidden;

            @media (min-width: 768px) {
                width: 80%;
            }

            @media (min-width: 1024px) {
                width: 70%;
            }

            @media (min-width: 1200px) {
                width: 60%;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: $header-bg;
                padding: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);

                h2 {
                    margin: 0;
                    font-size: 0.8rem;
                    font-weight: bold;
                    padding-top: 4px;
                }

                .close-button {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.25rem;
                    cursor: pointer;
                    transition: color 0.3s ease;

                    &:hover {
                        color: red;
                    }
                }
            }

            .modal-body {
                padding: 1rem;
            }
        }
    }
</style>
