
const upload = require('./../middlewares/multer')

exports.upload = (req, res) => {
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
            file: `uploads/${req.file.filename}`
          });
        }
      }
    });
  }
  