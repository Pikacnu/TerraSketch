<script lang="ts">
    import WindowButton from "$lib/common/WindowButton.svelte";
    import { selectedFeature } from "../../../../../utils/mapUtils";
    import { onDestroy } from "svelte";
    import Feature from "ol/Feature";

    let feature: Feature | null = null;
    let customProperties: { [key: string]: any } = {};
    let previousValues: { [key: string]: any } = {}; // To track previous values

    // Subscribe to the selectedFeature store
    const unsubscribe = selectedFeature.subscribe((value) => {
        // Commit any changes to the current feature before switching
        if (feature) {
            commitFeatureChanges();
        }

        // Now switch to the new feature
        feature = value;

        console.log('Feature selected or updated:', feature);
        if (feature) {
            const properties = feature.getProperties();
            
            // Filter out the geometry property and initialize customProperties
            customProperties = Object.fromEntries(
                Object.entries(properties).filter(([key]) => key !== 'geometry')
            );

            // Store current customProperties in previousValues
            previousValues = { ...customProperties };
        } else {
            // Reset both customProperties and previousValues when no feature is selected
            customProperties = {};
            previousValues = {};
        }
    });

    // Clean up subscription when the component is destroyed
    onDestroy(() => {
        unsubscribe();
    });

    // Helper function to get feature type
    function getFeatureType(): string {
        if (feature) {
            return feature.getGeometry()?.getType() || "Unknown";
        }
        return "No feature selected";
    }

    // Function to commit changes to the current feature before switching
    function commitFeatureChanges() {
        if (!feature) return;

        for (const key in customProperties) {
            if (customProperties[key] !== previousValues[key]) {
                feature.set(key, customProperties[key]); // Update the feature with the new value
                previousValues[key] = customProperties[key]; // Update previousValues to reflect the committed change
            }
        }
    }

    // Handle input blur event to save the value
    function handleInputBlur(key: string, event: Event) {
        const target = event.target as HTMLTableCellElement;
        const newValue = target.innerText.trim();

        if (newValue === "") {
            // Revert to the previous value if the new value is empty
            target.innerText = previousValues[key];
            customProperties[key] = previousValues[key];
        } else {
            // Update the customProperties and the feature directly to reflect the new value
            customProperties[key] = newValue;
            if (feature) {
                feature.set(key, newValue); // Directly update the feature's property
            }
            previousValues[key] = newValue; // Update previousValues to reflect the change
        }
    }

    // Define actions for button clicks (placeholders)
    const handleLeftClick = () => {
        console.log("Left button clicked");
        // Add functionality for left button
    };

    const handleRightClick = () => {
        console.log("Right button clicked");
        // Add functionality for right button
    };
</script>

<div class="features">
    <div class="navigator">
        <WindowButton
            onClick={handleLeftClick}
            iconClass="fas fa-arrow-left"
            label=""
            width="36px"
            minHeight="36px"
        />
        <div class="feature-info">
            <span>{feature ? getFeatureType() : "No feature selected"}</span>
        </div>
        <WindowButton
            onClick={handleRightClick}
            iconClass="fas fa-arrow-right"
            label=""
            width="36px"
            minHeight="36px"
        />
    </div>
   <div class="table-container">
    <table>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
        {#each Object.entries(customProperties) as [key, value]}
            <tr>
                <td>{key}</td>
                <td 
                    contenteditable="true"
                    on:blur={(event) => handleInputBlur(key, event)}
                >
                    {value}
                </td>
            </tr>
        {/each}
    </table>
   </div>
</div>

<style lang="scss">
    .features {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 8px;

        .navigator {
            width: 100%;
            display: flex;
            padding-bottom: 8px;

            .feature-info {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    color: white;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: bold;
                    font-size: 0.6rem;
                    white-space: pre-wrap; /* Preserve formatting */
                }
            }
        }

       .table-container {
        height: 100%;
        overflow-y: scroll;
        scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
        scrollbar-width: thin;
        
        table {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
            width: 100%;

            tr {
                color: white;
                width: 100%;
                height: 32px;

                th {
                    background: rgba(255, 255, 255, 0.1);
                    width: 50%;
                    font-size: 0.8rem;
                    text-align: center;
                }

                td {
                    text-align: center;
                    font-size: 0.8rem;
                }
            }
        }
       }
    }
</style>
