import axios from '../utils/axiosConfig';
import { db, storage } from '../configs/firebase';
import { collection, getDocs } from 'firebase/firestore/lite'
import { ref, uploadBytesResumable } from "firebase/storage";

const getBikes = async () => {
    try {
        const response = await axios.get('/bike');
        const data = response.data;
        return data;
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

const uploadImage = async (uri, imageName) => {

    console.log("file path: ", uri)
    console.log("image name: ", imageName)
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, imageName);

    uploadBytesResumable(storageRef, blob)
        .then((snapshot) => console.log('Uploaded a blob or file!'))
        .catch((err) => console.log(err));
}

export {
    getBikes,
    addBike,
    uploadImage
};