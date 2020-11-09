const router = require('express').Router();

const IndexController = require('./../controller/indexController')

router.get('/', IndexController.index);

module.exports = router;