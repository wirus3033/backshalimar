const Profil = require('../models/profilModel');

exports.getAllProfils = async (req, res, next) => {
    try {
        const profils = await Profil.getAll();
        res.status(200).json(profils);
    } catch (error) {
        next(error);
    }
};

exports.getProfilById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const profil = await Profil.getById(id);
        if (!profil) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }
        res.status(200).json(profil);
    } catch (error) {
        next(error);
    }
};

exports.createProfil = async (req, res, next) => {
    try {
        const { libele, libelle } = req.body;
        const finalLibele = libele || libelle;

        if (!finalLibele) {
            return res.status(400).json({ message: 'Le libellé est requis' });
        }
        const result = await Profil.create(finalLibele);
        res.status(201).json({ message: 'Profil créé', IDprofil: result.insertId });
    } catch (error) {
        next(error);
    }
};

exports.updateProfil = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { libele } = req.body;
        if (!libele) {
            return res.status(400).json({ message: 'Le libellé est requis pour la mise à jour' });
        }
        const result = await Profil.update(id, libele);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }
        res.status(200).json({ message: 'Profil mis à jour' });
    } catch (error) {
        next(error);
    }
};

exports.deleteProfil = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Profil.delete(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profil non trouvé' });
        }
        res.status(200).json({ message: 'Profil supprimé' });
    } catch (error) {
        next(error);
    }
};
