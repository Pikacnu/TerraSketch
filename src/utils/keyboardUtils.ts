// src/utils/keyboardUtils.ts

import { getMap, getSelectInteraction, deleteSelectedFeatures } from './mapUtils';
import VectorLayer from 'ol/layer/Vector';

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        deleteSelectedFeatures();
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
