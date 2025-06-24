// src/docs/swaggerConfig.js
export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoption API',
      version: '1.0.0',
      description: 'Documentación de API para usuarios, mascotas y adopciones.',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};
