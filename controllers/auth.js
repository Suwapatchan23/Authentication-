const User = require("../models/User.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Register Function
const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

// Login Function
const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if user provide email and password?
    if (!email || !password) {
        throw new BadRequestError("Please provide email and password!!!");
    }
    const user = await User.findOne({ email });
    // Check if the user is exists?
    if (!user) {
        throw new UnauthenticatedError("Invalid credentials!!!");
    }
    const isPasswordCorrect = await user.checkPassword(password);
    // Check if the password is correct?
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
    register,
    login,
};
