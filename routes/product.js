const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const Product = require("./../models/product");

const productCrtl = require("../controllers/product");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const upload = require('./../middleware/multer');


router.get("/", productCrtl.getAllProduct);

router.post("/", (req, res) => {
    upload(req, res, function(err) {
        if (err) {
          return res.send(err)
        }
        console.log('file uploaded to server')
        console.log(req.file)
    
        // SEND FILE TO CLOUDINARY
        cloudinary.config({
            cloud_name: 'horlertech', 
            api_key: '833863394211228', 
            api_secret: 'SU6co9rc2J_yjIsGJgvehJeuQd4'
        })
        
        const path = req.file.path
        const uniqueFilename = new Date().toISOString()
    
        cloudinary.uploader.upload(
          path,
          { public_id: `ecommerce/${uniqueFilename}`, tags: `zeeam` },
          function(err, image) {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')
            // remove file from server
            const fs = require('fs')
            fs.unlinkSync(path)
            // return image details
            console.log(image);
            //res.json(image)
            const product = new Product({
                _id: mongoose.Types.ObjectId(),
                title: req.body.title,
                description: req.body.description,
                imageUrl: image.url,
                price: req.body.price,
                category: req.body.category
            });
                //save the product and check for errors
                product
                    .save()
                    .then(() => {
                        res.render("inventory", {msg: "Product saved successfully!"})
                        console.log(products);
                        // res.status(200).json({
                        //   message: "Product saved successfully!"
                        // });
                    })
                    .catch(err => {
                        res.status(400).json({
                        error: err
                        });
                    });
          })
      })
      /*
    upload(req, res, function(err){		
		if(err){ 
            return res.end("Error")
        }
		console.log(req);
		res.end("file uploaded")

		cloudinary.config({ 
	      cloud_name: 'horlertech', 
	      api_key: '833863394211228', 
	      api_secret: 'SU6co9rc2J_yjIsGJgvehJeuQd4'
	    });

        cloudinary.uploader.upload(req.file.path, function(result) { 
        console.log(result);
            
        const product = new Product({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            imageUrl: result.url,
            price: req.body.price,
            category: req.body.category
        });
            //save the product and check for errors
            product
                .save()
                .then(() => {
                    res.render("inventory", {msg: "Product saved successfully!"})
                    console.log(products);
                    // res.status(200).json({
                    //   message: "Product saved successfully!"
                    // });
                })
                .catch(err => {
                    res.status(400).json({
                    error: err
                    });
                });
        });
    });
    */	
});

router.get("/:id", auth, productCrtl.getOneProduct);

router.post("/edit/:id", multer, productCrtl.modifyProduct);
router.get("/update/:id", productCrtl.editForm);

router.post("/:id", productCrtl.deleteProduct);
//router.post("/:id", productCrtl.deleteItem)


module.exports = router;
