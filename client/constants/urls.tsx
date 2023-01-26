import Constants from "expo-constants";

const { manifest } = Constants;

const expoApi = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:5000`)
  : `api.example.com`;

const base_url = "http://127.0.0.1:5000/bike-kollective-project/us-central1/app";

export {
    base_url,
    expoApi
};