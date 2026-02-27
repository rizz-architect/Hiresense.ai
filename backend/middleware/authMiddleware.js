const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Special handling for Guest Session (Accept multiple variants for transition safety)
            if (token === 'guest_token_123' || token === 'guest-bypass-token-777') {
                console.log('[AuthMiddleware] Guest Access Granted via Token:', token);
                req.user = {
                    _id: '65e0f0f0f0f0f0f0f0f0f0f0',
                    name: 'Guest User',
                    email: 'guest@hiresense.ai'
                };
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
            req.user = await User.findById(decoded.id).select('-googleId -__v');

            if (!req.user && token !== 'guest_token_123') {
                // If user not found in DB, still allow if it was a valid token (e.g. newly created)
                // or return error. For now, let's just make sure it doesn't crash.
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } catch (error) {
            console.error('Auth Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
