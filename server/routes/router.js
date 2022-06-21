const express = require("express");
const router = express.Router();

const { getFibAtIndex, getPrevRes } = require("../controllers/controllers");

router.route("/fibonacci/:number").get(getFibAtIndex);
router.route("/getFibonacciResults").get(getPrevRes);

module.exports = router;
