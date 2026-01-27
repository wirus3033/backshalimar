const db = require('../config/db');

class Profil {
    static async getAll() {
        const [rows] = await db.execute('SELECT * FROM profil');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.execute('SELECT * FROM profil WHERE IDprofil = ?', [id]);
        return rows[0];
    }

    static async create(libele) {
        const [result] = await db.execute('INSERT INTO profil (libele) VALUES (?)', [libele]);
        return result;
    }

    static async update(id, libele) {
        const [result] = await db.execute('UPDATE profil SET libele = ? WHERE IDprofil = ?', [libele, id]);
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM profil WHERE IDprofil = ?', [id]);
        return result;
    }
}

module.exports = Profil;
