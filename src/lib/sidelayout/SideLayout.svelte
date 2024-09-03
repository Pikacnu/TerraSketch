<script lang="ts">
    import Button from '../common/Button.svelte';
    import FirstWindow from './windows/firstwindow/FirstWindow.svelte';
    import SecondWindow from './windows/secondwindow/SecondWindow.svelte';
    import ThirdWindow from './windows/thirdwindow/ThirdWindow.svelte';
    import { moveToLocation } from '../../utils/mapUtils'; // Import the moveToLocation function
  
    let sidebarWidth = 320; // Initial sidebar width
    let isResizingSidebar = false; // Flag to indicate if sidebar resizing is active
    let isResizingWindow = false; // Flag to indicate if window resizing is active
    let startX = 0; // Initial mouse x-coordinate for sidebar
    let startY = 0; // Initial mouse y-coordinate for window
    let initialSidebarWidth = sidebarWidth; // Initial width of the sidebar
    let windowHeights: number[] = [33.33, 33.33, 33.34]; // Initial heights for each of the 3 windows
    let windowIndex = 0; // Index of the window being resized
  
    let searchCoordinates: string = ''; // Variable to hold the input for coordinates
  
    // Function to handle mousedown event for sidebar resizing
    function handleMouseDownSidebar(event: MouseEvent) {
      isResizingSidebar = true;
      startX = event.clientX; // Record the initial mouse x-coordinate
      initialSidebarWidth = sidebarWidth; // Store the initial sidebar width
      document.addEventListener('mousemove', handleMouseMoveSidebar);
      document.addEventListener('mouseup', handleMouseUp);
    }
  
    // Function to handle mousemove event for sidebar resizing
    function handleMouseMoveSidebar(event: MouseEvent) {
      if (isResizingSidebar) {
        const deltaX = startX - event.clientX;
        const newWidth = initialSidebarWidth + deltaX; // Adjust width based on movement
        const minSidebarWidth = 200; // Minimum sidebar width
        const maxSidebarWidth = 600; // Maximum sidebar width
  
        if (newWidth >= minSidebarWidth && newWidth <= maxSidebarWidth) {
          sidebarWidth = newWidth;
        }
      }
    }
  
    // Function to handle mousedown event for window resizing
    function handleMouseDownWindow(event: MouseEvent, index: number) {
      isResizingWindow = true;
      startY = event.clientY; // Record the initial mouse y-coordinate
      windowIndex = index; // Store the index of the window being resized
      document.addEventListener('mousemove', handleMouseMoveWindow);
      document.addEventListener('mouseup', handleMouseUp);
    }
  
    // Function to handle mousemove event for window resizing
    function handleMouseMoveWindow(event: MouseEvent) {
      if (isResizingWindow) {
        const deltaY = event.clientY - startY;
        const totalHeight = document.querySelector('.windows')?.clientHeight || 0;
        const percentChange = (deltaY / totalHeight) * 100;
  
        // Adjust heights of the two windows being resized
        windowHeights[windowIndex] += percentChange;
        windowHeights[windowIndex + 1] -= percentChange;
  
        // Ensure no window has a height less than 10%
        if (windowHeights[windowIndex] < 10 || windowHeights[windowIndex + 1] < 10) {
          windowHeights[windowIndex] -= percentChange;
          windowHeights[windowIndex + 1] += percentChange;
        }
  
        startY = event.clientY; // Update the starting y-coordinate
      }
    }
  
    // Function to handle mouseup event for both resizing actions
    function handleMouseUp() {
      isResizingSidebar = false;
      isResizingWindow = false;
      document.removeEventListener('mousemove', handleMouseMoveSidebar);
      document.removeEventListener('mousemove', handleMouseMoveWindow);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  
    // Function to parse and move to the specified coordinates
    function moveToCoordinates() {
      const [lat, lng] = searchCoordinates.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        moveToLocation(lat, lng, 12); // Use a default zoom level of 12
      } else {
        alert('Invalid coordinates format. Please use "lat, lng" format.');
      }
    }
  </script>
  
  <aside class="sidelayout" style="width: {sidebarWidth}px">
    <div class="resize-handle" on:mousedown={handleMouseDownSidebar}>
      <span></span>
    </div>
    <div class="content">
      <div class="search-container">
        <input
          id="search"
          type="text"
          placeholder="Move to location..."
          bind:value={searchCoordinates}
        />
        <Button onClick={moveToCoordinates} iconClass="fas fa-search" label="" width="36px" height="36px" />
      </div>
      <div class="windows" id="windowsContainer">
        <FirstWindow onResize={handleMouseDownWindow} />
        <SecondWindow onResize={handleMouseDownWindow} />
        <ThirdWindow onResize={handleMouseDownWindow} />
      </div>
    </div>
  </aside>
  
  <style lang="scss">
    .sidelayout {
      background: rgb(23, 25, 26);
      position: relative;
      overflow: auto;
      box-sizing: border-box;
      display: flex;
    }
  
    .resize-handle {
      width: 12px;
      height: 100%;
      cursor: ew-resize;
      display: flex;
      align-items: center;
      justify-content: center;
  
      span {
        height: 32px;
        width: 2px;
        background: white;
        border-radius: 32px;
      }
    }
  
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 12px 12px 6px 0px;
  
      .search-container {
        display: flex;
        margin-bottom: 6px;
        width: 100%;
        height: 36px;
  
        #search {
          border: none;
          background: rgba(255, 255, 255, 0.1);
          flex: 1;
          font-size: 0.8rem;
          padding: 12px;
          color: white;
  
          &:focus {
            background-color: rgba(255, 255, 255, 0.05);
            outline: none;
          }
        }
      }
  
      .windows {
        height: calc(100% - 36px);
      }
    }
  </style>
  