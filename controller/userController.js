
const upload = require('./../middlewares/multer')
const User = require('./../model/user')

// Get all files
exports.files = (req, res) => {
  User.find().exec()
  .then(files => {
    res.status(200).json(files)
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

// Get Single file
exports.file = (req, res) => {
  User.findById({id: req.params.id})
  .then(file => {
    res.json(file)
  })
  .catch(err => {
    console.log(err);
  })
}

exports.image = (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        //console.log(req.file);
        //res.send('test')
        if(req.file == undefined){
          res.render('index', {
            msg: 'No File Selected!'
          });
        } else {
          res.render('gallery', {
            msg: 'File Uploaded successfully',
            files: `uploads/${req.file.filename}`
          });
        }
      }
    });
  }
  