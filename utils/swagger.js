import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APIs documentation',
      version: '1.0.0',
      contact: {
        name: "API's repository",
        url: 'https://github.com/sbacanski0730/weather-and-hr-logbook-api',
      },
    },
    servers: [{ url: process.env.BASE_URL, description: 'Main for this api' }],
  },
  apis: ['./routes/*.js'],
  swaggerOptions: {
    plugins: [],
  },
};

const swaggerOptions = {
  swaggerOptions: {
    tryItOutEnabled: false,
    supportedSubmitMethods: [''],
  },
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
};

export default swaggerDocs;
