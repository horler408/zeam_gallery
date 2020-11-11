
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
    if(!file || file.length == 0) {
      return res.status(404).json({
        message: 'File do not exists'
      })
    }
    return res.json(file)
  })
  .catch(err => {
    console.log(err);
  })
}

// Get Images
exports.images = (req, res) => {
  User.find().exec()
  .then(files => {
    if(!files || files.length < 1) {
      return res.render('index', {msg: 'No images avilable in the gallery!'})
    } else {
      files.map(file => {
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
          file.isImage = true
        }else {
          file.isImage = false
        }
      })
      res.render('gallery', {files})
    }
  })
  .catch(err => {
    res.redirect('/')
  })
}

// Get Image
exports.getImage = (req, res) => {
  User.findOne({id: req.params.id})
  .then(user => {
    if(!user || user.length == 0) {
      return res.render('index', 
      {msg: 'The select image do not exists'})
    }
    res.render('gallery')
  })
  .catch(err => {
    res.redirect('/')
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
        const image = new User({
          imageUrl: req.body.myImage
        })

        image.save()
        .then(files => {
          if(files == undefined){
            res.render('index', {
              msg: 'No File Selected!'
            });
          } else {
            res.render('index', {
              msg: 'File Uploaded successfully',
              files: `uploads/${req.file.filename}`
            });
          }
        })
        .catch(err => {
          res.redirect('/')
        })
      }
    });
  }
  