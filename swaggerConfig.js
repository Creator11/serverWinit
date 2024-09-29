const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WINIT API', // Название вашего API
      version: '1.0.0', // Версия вашего API
      description: 'Description of your API', // Описание вашего API
    },
  },
  apis: ['./router/*.js'], // Путь к файлам с описанием ваших маршрутов
};

const specs = swaggerJSDoc(options);

module.exports = specs;
