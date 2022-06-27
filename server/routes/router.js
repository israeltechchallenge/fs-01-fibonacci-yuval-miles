const express = require("express");
const router = express.Router();

const { getFibAtIndex, getPrevRes } = require("../controllers/controllers");

router.get("/fibonacci/:number", getFibAtIndex);
router.get("/getFibonacciResults", getPrevRes);

module.exports = router;
