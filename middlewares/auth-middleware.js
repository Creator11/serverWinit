const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) { 
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'No authorization header provided' });
        }

        const accessToken = authorizationHeader.split(' ')[1]; 
        if (!accessToken) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const userData = tokenService.validateAccessToken(accessToken);
        console.log('Decoded User Data:', userData);
        if (!userData) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = userData;
        console.log('true login - User Data:', req.user);
        next();
    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
};
