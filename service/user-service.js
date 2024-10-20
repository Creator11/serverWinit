const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('./mail-service');
const TokenService = require('./token-service'); // Исправлено название импорта
const UserDto = require("../dtos/user-dto"); 

class UserService {
    async registration(email,nickName, password) {
        try {
            const candidate = await UserModel.findOne({ where: { email } });

            if (candidate) {
                throw new Error(`Пользователь с адресом ${email} уже существует`);
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const activationLink = uuid.v4();
            const user = await UserModel.create({ 
                email, 
                nickName, 
                password: hashPassword, 
                activationLink,
                avatar: 'uploads/avatars/7171ef3a75eb51ed4c98d9a6575897c7' // Установите аватар по умолчанию
            });

            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

            const userDto = new UserDto(user);
            const tokens = await TokenService.generateTokens({ ...userDto });

            await TokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const user = await UserModel.findOne({ where: { email } });

            if (!user) {
                throw new Error('Пользователь с таким email не найден');
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw new Error('Неверный пароль');
            }

            const userDto = new UserDto(user);
            const tokens = await TokenService.generateTokens({ ...userDto });

            await TokenService.saveToken(userDto.id, tokens.refreshToken);

            return { ...tokens, user: userDto };
        } catch (error) {
            console.error("Ошибка при логине пользователя:", error);
            throw error;
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ where: { activationLink } });
        if (!user) {
            throw new Error('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken) {
        console.log('Refresh token received:', refreshToken);
        if (!refreshToken) {
            throw ApiError.UnauthorizedError("no refresh token");
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw ApiError.UnauthorizedError("no user data");
        }

        const tokenFromDb = await TokenService.findToken(refreshToken);
        console.log('Token from DB:', tokenFromDb);

        if (!tokenFromDb) {
            throw ApiError.UnauthorizedError("no DB  token");
        }

        const user = await UserModel.findByPk(userData.id); // Используем findByPk для поиска по первичному ключу
        console.log('User found:', user);

        const tokens = await TokenService.generateTokens({ id: user.id, email: user.email });
        console.log('New tokens generated:', tokens);

        await TokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user };
    }


    async addCoins(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                console.log('Пользователь не найден');
                throw new Error('Пользователь не найден');

            }
            user.coins += amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            throw error;
        }
    }



    async removeCoins(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            if (user.coins < amount) {
                throw new Error('Недостаточно монет');
            }
            user.coins -= amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при списании монет:", error);
            throw error;
        }
    }

    async removeLevel(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            if (user.level < amount) {
                throw new Error('Недостаточно монет');
            }
            user.level -= amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при списании монет:", error);
            throw error;
        }
    }


    async removeStars(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('Пользователь не найден');
            }
            if (user.stars < amount) {
                throw new Error('Недостаточно монет');
            }
            user.stars -= amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при списании монет:", error);
            throw error;
        }
    }


    async getCoins(userId) {
        const coins = await UserModel.findByPk(userId);
        return coins
    }
    async addStars(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                console.log('Пользователь не найден');
                throw new Error('Пользователь не найден');

            }
            user.stars += amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            throw error;
        }
    }
    async getStars(userId) {
        const stars = await UserModel.findByPk(userId);
        return stars
    }
    async getLevel(userId) {
        const level = await UserModel.findByPk(userId);
        return level
    }
    async addLevel(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                console.log('Пользователь не найден');
                throw new Error('Пользователь не найден');

            }
            user.level += amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            throw error;
        }
    }
    async getPremium(userId) {
        const premium = await UserModel.findByPk(userId);
        return premium
    }
    async getStreak(userId) {
        const streak = await UserModel.findByPk(userId);
        return streak
    }
    async addStreak(userId, amount) {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                console.log('Пользователь не найден');
                throw new Error('Пользователь не найден');

            }
            user.streak += amount;
            await user.save();
            return user;
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            throw error;
        }
    }
    async getCompleteTask(userId) {
        const completeTask = await UserModel.findByPk(userId);
        return completeTask
    }
    async addCompleteTask(userId, taskId) {
        try {
            
            const user = await UserModel.findByPk(userId);
            if (!user) {
                console.log('Пользователь не найден');
                throw new Error('Пользователь не найден');
            }
            
            user.completeTask.push(taskId);
            await UserModel.update(
                { completeTask: user.completeTask }, 
                { where: { id: userId } } 
            );     

            return user;
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
            throw error;
        }
    }
    async getUser(userId) {
        const user = await UserModel.findByPk(userId);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        return user;
    }


    async getAllUsers() {
        const users = await UserModel.findAll();
        return users
    }
}

module.exports = new UserService();
