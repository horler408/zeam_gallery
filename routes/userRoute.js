const router = require('express').Router();

const userController = require('./../controller/userController')

router.post('/images', userController.image);
router.get('/images', userController.images)
router.get('/images/:id', userController.getImage)
router.get('/files', userController.files)
router.get('/files/:id', userController.file)

module.exports = router;