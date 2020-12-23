const express = require("express");
const router = express.Router();

const auth = require("./../middleware/auth");
const adminAuth = require("./../middleware/adminAuth")
const indexController = require('./../controllers/index')

router.get('/', indexController.index);
router.get("/inventory", indexController.inventory);
//router.get("/gallery", indexController.gallery);
router.get("/dashboard", auth, indexController.dashboard)

module.exports = router;