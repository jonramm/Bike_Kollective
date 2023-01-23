import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
import * as express from "express";
import cors = require("cors");

// import api functions
import {createUser} from "./apis/users";

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
app.post("/user", createUser); // add auth middleware

exports.app = functions.https.onRequest(app);

// admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
