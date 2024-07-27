const { db } = require('../config/firebaseAdmin'); // For Firestore
const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('../config/firebaseClient'); // For Auth
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
        // Check if email is already registered
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (!snapshot.empty) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user to Firestore
        await db.collection('users').doc(user.uid).set({
            firstName,
            lastName,
            email,
        });
        res.status(201).json({ message: 'User created successfully', userId: user.uid });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Generate JWT token
        const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = async (req, res) => {
    try {
        await signOut(auth);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, logout };
