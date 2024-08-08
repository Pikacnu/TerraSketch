import { transform } from 'ol/proj';
import { fromGeo } from './terraconvert/terraconvert';

/**
 * Transforms coordinates from one spatial reference system to another.
 * @param flatCoords - Flat array of coordinates.
 * @param sourceProj - Source projection system. Default is "EPSG:3857".
 * @param destProj - Destination projection system. Default is "EPSG:4326".
 * @param stride - Number of elements per coordinate. Default is 2.
 * @returns An array of transformed coordinates in Latitude/Longitude order.
 */
export function transformToLatLng(
	flatCoords: number[],
	sourceProj: string = 'EPSG:3857',
	destProj: string = 'EPSG:4326',
	stride: number = 2
): [number, number][] {
	const coordinatePairs = getCoordinatePairs(flatCoords, stride);
	return coordinatePairs.map((coord) => {
		const [longitude, latitude] = transform(coord, sourceProj, destProj);
		return fromGeo(latitude, longitude); // Ensure correct order
	});
}

/**
 * Converts a flat array of coordinates into an array of coordinate pairs.
 * @param flatCoords - Flat array of coordinates.
 * @param stride - Number of elements representing a single coordinate. Default is 2.
 * @returns An array of coordinate pairs.
 */
function getCoordinatePairs(flatCoords: number[], stride: number = 2): [number, number][] {
	const coordinates: [number, number][] = [];
	for (let i = 0; i < flatCoords.length; i += stride) {
		coordinates.push([flatCoords[i], flatCoords[i + 1]]);
	}
	return coordinates;
}

/**
 * Generates vertices for a circle given its center and a point on its circumference.
 * @param points - Array containing two points: the center and a point on the circumference.
 * @param numberOfSides - Number of vertices to approximate the circle.
 * @returns An array of vertices representing the circle.
 */
export function generateCircleVertices(
	points: [[number, number], [number, number]],
	numberOfSides: number
): [number, number][] {
	const [centerX, centerY] = points[0];
	const [circumferenceX, circumferenceY] = points[1];

	// Calculate the radius as the distance between the center and the circumference point
	const dx = circumferenceX - centerX;
	const dy = circumferenceY - centerY;
	const radius = Math.sqrt(dx * dx + dy * dy);

	const vertices: [number, number][] = [];

	for (let i = 0; i < numberOfSides; i++) {
		const angle = (i * 2 * Math.PI) / numberOfSides; // Calculate angle for each vertex
		const x = centerX + radius * Math.cos(angle); // Calculate x coordinate
		const y = centerY + radius * Math.sin(angle); // Calculate y coordinate
		vertices.push([x, y]);
	}

	return vertices;
}
