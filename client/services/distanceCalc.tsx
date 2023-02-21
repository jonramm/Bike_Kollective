import haversine from 'haversine-distance';

const MIN_BIKE_DISTANCE = 100; 

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

const userCloseEnough = (userLocation, bikeLocation) => {
    console.log(distToBike(userLocation, bikeLocation) < MIN_BIKE_DISTANCE)
    return distToBike(userLocation, bikeLocation) < MIN_BIKE_DISTANCE;
}

export { 
    distToBike,
    userCloseEnough
 }