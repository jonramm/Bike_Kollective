import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import express from "express";
import cors = require("cors");

// import api functions
// eslint-disable-next-line max-len
import {getUser, getUsers, createUser, patchUser, triggerUserCreation} from "./apis/users";
import {createBike, getBike, getBikes, patchBike} from "./apis/bikes";
import {createRide, getRide, getRides, patchRide} from "./apis/rides";
import {createReport, getReport, getReports, patchReport} from "./apis/reports";

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));

// test routes
app.get("/", (req, res) => {
  res.status(200).send("Hey there!");
  res.end();
});
app.get("/user/:user_id", getUser);
app.get("/user", getUsers);
app.post("/user", createUser); // add auth middleware
app.patch("/user/:user_id", patchUser);

app.post("/bike", createBike);
app.get("/bike/:bike_id", getBike);
app.get("/bike", getBikes);
app.patch("/bike/:bike_id", patchBike);

app.post("/ride", createRide);
app.get("/ride/:ride_id", getRide);
app.get("/ride", getRides);
app.patch("/ride/:ride_id", patchRide);

app.post("/report", createReport);
app.get("/report/:report_id", getReport);
app.get("/report", getReports);
app.patch("/report/:report_id", patchReport);

export {
  triggerUserCreation,
};

exports.app = functions.https.onRequest(app);

// admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
