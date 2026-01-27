const User = require('../models/userModel');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users); // Frontend expects direct array from Service
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { nom, prenom, email, login, telephone, IDprofil, profil, idProfil, motDePasse, mot_de_passe } = req.body;

        // Adaptation des noms de champs venant du frontend
        const finalEmail = email || login;
        const finalIDprofil = IDprofil || profil || idProfil;
        const finalPassword = motDePasse || mot_de_passe;
        const finalTelephone = telephone || req.body.num_tel || req.body.tel;

        if (!finalPassword) {
            return res.status(400).json({ message: "Le mot de passe est requis" });
        }

        if (!finalIDprofil) {
            return res.status(400).json({ message: "Le champ profil est requis" });
        }

        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash(finalPassword, 12);

        const result = await User.create({
            email: finalEmail,
            password: hashedPassword,
            name: nom,
            prenom: prenom,
            IDprofil: finalIDprofil,
            telephone: finalTelephone
        });

        res.status(201).json({ message: 'Utilisateur créé', IDutilisateur: result.insertId });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { nom, prenom, email, IDprofil, telephone } = req.body;

        const result = await User.update(id, { nom, prenom, email, IDprofil, telephone });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur mis à jour' });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await User.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        next(error);
    }
};
