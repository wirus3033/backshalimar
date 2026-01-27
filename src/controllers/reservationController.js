const Reservation = require('../models/reservationModel');

exports.getAll = async (req, res, next) => {
    try {
        const data = await Reservation.getAll();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const item = await Reservation.getById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.status(200).json(item);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const {
            date_dossier,
            nom_client,
            date_entree,
            date_sortie,
            IDChambre,
            PUChambre,
            duree,
            montant_total
        } = req.body;

        // Basic validation
        if (!date_dossier || !nom_client || !date_entree || !date_sortie || !IDChambre || !PUChambre || !duree || !montant_total) {
            return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
        }

        const result = await Reservation.create(req.body);
        res.status(201).json({ IDReservation: result.insertId, message: 'Réservation créée avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const result = await Reservation.update(req.params.id, req.body);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.status(200).json({ message: 'Réservation mise à jour avec succès' });
    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const result = await Reservation.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Réservation non trouvée' });
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        next(error);
    }
};
