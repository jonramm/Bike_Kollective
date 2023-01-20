const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// const serviceAccount = require('../../bikekollective-key.json');

// initializeApp({
//   credential: cert(serviceAccount)
// });

initializeApp({
    credential: applicationDefault()
  });
  

const db = getFirestore();

module.exports = db