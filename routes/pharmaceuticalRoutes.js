// routes/pharmaceuticalRoutes.js
const express = require("express");
const router = express.Router();
const pharmaceuticalController = require("../controller/pharmaceuticalController");

router.post("/add", pharmaceuticalController.addPharmaceuticalItem);

router.put("/update/:id", pharmaceuticalController.updatePharmaceuticalItem);

router.delete("/delete/:id", pharmaceuticalController.deletePharmaceuticalItem);

router.get("/all", pharmaceuticalController.getAllPharmaceuticalItems);

router.get("/search", pharmaceuticalController.searchPharmaceuticalItems);

module.exports = router;
