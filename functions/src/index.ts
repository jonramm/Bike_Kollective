import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import * as express from "express";
import cors = require("cors");

// import api functions
// eslint-disable-next-line max-len
import {getUser, getUsers, createUser, patchUser, triggerUserCreation} from "./apis/users";
import {createBike, getBike, getBikes, patchBike} from "./apis/bikes";

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
