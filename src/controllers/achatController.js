const Achat = require('../models/achatModel');
const Notification = require('../models/notificationModel');

exports.getAll = async (req, res, next) => {
    try {
        const data = await Achat.getAll();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const item = await Achat.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Achat non trouvé' });
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { date_achat, produit, quantite, PU, observation, IDUniter } = req.body;

        if (!date_achat || !produit || !quantite || !PU || !IDUniter) {
            return res.status(400).json({ message: 'Tous les champs obligatoires (date_achat, produit, quantite, PU, IDUniter) doivent être remplis' });
        }

        const result = await Achat.create(req.body);

        await Notification.create({
            type: 'CREATION',
            message: `Nouvel achat : ${produit} (Qté: ${quantite})`,
            entity_type: 'achat',
            entity_id: result.insertId
        });

        res.status(201).json({ IDAchat: result.insertId, message: 'Achat enregistré avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { date_achat, produit, quantite, PU, observation, IDUniter } = req.body;

        if (!date_achat || !produit || !quantite || !PU || !IDUniter) {
            return res.status(400).json({ message: 'Tous les champs obligatoires (date_achat, produit, quantite, PU, IDUniter) doivent être remplis' });
        }

        const result = await Achat.update(req.params.id, req.body);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Achat non trouvé' });

        await Notification.create({
            type: 'MODIFICATION',
            message: `Achat modifié : ${req.body.produit || 'ID ' + req.params.id}`,
            entity_type: 'achat',
            entity_id: req.params.id
        });

        res.status(200).json({ message: 'Achat mis à jour avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await Achat.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Achat non trouvé' });

        await Notification.create({
            type: 'SUPPRESSION',
            message: `Achat supprimé ID : ${req.params.id}`,
            entity_type: 'achat',
            entity_id: req.params.id
        });

        res.status(200).json({ message: 'Achat supprimé avec succès' });
    } catch (error) {
        next(error);
    }
};
