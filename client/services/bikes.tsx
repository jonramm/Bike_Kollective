import axios from '../utils/axiosConfig';
import { db } from '../configs/firebase';
import { collection, getDocs } from 'firebase/firestore/lite'

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

type location = {
    latitude: number,
    longitude: number,
  }

type entryType = {
    bike_id: string,
    name: string,
    description: string,
    owner: string,
    photo: string,
    release: boolean,
    num_ratings: number,
    agg_rating: number,
    status: string,
    lock_combo: string,
    location: location
    tags: string[],
}

const testDb = async () => {
    const bikeCol = collection(db, 'bikes');
    const bikeSnapshot = await getDocs(bikeCol);
    const bikeList = bikeSnapshot.docs.map(doc => doc.data());
    console.log(bikeList) 
}

export {
    getBikes,
    addBike,
    testDb
};