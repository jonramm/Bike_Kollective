import haversine from 'haversine-distance';

/**
 * Takes user location and bike location and returns
 * distance in meters.
 * @param userLocation 
 * @param bikeLocation 
 * @returns distance in meters
 */
const distToBike = (userLocation, bikeLocation) => {
    return Math.round(
        haversine(userLocation, bikeLocation)
    );
}

export { distToBike }