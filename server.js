const app = require("./app");
const port = process.env.PORT || 3000
const ip = require('ip');

app.listen(port, () => {
  console.log(`Listening at ${ip.address()}, port ${port}`)
})