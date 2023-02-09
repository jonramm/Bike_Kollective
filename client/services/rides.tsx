import axios from '../utils/axiosConfig';

const getRides = async () => {
    try {
        const response = await axios.get('/ride');
        const data = response.data;
        return data;
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
        return data;
    } catch (err) {
        console.log(err);
    }
};

export {
    getRides,
    patchRide,
};