import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const swaggerJson = require('./swagger.json')

function swaggerDocs(app: Express) {
 app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
}

export default swaggerDocs;