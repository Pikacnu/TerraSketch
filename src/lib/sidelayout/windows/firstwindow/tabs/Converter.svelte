<script lang="ts">
    import WindowButton from "$lib/common/WindowButton.svelte";
    import { fromGeo, toGeo } from "@bte-germany/terraconvert";
  
    let topInput: string = "";
    let bottomInput: string = "";
    let isConvertingLatLng: boolean = true;
  
    function handleConvertClick() {
      console.log('Converting with isConvertingLatLng:', isConvertingLatLng);
      if (isConvertingLatLng) {
        // Validate the input format for LatLng
        const regex = /^([+-]?\d+(\.\d+)?)\s*,\s*([+-]?\d+(\.\d+)?)$/;
        const match = topInput.match(regex);
  
        if (match) {
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[3]);
  
          // Convert latitude and longitude to the desired coordinate system
          const coords = fromGeo(lat, lng);
  
          // Update the second input field with the converted coordinates
          bottomInput = `${coords[0]}, y, ${coords[1]}`;
        } else {
          alert('Invalid LatLng format. Please use "latitude, longitude".');
        }
      } else {
        // Validate the input format for Minecraft coordinates
        const regex = /^\s*([-+]?\d+(\.\d+)?)\s*,\s*([-+]?\d+(\.\d+)?)\s*,\s*([-+]?\d+(\.\d+)?)\s*$/;
        const match = topInput.match(regex);
  
        if (match) {
          // Logic for Minecraft to LatLng conversion (to be implemented)
          const x = parseFloat(match[1]);
          const y = parseFloat(match[3]);
          const z = parseFloat(match[5]);

          // Example: Conversion to geographic coordinates (LatLng)
          const coords = toGeo(x, z);
          bottomInput = `${coords[0]}, ${coords[1]}`;
        } else {
          alert('Invalid Minecraft format. Please use "x, y, z".');
        }
      }
    }
  
    function copyConvertedResult() {
      const inputElement = document.getElementById("convertedInput") as HTMLInputElement;
  
      if (inputElement) {
        const textToCopy = inputElement.value;
  
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert("Text copied to clipboard!");
        }).catch((err) => {
          alert("Failed to copy text!");
        });
      }
    }
  
    function handleSwapClick() {
      // Toggle the boolean value
      isConvertingLatLng = !isConvertingLatLng;
      topInput = "";
      bottomInput = "";

    }
  </script>
  
  <div class="converter">
    <div class="input">
      <input
        type="text"
        placeholder={isConvertingLatLng ? "LatLng coordinates..." : "Minecraft coordinates..."}
        bind:value={topInput}
      />
      <button on:click={handleConvertClick}>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  
    <div class="convert-btn">
      <WindowButton iconClass="fas fa-right-left" onClick={handleSwapClick} />
    </div>
  
    <div class="input">
      <input
        id="convertedInput"
        type="text"
        placeholder={isConvertingLatLng ? "Minecraft coordinates..." : "LatLng coordinates..."}
        bind:value={bottomInput}
        disabled
      />
      <button on:click={copyConvertedResult}>
        <i class="fa-regular fa-copy"></i>
      </button>
    </div>
  </div>
  
  <style lang="scss">
    .converter {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 8px;
  
      .input {
        height: 36px;
        width: 100%;
        display: flex;
  
        button {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }
  
        input {
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          font-size: 0.8rem;
  
          &:disabled {
            opacity: 0.6;
          }
        }
      }
  
      .convert-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }
  </style>
  