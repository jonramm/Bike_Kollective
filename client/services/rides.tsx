import axios from '../utils/axiosConfig';

const addRide = async (params) => {
    try {
        const response = await axios.post('/ride', {
            start_time: null,
            end_time: null,
            rating: null,
            bike: params.bike,
            rider: params.rider,
            location_start: params.location_start,
            location_end: params.location_start,
        });
        return response;
    } catch (err) {
        console.log(err);
    }
};

const getRides = async () => {
    try {
        const response = await axios.get('/ride');
        const data = response.data;
        console.log(data)
        return response;
    } catch (err) {
        console.log(err);
    }
};

const patchRide = async (ride_id: string, params: any) => {
    try {
        console.log(params);
        const response = await axios.patch(`/ride/${ride_id}`, params);
        const data = response.data;
        console.log(data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export {
    addRide,
    getRides,
    patchRide,
};