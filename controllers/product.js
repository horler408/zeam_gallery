const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const fs = require("fs");

const Product = require("../models/product");
const upload = require('./../middleware/multer');


exports.createProduct = (req, res) => {
  const { title, description, price, category } = req.body
    let errors = [];

    if (!title || !description || !price || !category) {
        errors.push({ msg: "Please enter all neccessary fields" });
    }

    if (title.length < 3) {
        errors.push({ msg: "Please enter a valid product name" });
    }

    if (req.file == undefined) {
        errors.push({ msg: "You must choose a file to upload" })
    }

    if (errors.length > 0) {
        return errors;
    }else {
        upload(req, res, function(err) {
            if (err) {
              return res.send(err)
            }
            console.log('file uploaded to server')
            //console.log(req.file)
        
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
                //fs.unlinkSync(path)
    
                // return image details
                console.log(image);
                //res.json(image)
                const product = new Product({
                    _id: mongoose.Types.ObjectId(),
                    title,
                    description,
                    imageUrl: image.url,
                    price,
                    category
                });
                    
                    product
                        .save()
                        .then(() => {
                            return res.render("inventory", {msg: "Product saved successfully!"})
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
    }
}

exports.getAllProduct = (req, res, next) => {
  Product.find()
  .select("id title price description imageUrl")
    .then(products => {
      const category = req.query.category
      
      if(category) {
        const filteredProducts = products.filter(product => {
          return product.category === category
        })
        return res.json(filteredProducts)
        //return res.render("gallery", {filteredProducts})
      }
      res.render("gallery", {products})
      //res.status(200).json(products);
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
};

exports.getOneProduct = (req, res, next) => {
  Product.findOne({
    _id: req.params.id
  })
    .then(product => {
      res.render("details", {product})
      //res.status(200).json(product);
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
};

exports.editForm = (req, res) => {
    Product.findOne({_id: req.params.id})
    .then(product => {
      res.render("update", {product})
      // res.status(200).json(products)
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}
exports.modifyProduct = (req, res) => {
  let product = new Product({ _id: req.params.id });
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    product = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: "./public/uploads/" + req.file.filename,
      price: req.body.price,
      category: req.body.category
    };
  } else {
    product = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      category: req.body.category
    };
  }  
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      Product.findOne({_id: req.params.id})
      .then(product => {
        res.render("details", {product, msg: "Product Updated Successfully!"})
      })
      // res.status(200).json({
      //   message: "Product Updated Successfully!"
      // });
    })
    .catch(error => {
      res.status(404).json({
        error: error
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id }).then(product => {
    const filename = product.imageUrl.split("/images/")[1];
    fs.unlink("images/" + filename, () => {
      Product.deleteOne({ _id: req.params.id })
        .then(() => {
          req.flash("success_msg", "Product deleted successfully")
          res.redirect("/api/product");
          // res.status(200).json({
          //   message: "Deleted Successfully!"
          // });
        })
        .catch(error => {
          res.status(404).json({
            error: error
          });
        });
    });
  });
};
exports.deleteItem = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({
      message: "Deleted Successfully!"
    });
   })
  .catch(error => {
    res.status(404).json({
      error: error
    });
  })
}  
