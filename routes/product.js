const express = require("express");
const router = express.Router();

const productCrtl = require("../controllers/product");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.get("/", productCrtl.getAllProduct);

router.post("/", productCrtl.createProduct);

router.get("/:id", productCrtl.getOneProduct);

router.post("/edit/:id", multer, productCrtl.modifyProduct);
router.get("/update/:id", productCrtl.editForm);

router.post("/:id", productCrtl.deleteProduct);
//router.post("/:id", productCrtl.deleteItem)


module.exports = router;
