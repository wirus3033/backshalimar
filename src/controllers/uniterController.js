const Uniter = require('../models/uniterModel');
// const Notification = require('../models/notificationModel'); // Optional: Uncomment if notifications are needed for units

exports.getAll = async (req, res, next) => {
    try {
        const data = await Uniter.getAll();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const item = await Uniter.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Unité non trouvée' });
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { libelle } = req.body;
        if (!libelle) {
            return res.status(400).json({ message: 'Le libellé est requis' });
        }

        const result = await Uniter.create({ libelle });
        res.status(201).json({ IDUniter: result.insertId, message: 'Unité créée avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { libelle } = req.body;
        if (!libelle) {
            return res.status(400).json({ message: 'Le libellé est requis' });
        }

        const result = await Uniter.update(req.params.id, { libelle });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Unité non trouvée' });

        res.status(200).json({ message: 'Unité mise à jour avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await Uniter.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Unité non trouvée' });

        res.status(200).json({ message: 'Unité supprimée avec succès' });
    } catch (error) {
        next(error);
    }
};
