const db = require('../config/db');

class StatusChambre {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM statusChambre');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM statusChambre WHERE idStatus = ?', [id]);
        return rows[0];
    }

    static async create(libele) {
        const [result] = await db.execute('INSERT INTO statusChambre (libele) VALUES (?)', [libele]);
        return result;
    }

    static async update(id, libele) {
        const [result] = await db.execute('UPDATE statusChambre SET libele = ? WHERE idStatus = ?', [libele, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM statusChambre WHERE idStatus = ?', [id]);
        return result;
    }
}

module.exports = StatusChambre;
