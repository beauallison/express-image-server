const express = require('express');
const controller = require('./controller');

const router = new express.Router();

// router.get('/', controller.listImages);
router.get('/:id', controller.getImage);
router.delete('/:id', controller.deleteImage);

module.exports = router;
