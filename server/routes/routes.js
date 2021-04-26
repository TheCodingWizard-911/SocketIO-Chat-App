const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running\n I am inside get /").status(200);
});

module.exports = router;
