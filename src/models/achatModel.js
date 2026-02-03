const db = require('../config/db');

class Achat {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM achat ORDER BY date_achat DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM achat WHERE IDAchat = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { date_achat, produit, quantite, PU, IDUniter, observation } = data;
        const [result] = await db.execute(`
            INSERT INTO achat (date_achat, produit, quantite, PU, IDUniter, observation) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [date_achat, produit, quantite, PU, IDUniter, observation]);
        return result;
    }

    static async update(id, data) {
        const { date_achat, produit, quantite, PU, IDUniter, observation } = data;
        const [result] = await db.execute(`
            UPDATE achat SET 
                date_achat = ?, 
                produit = ?, 
                quantite = ?, 
                PU = ?, 
                IDUniter = ?,
                observation = ?
            WHERE IDAchat = ?
        `, [date_achat, produit, quantite, PU, IDUniter, observation, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM achat WHERE IDAchat = ?', [id]);
        return result;
    }
}

module.exports = Achat;
