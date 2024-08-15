import { getMap, getSelectInteraction, deleteSelectedFeatures, copySelectedFeatures, pasteCopiedFeatures } from './mapUtils';

function handleKeyDown(event: KeyboardEvent) {
    // Check if the focused element is inside the table in Features.svelte
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement.closest('table')) {
        // If the focused element is within a table, do not proceed with map-related operations
        return;
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
        deleteSelectedFeatures();
    }

    // Handle Ctrl+C (Copy)
    if (event.key === 'c' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // Prevent the default copy action
        copySelectedFeatures();
    }

    // Handle Ctrl+V (Paste)
    if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault(); // Prevent the default paste action
        pasteCopiedFeatures();
    }
}

/**
 * Initializes keyboard event listeners for handling map interactions.
 */
export function initializeKeyboardListeners() {
    if (typeof window !== 'undefined') {
        // Check if window is defined to ensure this runs only in the browser
        window.addEventListener('keydown', handleKeyDown);
    }
}

/**
 * Removes keyboard event listeners to clean up resources.
 */
export function removeKeyboardListeners() {
    if (typeof window !== 'undefined') {
        // Check if window is defined to ensure this runs only in the browser
        window.removeEventListener('keydown', handleKeyDown);
    }
}
