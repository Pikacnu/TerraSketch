import TileLayer from 'ol/layer/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import XYZ from 'ol/source/XYZ';
import { get as getProjection } from 'ol/proj';
import { getWidth } from 'ol/extent';

// Type-only imports
import type { Projection } from 'ol/proj';
import type { Extent } from 'ol/extent';
import type { TileCoord } from 'ol/tilecoord';

// Define an enum for the map tile layers
export enum MapTileLayer {
  Blank = 'blank',
  OSM = 'osm',
  OneMap = 'oneMap',
}

// Define the maximum zoom levels
const maxZoomOneMap = 19;
const maxZoomOSM = 18;

// Create the OneMap tile layer
const oneMapLayer: TileLayer<XYZ> = new TileLayer({
  source: new XYZ({
    url: 'https://www.onemap.gov.sg/maps/tiles/Satellite/{z}/{x}/{y}.png',
    maxZoom: maxZoomOneMap,
  }),
});

// Create the OpenStreetMap tile layer
const osmLayer: TileLayer<XYZ> = new TileLayer({
  source: new XYZ({
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    // url: 'https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
    maxZoom: maxZoomOSM,
  }),
});

// Set up projection and tile grid for the blank layer
const projection: Projection = getProjection('EPSG:3857')!;
const projectionExtent: Extent = getProjection('EPSG:3857')!.getExtent()!;
const size: number = getWidth(projectionExtent) / 256;
const resolutions: number[] = new Array(20);
for (let z = 0; z < 20; ++z) {
  resolutions[z] = size / Math.pow(2, z);
}

const tileGrid: TileGrid = new TileGrid({
  origin: [projectionExtent[0], projectionExtent[1]],
  resolutions: resolutions,
  tileSize: 256, // Set the tile size explicitly
});

// Function to draw tile borders for the blank layer
function createTileUrlFunction(): (tileCoord: TileCoord, pixelRatio: number, projection: Projection) => string {
  return (tileCoord: TileCoord, pixelRatio: number, projection: Projection) => {
    const canvas = document.createElement('canvas');
    const size = 256; // Tile size
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // Fill background with a color
    if (context) {
      context.fillStyle = '#262626';
      context.fillRect(0, 0, size, size);

      // Draw tile borders
      context.strokeStyle = '#404040';
      context.lineWidth = 1;
      context.strokeRect(0, 0, size, size);

      // Optional: Draw tile coordinates (for debugging)
      // context.font = '8px Arial';
      // context.fillStyle = 'white';
      // context.fillText(`z: ${tileCoord[0]}`, 10, 20);
      // context.fillText(`x: ${tileCoord[1]}`, 10, 40);
      // context.fillText(`y: ${tileCoord[2]}`, 10, 60);
    }

    return canvas.toDataURL();
  };
}

// Create the blank layer with a grid using XYZ
const blankLayer: TileLayer<XYZ> = new TileLayer({
  source: new XYZ({
    tileGrid: tileGrid,
    tileUrlFunction: createTileUrlFunction(),
    maxZoom: 19, // Set max zoom as needed
  }),
});

// Export the map tile layers using the enum keys
export const mapTileLayers: Record<MapTileLayer, TileLayer<XYZ>> = {
  [MapTileLayer.Blank]: blankLayer,
  [MapTileLayer.OSM]: osmLayer,
  [MapTileLayer.OneMap]: oneMapLayer,
};
