const bcrypt = require('bcryptjs');
const db = require('./src/config/db');

async function createAdmin() {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const nom = process.env.ADMIN_NOM?.trim() || 'Admin';
    const prenom = process.env.ADMIN_PRENOM?.trim() || '';
    const telephone = process.env.ADMIN_TELEPHONE?.trim() || null;

    if (!email || !password) {
        throw new Error('ADMIN_EMAIL et ADMIN_PASSWORD sont obligatoires.');
    }

    if (password.length < 8) {
        throw new Error('ADMIN_PASSWORD doit contenir au moins 8 caracteres.');
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();
        await connection.execute(
            'INSERT IGNORE INTO profil (libele) VALUES (?)',
            ['Administrateur']
        );

        const [profiles] = await connection.execute(
            'SELECT IDprofil FROM profil WHERE libele = ? LIMIT 1',
            ['Administrateur']
        );

        if (profiles.length === 0) {
            throw new Error('Impossible de trouver ou creer le profil Administrateur.');
        }

        const [existingUsers] = await connection.execute(
            'SELECT IDutilisateur FROM utilisateur WHERE email = ? LIMIT 1',
            [email]
        );

        if (existingUsers.length > 0) {
            throw new Error(`Un utilisateur existe deja avec l'adresse ${email}.`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const [result] = await connection.execute(
            `INSERT INTO utilisateur
                (email, mot_de_passe, nom, prenom, IDprofil, telephone)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [email, hashedPassword, nom, prenom, profiles[0].IDprofil, telephone]
        );

        await connection.commit();
        console.log(`Administrateur cree avec succes (ID ${result.insertId}, email ${email}).`);
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

createAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(`Erreur : ${error.message}`);
        process.exit(1);
    });

