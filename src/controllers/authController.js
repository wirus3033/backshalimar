const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        // Check if user exists
        const existingUser = await User.findByLogin(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const result = await User.create({
            email,
            password: hashedPassword,
            name,
            IDprofil: req.body.IDprofil
        });

        res.status(201).json({ message: 'Utilisateur créé', userId: result.insertId });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        console.log('--- LOGIN ATTEMPT ---');
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);

        const { login, motDePasse, mot_de_passe } = req.body;
        const finalPassword = motDePasse || mot_de_passe;

        if (!login || !finalPassword) {
            return res.status(400).json({ message: 'Login et mot de passe requis' });
        }

        const user = await User.findByLogin(login);
        if (!user) {
            return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
        }

        const isEqual = await bcrypt.compare(finalPassword, user.mot_de_passe);
        if (!isEqual) {
            return res.status(401).json({ message: 'Login ou mot de passe incorrect' });
        }

        const token = jwt.sign(
            { email: user.email, userId: user.IDutilisateur },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token: token,
            utilisateur: {
                id: user.IDutilisateur,
                nom: user.nom,
                email: user.email,
                profil: user.profil || 'Utilisateur'
            }
        });

    } catch (error) {
        next(error);
    }
};
