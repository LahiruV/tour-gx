const express = require("express");
const router = express.Router();
const controller = require("../controllers/packageController");

router.post("/add", controller.addPackage);
router.get("/", controller.getPackages);
router.put("/update", controller.updatePackage);
router.delete("/delete", controller.deletePackage);

module.exports = router;