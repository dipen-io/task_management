const User = require("../user/user.model");
const bcrypt = require("bcrypt");
const AppError = require('../../utils/AppError');
const jwt = require("jsonwebtoken");
const { COOKIE_OPTIONS } = require('../../constant/cookieOption');

const generateToken = async(userId, role) => {
   const accessToken = jwt.sign(
        {id: userId, role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '15m'}
    ) 

    const refreshToken = jwt.sign(
        {id: userId},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'}
    )
    return { accessToken, refreshToken };
}

const registerUser = async ({ name, email, password, adminSecret }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new AppError('Email already in use', 409);

    // Default role is Employee
    let userRole = 'Employee';

    // If they provided the secret key, upgrade them to Admin
    if (adminSecret && adminSecret === process.env.ADMIN_SECRET_KEY) {
        userRole = 'Admin';
    }

    const user = await User.create({
        name, email, password, role: userRole
    });

    const {accessToken, refreshToken} = await generateToken(user._id, user.role);
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await user.save({ validateBeforeSave: false });

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role 
        }, accessToken, refreshToken 
    };

}

const loginUser = async(res, { email, password}) => {
    const user = await User.findOne({email}).select('+password');
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const { accessToken , refreshToken } = await  generateToken(user._id, user.role);

    const hashedToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedToken; 
    await user.save({ validateBeforeSave: false });
    res.cookie( 'refreshToken', refreshToken, COOKIE_OPTIONS );
  return { user: { _id: user._id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken };
}

module.exports = { registerUser, loginUser }
