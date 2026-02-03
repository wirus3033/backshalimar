const Notification = require('../models/notificationModel');

exports.createNotification = async (req, res) => {
    try {
        const result = await Notification.create(req.body);
        res.status(201).json({ message: 'Notification créée avec succès', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la notification', error: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getAll();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error: error.message });
    }
};

exports.markRead = async (req, res) => {
    try {
        await Notification.markAsRead(req.params.id);
        res.status(200).json({ message: 'Notification marquée comme lue' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification', error: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        await Notification.delete(req.params.id);
        res.status(200).json({ message: 'Notification supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la notification', error: error.message });
    }
};
