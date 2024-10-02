const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.error('Ошибка валидации:', errors.array());
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }
            const { email,nickName, password } = req.body;
            const userData = await userService.registration(email,nickName, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: false, // Установите на false, если нужно, чтобы JavaScript мог читать cookies
                secure: false, // Установите на true, если работаете по HTTPS
                sameSite: 'None' // Или 'Lax' в зависимости от вашей конфигурации
            });

            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: false, // Установите на false, если нужно, чтобы JavaScript мог читать cookies
                secure: false, // Установите на true, если работаете по HTTPS
                sameSite: 'None' // Или 'Lax' в зависимости от вашей конфигурации
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                return next(ApiError.BadRequest('Токен не предоставлен'));
            }
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

  async refresh(req, res, next) {
    try {
        const { refreshToken } = req.cookies;
        console.log('ALARM COOKIE!!! ALARM COOKIE!!! ALARM COOKIE!!! ALARM COOKIE!!! :', req.cookies);
        if (!refreshToken) {
            console.error('Refresh token not found in cookies');
            console.log('ALARM COOKIE!!! ALARM COOKIE!!! ALARM COOKIE!!! ALARM COOKIE!!! :', req.cookies);
            return next(ApiError.BadRequest('Refresh token not found'));
        }

        const userData = await userService.refresh(refreshToken);
        console.log('User data after refresh:', userData);

        res.cookie('refreshToken', userData.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    httpOnly: false,  
    secure: false,  
    sameSite: 'None' 
});
        return res.json(userData);
    } catch (error) {
        console.error('Error in refresh method:', error.message);
        next(error);
    }
}
    async uploadAvatar(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getUser(userId);

            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            
            if (user.avatar) {
                const oldAvatarPath = path.join(__dirname, '../', user.avatar);
                if (fs.existsSync(oldAvatarPath)) {
                    fs.unlinkSync(oldAvatarPath);
                }
            }

            // Сохранение пути к новому аватару в базе данных
            user.avatar = `uploads/avatars/${req.file.filename}`;
            await user.save();

            return res.json({ message: 'Аватар успешно загружен', avatar: user.avatar });
        } catch (error) {
            console.error("Ошибка при загрузке аватара:", error);
            next(error);
        }
    }
    async getAvatar(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getUser(userId);

            if (!user || !user.avatar) {
                return res.status(404).json({ message: 'Аватар не найден' });
            }

            const avatarPath = path.join(__dirname, '../', user.avatar);
            if (!fs.existsSync(avatarPath)) {
                return res.status(404).json({ message: 'Файл аватара не найден' });
            }

            return res.sendFile(avatarPath);
        } catch (error) {
            next(error);
        }
    }

    async addCoins(req, res) {
        try {
            console.log('User in addCoins:', req.user);  
            const { amount } = req.body;
            const userId = req.user.id;  

            if (!userId || typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ message: 'Invalid input' });
            }

            const user = await userService.addCoins(userId, amount);
            res.json({
                id: user.id,
                email: user.email,
                nickName: user.nickName,
                coins: user.coins
            });
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };
    async removeCoins(req, res, next) {
        try {
            const { amount } = req.body;
            const userId = req.user.id; // Получаем id пользователя из авторизации
            const user = await userService.removeCoins(userId, amount);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async getCoins(req, res, next) {
        try {
            const userId = req.user.id; // Получаем id пользователя из авторизации
            const user = await userService.getCoins(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }


    async getStars(req, res, next) {
        try {
            const userId = req.user.id; 
            const user = await userService.getStars(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async addStars(req, res) {
        try {
            console.log('User in addStars:', req.user);  
            const { amount } = req.body;
            const userId = req.user.id;  

            if (!userId || typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ message: 'Invalid input' });
            }

            const user = await userService.addStars(userId, amount);
            res.json(user);
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };


    async getPremium(req, res, next) {
        try {
            const userId = req.user.id; 
            const user = await userService.getPremium(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }


    async getStreak(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getStreak(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async addStreak(req, res) {
        try {
            console.log('User in addStreak:', req.user); // Логируем req.user
            const { amount } = req.body;
            const userId = req.user.id; // предполагается, что пользователь установлен в req.user

            if (!userId || typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ message: 'Invalid input' });
            }

            const user = await userService.addStreak(userId, amount);
            res.json(user);
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };

    async getCompleteTask(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getCompleteTask(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
 
    async addCompleteTask(req, res) {
        try {
            // console.log('User in addCompleteTask:', req.user); // Логируем req.user
            const { taskId } = req.body;
            const userId = req.user.id; // предполагается, что пользователь установлен в req.user
    
            if (!taskId || typeof taskId !== 'number') {
                return res.status(400).json({ message: 'Invalid input' });
            }
    
            const user = await userService.addCompleteTask(userId, taskId);
         
            res.json(user);
            // return res.status(200).json(user);
        } catch (error) {
            console.error("Ошибка при добавлении задания:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };


    async getLevel(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getLevel(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async addLevel(req, res) {
        try {
            console.log('User in addLevel:', req.user); // Логируем req.user
            const { amount } = req.body;
            const userId = req.user.id; // предполагается, что пользователь установлен в req.user

            if (!userId || typeof amount !== 'number' || amount <= 0) {
                return res.status(400).json({ message: 'Invalid input' });
            }

            const user = await userService.addLevel(userId, amount);
            res.json(user);
        } catch (error) {
            console.error("Ошибка при добавлении монет:", error);
            res.status(500).json({ message: 'Server error' });
        }
    };


    async getUser(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.getUser(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }


    async getUsers(req, res, next) {
        try {
           const users = await userService.getAllUsers()
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
