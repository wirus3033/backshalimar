const db = require('../config/db');

class User {
    static async findByLogin(login) {
        // On cherche par email (ou une colonne login si elle existe)
        // On JOIN avec table profil si nécessaire pour récupérer le libellé
        const [rows] = await db.execute(
            'SELECT u.*, p.libele as profil FROM utilisateur u LEFT JOIN profil p ON u.IDprofil = p.IDprofil WHERE u.email = ?',
            [login]
        );
        return rows[0];
    }

    static async create(user) {
        const { email, password, name, prenom, IDprofil, telephone } = user;
        const [result] = await db.execute(
            'INSERT INTO utilisateur (email, mot_de_passe, nom, prenom, IDprofil, telephone) VALUES (?, ?, ?, ?, ?, ?)',
            [email, password, name || '', prenom || '', IDprofil || null, telephone || null]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT u.*, p.libele as profil FROM utilisateur u LEFT JOIN profil p ON u.IDprofil = p.IDprofil WHERE u.IDutilisateur = ?',
            [id]
        );
        return rows[0];
    }

    static async getAll() {
        const [rows] = await db.execute(
            'SELECT u.*, p.libele as profil FROM utilisateur u LEFT JOIN profil p ON u.IDprofil = p.IDprofil'
        );
        return rows;
    }

    static async update(id, userData) {
        const { email, nom, prenom, IDprofil, telephone } = userData;
        const [result] = await db.execute(
            'UPDATE utilisateur SET email = ?, nom = ?, prenom = ?, IDprofil = ?, telephone = ? WHERE IDutilisateur = ?',
            [email, nom, prenom, IDprofil, telephone || null, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.execute('DELETE FROM utilisateur WHERE IDutilisateur = ?', [id]);
        return result;
    }
}

module.exports = User;
