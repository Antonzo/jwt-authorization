const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        req.accessToken = accessToken;
        next()
    } catch(e) {
        next(ApiError.UnauthorizedError());
    }
}