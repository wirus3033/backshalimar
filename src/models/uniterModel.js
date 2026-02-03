const db = require('../config/db');

class Uniter {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM uniter ORDER BY libelle ASC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM uniter WHERE IDUniter = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { libelle } = data;
        const [result] = await db.execute('INSERT INTO uniter (libelle) VALUES (?)', [libelle]);
        return result;
    }

    static async update(id, data) {
        const { libelle } = data;
        const [result] = await db.execute('UPDATE uniter SET libelle = ? WHERE IDUniter = ?', [libelle, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM uniter WHERE IDUniter = ?', [id]);
        return result;
    }
}

module.exports = Uniter;
