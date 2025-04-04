import { httpServer, app } from './src/app.js';
import logger from './src/config/logger.config.js';
import db from './src/models/index.js';

const PORT = process.env.PORT || 3000;

// Test database connection
db.sequelize.authenticate()
    .then(() => {
        logger.info('Database connection established successfully');

        // Start server
        httpServer.listen(PORT, () => {
            logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
        });
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
        process.exit(1);
    });