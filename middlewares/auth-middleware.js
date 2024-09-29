const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) { // Исправлено err на req
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'No authorization header provided' });
        }

        const accessToken = authorizationHeader.split(' ')[1]; // изменено '' на ' '
        if (!accessToken) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = userData;
        console.log('User Data:', req.user); // Логируем req.user
        next();
    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
};
