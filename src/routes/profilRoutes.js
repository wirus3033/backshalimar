const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');
const isAuth = require('../middleware/authMiddleware');

// Protéger ces routes avec isAuth si nécessaire
router.get('/', isAuth, profilController.getAllProfils);
router.get('/:id', isAuth, profilController.getProfilById);
router.post('/', isAuth, profilController.createProfil);
router.put('/:id', isAuth, profilController.updateProfil);
router.delete('/:id', isAuth, profilController.deleteProfil);

module.exports = router;
