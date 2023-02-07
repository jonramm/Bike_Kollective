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

export {
    getRides,
};