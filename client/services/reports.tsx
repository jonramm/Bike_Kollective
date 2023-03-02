import axios from '../utils/axiosConfig';

const addReport = async (params) => {
    try {
        const response = await axios.post('/report', {
            status: params.status,
            description: params.description,
            bike: params.bike,
            user: params.user,
        });
        const data = response.data;
        console.log(data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const getReports = async () => {
    try {
        const response = await axios.get('/report');
        const data = response.data;
        console.log(data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

const patchReport = async (report_id: string, params: any) => {
    try {
        console.log(params);
        const response = await axios.patch(`/report/${report_id}`, params);
        const data = response.data;
        console.log(data);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export {
    addReport,
    getReports,
    patchReport,
};