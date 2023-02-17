import axios from '../utils/axiosConfig';

const getUser = async (user_id) => {
    try {
        const response = await axios.get(
            `/user/${user_id}`, 
        );
        const data = response.data;
        return data;
    } catch (err) {
        console.log(err)
    }
};

const addUser = async (params: any) => {
    try {
        const response = await axios.post('/user', params);
        const data = response.data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export {
    getUser,
    addUser
};