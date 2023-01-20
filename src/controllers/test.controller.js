
async function get(req, res, next) {
  try {
    res.status(200).send("It Worked!");
  } catch (err) {
      console.error(`Error while getting test`, err.message);
      next(err);
  }
}

module.exports = {
    get
}