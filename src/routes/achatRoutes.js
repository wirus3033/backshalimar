const express = require('express');
const router = express.Router();
const achatController = require('../controllers/achatController');

router.get('/', achatController.getAll);
router.get('/:id', achatController.getById);
router.post('/', achatController.create);
router.put('/:id', achatController.update);
router.delete('/:id', achatController.delete);

module.exports = router;
