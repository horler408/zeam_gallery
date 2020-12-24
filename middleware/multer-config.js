const multer = require("multer");
const path = require('path')

const MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + Date.now() + "." + extension);
  }
  // filename: function(req, file, cb){
  //   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  // }
});

module.exports = multer({ storage: storage }).single("imageUrl");
