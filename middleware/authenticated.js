const user = require("../models/User");
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthentcated");

// authenticated the token
const auth = async (req, res) => {
    const authHeader = req.header.authorization;
    // Check if there is authHeader
    if (!authHeader) {
        throw new UnauthenticatedError("Authentication Invalid!!!");
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { userId: payload.userID, name: payload.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid!!!");
    }
};

module.exports = auth;
