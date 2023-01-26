import axios from '../utils/axiosConfig';

const getBikes = async () => {
    console.log("Getting bikes...");
    try {
        const response = await axios.get('/bike');
        console.log(response.data);
    } catch (err) {
        console.log(err)
    }
};

export {
    getBikes
};