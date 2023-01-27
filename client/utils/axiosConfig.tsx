import axios from "axios";
const MockAdapter = require("axios-mock-adapter");
import { base_url } from "../constants/urls";
import { bikes } from "../data/testBikes";

const axiosInstance = axios.create({
    baseURL: base_url
});

// const mock = new MockAdapter(axiosInstance);
// mock.onGet("/bike").reply(200, {
//     bikes: bikes,
//   });

export default axiosInstance