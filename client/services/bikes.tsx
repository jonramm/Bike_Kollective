import axios from '../utils/axiosConfig';

const getBikes = async () => {
    try {
        const response = await axios.get('/bike');
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err)
    }
};

export {
    getBikes
};