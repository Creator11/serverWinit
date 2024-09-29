const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user-model'); // Подключаем модель User

const Token = sequelize.define('Token', {
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // Ссылка на модель User
            key: 'id'
        }
    }
}, {
    // Дополнительные настройки модели
    timestamps: true,
    tableName: 'Tokens'
});

// Определяем ассоциацию между Token и User
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = Token;
