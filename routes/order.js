const express = require("express");
const router = express.Router();

const orderContr = require("./../controllers/order");
const checkAuth = require("../middleware/auth");

router.get("/", orderContr.getAll);
router.post("/", orderContr.createOrder);
router.get("/:orderId", orderContr.getOrder);
router.post("/:orderid", orderContr.deleteOrder);

module.exports = router;