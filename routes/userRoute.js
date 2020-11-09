const router = require('express').Router();

const userController = require('./../controller/userController')

router.post('/upload', userController.upload);

module.exports = router;