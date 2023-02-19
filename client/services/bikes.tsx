import axios from '../utils/axiosConfig';
import { storage } from '../configs/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { distToBike } from './distanceCalc';

const getBikes = async () => {
    try {
        const response = await axios.get('/bike');
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getAvailableBikesWithinProximity = async (radius, userLocation) => {
    try {
        const response = await axios.get('/bike');
        return response.data.filter(
            bike => distToBike(userLocation, bike.location) < radius && bike.status == 'available'
        );
    } catch (err) {
        console.log(err);
    }
};

const addBike = async (params) => {
    try {
        const response = await axios.post('/bike', {
            name: params.name,
            description: params.description,
            owner: params.owner,
            photo: params.photo,
            release: params.release,
            num_ratings: 0,
            agg_rating: 0,
            status: 'available',
            lock_combo: params.lock_combo,
            location: params.location,
            tags: params.tags
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const makeBikeAvailable = async (bikeId) => {
    try {
        const response = await axios.patch(`/bike/${bikeId}`, {
            status: 'available',
            tags: []
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

const makeBikeUnavailable = async (bikeId) => {
    try {
        const response = await axios.patch(`/bike/${bikeId}`, {
            status: 'unavailable',
            tags: []
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

const checkInBike = async (bikeId, location) => {
    try {
        const response = await axios.patch(`/bike/${bikeId}`, {
            status: 'available',
            location: location,
            tags: []
        });
        return response
    } catch (err) {
        console.log(err);
    }
}

/**
 * Uploads image to Firebase Storage by turning it into a blob
 * @param uri {String} local device image uri
 * @param imgId {uuid} photo id to match 'photo' property
 * in corresponding bike db entry
 */
const uploadImage = async (uri, imgId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, imgId);
    uploadBytes(storageRef, blob)
        .then(() => {
            console.log('Uploaded a blob or file!');
        })
        .catch((err) => console.log(err));
} 

export {
    getBikes,
    addBike,
    uploadImage,
    getAvailableBikesWithinProximity,
    makeBikeAvailable,
    makeBikeUnavailable,
    checkInBike
};