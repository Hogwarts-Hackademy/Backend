// routes/consumableRoutes.js
const express = require("express");
const router = express.Router();
const consumableController = require("../controller/consumableController");

router.post("/add", consumableController.addConsumableItem);

router.put("/update/:id", consumableController.updateConsumableItem);

router.delete("/delete/:id", consumableController.deleteConsumableItem);

router.get("/all", consumableController.getAllConsumableItems);

router.get("/search", consumableController.searchConsumableItems);

module.exports = router;
