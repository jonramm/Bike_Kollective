import haversine from 'haversine-distance';

const distToBike = (userLocation, bikeLocation) => {
    return Math.round(
        haversine(userLocation, bikeLocation)
    );
}

export { distToBike }