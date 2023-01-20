const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./src/config/db')

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

async function getTest () {
  const snapshot = await db.collection('test').get();
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
});
}
getTest()

const testRouter = require('./src/routes/test.route');

app.use('/', testRouter);

module.exports = app;