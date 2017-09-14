const auth = require('../auth');
const controller = require('./controller');
const express = require('express');

const router = new express.Router();

// router.get('/', controller.listImages);
router.get('/:id', controller.getImage);
router.delete('/:id', auth, controller.deleteImage);

module.exports = router;
