const jwt = require('jsonwebtoken');
const User = require('../modules/user/user.model');
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new AppError('No Token Provided', 401); 
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new AppError('Invalid or expired token', 401);
    }

    const user = await User.findById(decoded.id).lean(); 

    if (!user) throw new AppError("User no longer exists", 401);

    req.user = user;
    next();
});

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw new AppError(`Access denied for role: ${req.user.role}`, 403);
    }
    console.log("USER ROLE: ", req.user.role);
    next();
}

module.exports = { protect, authorize };
