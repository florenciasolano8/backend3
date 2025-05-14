import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'Documentación de la API para gestión de usuarios, mascotas y adopciones'
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJSDoc(swaggerOptions);

export function swaggerDocs(app) {
  app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
}
