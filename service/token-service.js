const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token-model");
const User = require("../models/user-model");

class TokenService {
    async generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return {
                accessToken,
                refreshToken
            };
        } catch (err) {
            console.error("Error generating tokens:", err);
            throw err; // Пробрасываем ошибку наверх для обработки в контроллере или маршрутизаторе
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData
        }
        catch (err) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData
        }
        catch (err) {
            return null;
        }
    }
    async saveToken(userId, refreshToken) {
        try {
            let tokenData = await tokenModel.findOne({ where: { userId } });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            } else {
                tokenData = await tokenModel.create({ userId, refreshToken });
                return tokenData;
            }
        } catch (err) {
            console.error("Error saving token:", err);
            throw err; // Пробрасываем ошибку наверх для обработки в контроллере или маршрутизаторе
        }
    }

    async removeToken(refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token is undefined');
        }
        const tokenData = await tokenModel.destroy({ where: { refreshToken } });
        return tokenData;
    }

    async findToken(refreshToken) {

        const tokenData = await tokenModel.findOne({ where: { refreshToken } });
        return tokenData;
    }

}

module.exports = new TokenService();
