const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/add", controller.bookTicket);
router.get("/", controller.getAllBookings);
router.put("/update/:id", controller.updateBooking);
router.patch("/status/:id", controller.updateBookingStatus);
router.delete("/delete/:id", controller.deleteBooking);

module.exports = router;
