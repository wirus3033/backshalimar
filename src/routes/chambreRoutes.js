const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');
const isAuth = require('../middleware/authMiddleware');

router.get('/', isAuth, chambreController.getAll);
router.get('/:id', isAuth, chambreController.getById);
router.post('/', isAuth, chambreController.create);
router.put('/:id', isAuth, chambreController.update);
router.delete('/:id', isAuth, chambreController.delete);

module.exports = router;
