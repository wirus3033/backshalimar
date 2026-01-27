const db = require('../config/db');

class Chambre {
    static async getAll() {
        const [rows] = await db.execute(`
      SELECT c.*, s.libele as statusLabel 
      FROM chambre c 
      JOIN statusChambre s ON c.IDstatusChambre = s.idStatus
    `);
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute(`
      SELECT c.*, s.libele as statusLabel 
      FROM chambre c 
      JOIN statusChambre s ON c.IDstatusChambre = s.idStatus 
      WHERE c.IDChambre = ?
    `, [id]);
        return rows[0];
    }

    static async getByNumero(numero) {
        const [rows] = await db.execute('SELECT * FROM chambre WHERE numero_Chambre = ?', [numero]);
        return rows[0];
    }

    static async create(data) {
        const { tarif, IDstatusChambre, numero_Chambre } = data;
        const [result] = await db.execute(
            'INSERT INTO chambre (tarif, IDstatusChambre, numero_Chambre) VALUES (?, ?, ?)',
            [tarif, IDstatusChambre, numero_Chambre]
        );
        return result;
    }

    static async update(id, data) {
        const { tarif, IDstatusChambre, numero_Chambre } = data;
        const [result] = await db.execute(
            'UPDATE chambre SET tarif = ?, IDstatusChambre = ?, numero_Chambre = ? WHERE IDChambre = ?',
            [tarif, IDstatusChambre, numero_Chambre, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM chambre WHERE IDChambre = ?', [id]);
        return result;
    }
}

module.exports = Chambre;
