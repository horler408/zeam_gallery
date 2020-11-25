const express = require("express");
const router = express.Router();

const orderContr = require("./../controllers/order");
const checkAuth = require("../middleware/auth");

router.get("/", orderContr.getAll);
router.post("/", checkAuth, orderContr.createOrder);
router.get("/:orderId", checkAuth, orderContr.getOrder);
router.delete("/:orderid", checkAuth, orderContr.deleteOrder);

module.exports = router;