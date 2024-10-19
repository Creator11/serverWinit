const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    activationLink: {
        type: DataTypes.STRING,
        allowNull: true
    },
    premium: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    stars: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    completeTask: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: []
    },
    avatar: {  
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    timestamps: true,
    tableName: 'Users'
});

module.exports = User;
