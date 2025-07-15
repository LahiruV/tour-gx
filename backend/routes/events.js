const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventController");
const isAuthenticated = require("../middleware/auth"); // Optional: secure create/update/delete

router.get("/", controller.getAllEvents);
router.get("/location", controller.getEventsByLocation);
router.get("/:id/tickets", controller.getTicketsByEvent);
router.post("/", isAuthenticated, controller.createEvent);
router.put("/:id", isAuthenticated, controller.updateEvent);
router.delete("/:id", isAuthenticated, controller.deleteEvent);

module.exports = router;
