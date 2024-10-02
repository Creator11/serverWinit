require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const User = require('./models/user-model');  // Импорт модели пользователя
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig'); 


const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
       
    }
));
app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(errorMiddleware);

app.get('/test-db', async (req, res) => {
    try {
        const users = await User.findAll();  // Пример запроса к базе данных
        res.json(users);
        res.status(200).send('успешное подключение');
        console.log("console.log")
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка подключения к базе данных');
    }
});

const start = async () => {
    try {
        // await sequelize.authenticate();  // Проверка подключения к базе данных
        // console.log('Успешное подключение к базе данных');
        //
        // await sequelize.sync();  // Синхронизация моделей с базой данных
        // console.log('Модели синхронизированы с базой данных');

        app.listen(PORT, () => console.log(`Сервер слушает на порту ${PORT}`));
    } catch (err) {
        console.log('Ошибка подключения к базе данных:', err);
    }
};

start();
