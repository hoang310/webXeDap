const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.getAllProduct);
router.get("/cp", controller.getAllProductC)

module.exports = router;