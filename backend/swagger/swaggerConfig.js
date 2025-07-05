import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Finance Tracker API',
      version: '1.0.0',
      description: 'API documentation for managing personal finances',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Change if needed
      },
    ],
  },
  apis: ['./routes/*.js'], // Route file(s) with Swagger annotations
};

import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = YAML.load(path.join(__dirname, './swagger.yaml'));

export { swaggerUi, swaggerSpec };
