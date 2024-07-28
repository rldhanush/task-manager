const { admin, db, FieldValue } = require('../config/firebaseAdmin');
const { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('../config/firebaseClient');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Signup Logic - Input : FirstName, LastName, Email, Password.
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, firstName, lastName } = req.body;
    try{
        //Check if email is already present in 'users' collection in Firestore
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (!snapshot.empty) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        //Create user with Firebase Authentication - createUserWithEmailAndPassword(auth, email, password)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //Save user details in Firestore
        await db.collection('users').doc(user.uid).set({
            email,
            firstName,
            lastName,
            displayName: `${firstName} ${lastName}`,
            createdAt: new Date().toISOString()
        });

        res.status(201).json({ message: 'User created successfully' });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login - email and password - using signinwithemailandpassword(auth, email, password)
const login = async (req, res) => {
    const {email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //Generate JWT token
        const token = jwt.sign({ uid: user.uid, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //store JWT token in 'tokens' collection in Firestore - activeTokes document - tokens array
        const activeTokenRef = db.collection('tokens').doc('activeTokens');
        const activeTokenDoc = await activeTokenRef.get();
        const activeTokenData = activeTokenDoc.data();
        if (!activeTokenData.tokens.includes(token)) {
            await activeTokenRef.update({
                tokens: FieldValue.arrayUnion(token)
            });   
        }
        //send response with token 
        res.status(200).json({ message: 'Login successful', token });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//logout - remove token from 'tokens' collection in Firestore and use signOut(auth) to sign out user
const logout = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization?.split(' ')[1];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check if token is in activeTokens
        const activeTokenRef = db.collection('tokens').doc('activeTokens');
        const activeTokenDoc = await activeTokenRef.get();
        const activeTokenData = activeTokenDoc.data();
        if (!activeTokenData.tokens.includes(token)) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // remove token from activeTokens
        await activeTokenRef.update({
            tokens: FieldValue.arrayRemove(token)
        });
        // sign out user
        await signOut(auth);
        res.status(200).json({ message: 'Logout successful' });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports = { signup , login, logout };