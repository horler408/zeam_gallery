const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/register", userCtrl.signup);
router.get("/login", userCtrl.signin)
router.get("/", userCtrl.users)

module.exports = router;
