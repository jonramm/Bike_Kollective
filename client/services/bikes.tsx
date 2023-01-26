import axios from "axios";
import { base_url } from "../constants/urls";


const getBikes = async () => {
    console.log("Getting bikes...");
    const configObj = {
        method: 'get',
        url: `${base_url + '/bike'}`
    }
    try {
        const response = await axios(configObj);
        console.log('Res: ' + response.data);
    } catch (err) {
        console.log(err)
    }
};

export {
    getBikes
};