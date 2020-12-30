const express = require("express");
const router = express.Router();

const productCrtl = require("../controllers/product");
const auth = require("../middleware/auth");
const upload = require('./../middleware/multer');


router.get("/", productCrtl.getAllProduct);

router.post("/", upload, productCrtl.createProduct);

router.get("/:id", auth, productCrtl.getOneProduct);

router.post("/edit/:id", upload, productCrtl.modifyProduct);
router.get("/update/:id", productCrtl.editForm);

router.post("/:id", productCrtl.deleteProduct);
//router.post("/:id", productCrtl.deleteItem)


module.exports = router;
