const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");
const isAuthenticated = require("../middleware/auth");

router.post("/", isAuthenticated, controller.bookTicket);

module.exports = router;