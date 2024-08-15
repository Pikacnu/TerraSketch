<script lang="ts">
	import WindowButton from "$lib/common/WindowButton.svelte";



	function handlePaste(): void {
		throw new Error("Function not implemented.");
	}


	function handleGenerate(): void {
		throw new Error("Function not implemented.");
	}
</script>

<div class="polygon-creator">
	<span style="color: white;">work in progress</span>
	<!-- <div class="btn-container">
		<WindowButton 
        onClick={handlePaste} 
        iconClass="fas fa-paste" 
        label="Paste" 
        minHeight="32px" 
        width="auto" 
        flexGrow={true} 
    />
    <WindowButton 
        onClick={handleGenerate} 
        iconClass="fas fa-cogs" 
        label="Generate" 
        minHeight="32px" 
        width="auto" 
        flexGrow={true} 
    />
	</div>
	<div class="latlng-list">
		<div class="latlng">1.2343w5235, 103.345354</div>
	</div> -->
</div>

<style lang="scss">
	.polygon-creator {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 8px;

		.btn-container {
			display: flex;
			gap: 8px;
			padding-bottom: 8px;
		}

		.latlng-list {
            height: 90px;
            overflow: auto;
			.latlng {
				width: 100%;
				display: flex;
				align-items: center;
				padding: 12px;
				background: rgba(255, 255, 255, 0.05);
				border: 1px solid rgba(255, 255, 255, 0.1);
				color: white;
				font-size: 0.8rem;
			}
		}
	}
</style>
