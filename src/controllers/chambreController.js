const Chambre = require('../models/chambreModel');
const Notification = require('../models/notificationModel');

exports.getAll = async (req, res, next) => {
    try {
        const data = await Chambre.getAll();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const item = await Chambre.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Chambre non trouvée' });
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { tarif, IDstatusChambre, numero_Chambre } = req.body;
        if (!tarif || !IDstatusChambre || !numero_Chambre) {
            return res.status(400).json({ message: 'Tarif, IDstatusChambre et numero_Chambre sont requis' });
        }

        const existingChambre = await Chambre.getByNumero(numero_Chambre);
        if (existingChambre) {
            return res.status(400).json({
                message: 'Numéro de chambre déjà existant',
                existingRoom: existingChambre
            });
        }

        const result = await Chambre.create({ tarif, IDstatusChambre, numero_Chambre });
        await Notification.create({
            type: 'CREATION',
            message: `Nouvelle chambre créée : ${numero_Chambre}`,
            entity_type: 'chambre',
            entity_id: result.insertId
        });
        res.status(201).json({ IDChambre: result.insertId, message: 'Chambre créée' });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { tarif, IDstatusChambre, numero_Chambre } = req.body;

        if (numero_Chambre) {
            const existingChambre = await Chambre.getByNumero(numero_Chambre);
            // Verify if the number exists and doesn't belong to the room we are currently updating
            if (existingChambre && String(existingChambre.IDChambre) !== String(req.params.id)) {
                return res.status(400).json({
                    message: 'Numéro de chambre déjà existant',
                    existingRoom: existingChambre
                });
            }
        }

        const result = await Chambre.update(req.params.id, { tarif, IDstatusChambre, numero_Chambre });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Chambre non trouvée' });

        await Notification.create({
            type: 'MODIFICATION',
            message: `Chambre modifiée : ${numero_Chambre}`,
            entity_type: 'chambre',
            entity_id: req.params.id
        });

        res.status(200).json({ message: 'Chambre mise à jour' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await Chambre.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Chambre non trouvée' });

        await Notification.create({
            type: 'SUPPRESSION',
            message: `Chambre supprimée : ${numero_Chambre}`,
            entity_type: 'chambre',
            entity_id: req.params.id
        });

        res.status(200).json({ message: 'Chambre supprimée' });
    } catch (error) {
        next(error);
    }
};
