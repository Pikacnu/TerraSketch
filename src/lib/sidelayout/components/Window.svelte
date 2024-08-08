<script lang="ts">
	import ResizeHandleHorizontal from './ResizeHandleHorizontal.svelte';

	export let height: number; // Height of the window
	export let index: number; // Index of the window
	export let onResize: (event: MouseEvent, index: number) => void; // Resize handler function

	// Components to render in tabs
	export let components: { [key: string]: any }; // A mapping of tab names to components

	// Track the selected tab index
	let selectedTab = 0;
	let tabNames = Object.keys(components);

	// Function to set the selected tab
	function selectTab(tabIndex: number) {
		selectedTab = tabIndex;
	}
</script>

<div class="window" style="height: {height}%; position: relative;">
	<div class="tabs">
		{#each tabNames as tabName, i}
			<span class:selected={selectedTab === i} on:click={() => selectTab(i)}>
				{tabName}
			</span>
		{/each}
	</div>
	<div class="content">
		{#if components[tabNames[selectedTab]]}
			<svelte:component this={components[tabNames[selectedTab]]} />
		{/if}
	</div>
	{#if index < 2}
		<ResizeHandleHorizontal onMouseDown={(event) => onResize(event, index)} />
	{/if}
</div>

<style lang="scss">
	.window {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;

		.tabs {
			width: 100%;
			height: 32px;
			display: flex;
			align-items: center;

			span {
                position: relative;
				color: white;
				font-size: 0.6rem;
				font-weight: bold;
				letter-spacing: 0.5px;
				padding: 0px 8px;
				cursor: pointer;
				background: transparent;
				transition: background 0.3s ease;
				height: 32px;
				display: flex;
				justify-content: center;
				align-items: center;
				user-select: none;
                border: 1px solid rgba(255, 255, 255, 0);

				&.selected {
					background: rgba(255, 255, 255, 0.05); // Match the content background
                    border: 1px solid rgba(255, 255, 255, 0.1);

                    &::before {
                    width: 100%;
                    height: 4px;
                    content: '';
					background: #232425; /* Color for the content */
					position: absolute; /* Optional: to position it relative to the div */
					bottom: -3px;
				}
				}

				&:hover {
					background: rgba(255, 255, 255, 0.1); // Slight hover effect
				}

			
			}
		}

		.content {
			width: 100%;
			height: 100%;
			background: rgba(255, 255, 255, 0.05);
			border: 1px solid rgba(255, 255, 255, 0.1);
		}
	}
</style>
