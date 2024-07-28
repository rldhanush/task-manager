const jwt = require('jsonwebtoken');
const { db } = require('../config/firebaseAdmin');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Not Logged in. Please login to access task manager' });
    }
    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Verify if token is in activeTokens
        const activeTokenRef = db.collection('tokens').doc('activeTokens');
        const activeTokenDoc = await activeTokenRef.get();
        const activeTokenData = activeTokenDoc.data();
        if (!activeTokenData.tokens.includes(token)) {
            return res.status(401).json({ message: 'Please Login to access' });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
