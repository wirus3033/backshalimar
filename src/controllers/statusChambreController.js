const StatusChambre = require('../models/statusChambreModel');

exports.getAll = async (req, res, next) => {
    try {
        const data = await StatusChambre.getAll();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const item = await StatusChambre.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Status non trouvé' });
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { libele } = req.body;
        if (!libele) return res.status(400).json({ message: 'Le libellé est requis' });
        const result = await StatusChambre.create(libele);
        res.status(201).json({ idStatus: result.insertId, message: 'Status créé' });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { libele } = req.body;
        const result = await StatusChambre.update(req.params.id, libele);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Status non trouvé' });
        res.status(200).json({ message: 'Status mis à jour' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await StatusChambre.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Status non trouvé' });
        res.status(200).json({ message: 'Status supprimé' });
    } catch (error) {
        next(error);
    }
};
