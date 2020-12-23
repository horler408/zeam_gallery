const multer = require('multer')
const path = require('path');
const cloudinary = require('cloudinary').v2


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2
  },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Cloudinary
cloudinary.config({
  cloud_name: 'horlertech',
  api_key: '833863394211228',
  api_secret: 'SU6co9rc2J_yjIsGJgvehJeuQd4'
})
    
const path = req.file.path
const uniqueFilename = new Date().toISOString()

cloudinary.uploader.upload(
  path,
  { public_id: `ecommerce/${uniqueFilename}`, tags: `zeeam` }, // directory and tags are optional
    function(err, image) {
        if (err) return res.send(err)
        console.log('file uploaded to Cloudinary')
        // remove file from server
        const fs = require('fs')
        fs.unlinkSync(path)
        // return image details
        res.json(image)
  }
)

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Only jpg and png file supported!');
  }
}

module.exports = upload;