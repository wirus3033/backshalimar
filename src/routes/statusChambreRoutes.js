const express = require('express');
const router = express.Router();
const statusChambreController = require('../controllers/statusChambreController');
const isAuth = require('../middleware/authMiddleware');

router.get('/', isAuth, statusChambreController.getAll);
router.get('/:id', isAuth, statusChambreController.getById);
router.post('/', isAuth, statusChambreController.create);
router.put('/:id', isAuth, statusChambreController.update);
router.delete('/:id', isAuth, statusChambreController.delete);

module.exports = router;
