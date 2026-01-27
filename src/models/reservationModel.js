const db = require('../config/db');

class Reservation {
    static async getAll() {
        const [rows] = await db.execute(`
            SELECT r.*, c.numero_Chambre 
            FROM reservation r
            JOIN chambre c ON r.IDChambre = c.IDChambre
            ORDER BY r.date_dossier DESC
        `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute(`
            SELECT r.*, c.numero_Chambre 
            FROM reservation r
            JOIN chambre c ON r.IDChambre = c.IDChambre
            WHERE r.IDReservation = ?
        `, [id]);
        return rows[0];
    }

    static async create(data) {
        const {
            date_dossier,
            nom_client,
            date_entree,
            date_sortie,
            IDChambre,
            PUChambre,
            duree,
            montant_total,
            montant_paye,
            informations_complementaires
        } = data;

        const [result] = await db.execute(`
            INSERT INTO reservation (
                date_dossier, nom_client, date_entree, date_sortie, 
                IDChambre, PUChambre, duree, montant_total, 
                montant_paye, informations_complementaires
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            date_dossier, nom_client, date_entree, date_sortie,
            IDChambre, PUChambre, duree, montant_total,
            montant_paye || 0, informations_complementaires
        ]);
        return result;
    }

    static async update(id, data) {
        const {
            date_dossier,
            nom_client,
            date_entree,
            date_sortie,
            IDChambre,
            PUChambre,
            duree,
            montant_total,
            montant_paye,
            informations_complementaires
        } = data;

        const [result] = await db.execute(`
            UPDATE reservation SET 
                date_dossier = ?, 
                nom_client = ?, 
                date_entree = ?, 
                date_sortie = ?, 
                IDChambre = ?, 
                PUChambre = ?, 
                duree = ?, 
                montant_total = ?, 
                montant_paye = ?, 
                informations_complementaires = ?
            WHERE IDReservation = ?
        `, [
            date_dossier, nom_client, date_entree, date_sortie,
            IDChambre, PUChambre, duree, montant_total,
            montant_paye, informations_complementaires, id
        ]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM reservation WHERE IDReservation = ?', [id]);
        return result;
    }
}

module.exports = Reservation;
