const router = require('express').Router();

const userController = require('./../controller/userController')

router.post('/images', userController.image);
router.get('/files', userController.files)
router.get('/files/:id')

module.exports = router;