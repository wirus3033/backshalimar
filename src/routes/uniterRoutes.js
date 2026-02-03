const express = require('express');
const router = express.Router();
const uniterController = require('../controllers/uniterController');

router.get('/', uniterController.getAll);
router.get('/:id', uniterController.getById);
router.post('/', uniterController.create);
router.put('/:id', uniterController.update);
router.delete('/:id', uniterController.delete);

module.exports = router;
