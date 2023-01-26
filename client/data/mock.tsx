import axios, { AxiosRequestConfig } from "axios";
import MockAdapter from 'axios-mock-adapter';
import { bikes } from "./testBikes";

const mock = new MockAdapter(axios);

mock.onGet("/bike").reply(200, {
    bikes: bikes,
})



