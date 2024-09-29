const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tasks = sequelize.define('Tasks', {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
         },
        desc: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        info:  { 
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        results: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        startCode: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        tests: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        },
        rewards: {
            coins: {type: DataTypes.INTEGER,
                defaultValue: 0},
            stars: {
                type: DataTypes.INTEGER,
        defaultValue: 0
            },
            exp: {
                type: DataTypes.INTEGER,
        defaultValue: 0
            },
        },
}, {
    // Дополнительные настройки модели
    timestamps: true,
    tableName: 'Tasks'
});

module.exports = Tasks;
