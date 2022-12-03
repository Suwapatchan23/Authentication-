const CustomAPIError = require("./custom-api.js");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnauthenticatedError = require("./unauthentcated");

module.exports = {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    CustomAPIError,
};
