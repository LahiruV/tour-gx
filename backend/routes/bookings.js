const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookingController");

router.post("/", controller.bookTicket);
router.get("/", controller.getAllBookings);
router.put("/:id", controller.updateBooking);
router.patch("/status/:id", controller.updateBookingStatus);
router.delete("/:id", controller.deleteBooking);

module.exports = router;
