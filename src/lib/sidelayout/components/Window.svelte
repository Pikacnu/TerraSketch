<script lang="ts">
  import { onMount } from 'svelte';
	export let index: number; // Index of the window

	// Components to render in tabs
	export let components: { [key: string]: any }; // A mapping of tab names to components

	// Track the selected tab index
	let selectedTab = 0;
	let tabNames = Object.keys(components);

	// Function to set the selected tab
	function selectTab(tabIndex: number) {
		selectedTab = tabIndex;
	}

	onMount(() => {
		const element = document.getElementById("windowsContainer");
		const rect = element!.getBoundingClientRect();
	});
</script>

<div class="window" style="position: relative;">
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
</div>

<style lang="scss">
	.window {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
		height: calc(100%/3);
		margin-bottom: 6px;

		&:last-child {
			margin-bottom: 0;
		}

		.tabs {
			width: 100%;
			height: 28px;
			display: flex;
			align-items: center;
			background: rgba(255, 255, 255, 0.02);

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
				height: 28px;
				display: flex;
				justify-content: center;
				align-items: center;
				user-select: none;
                border: 1px solid rgba(255, 255, 255, 0);

				&.selected {
					background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);

                    &::before {
                    width: 100%;
                    height: 4px;
                    content: '';
					background: #232425;
					position: absolute;
					bottom: -3px;
				}
				}

				&:hover {
					background: rgba(255, 255, 255, 0.1);
				}
			}
		}

		.content {
			flex: 1;
			width: 100%;
			background: rgba(255, 255, 255, 0.05);
			border: 1px solid rgba(255, 255, 255, 0.1);
			overflow: auto;
		}
	}
</style>
