import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const storage = admin.storage();

db.settings({ignoreUndefinedProperties: true});

export {admin, functions, db, storage};
