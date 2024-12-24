
import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};

const LogMiddleware = morgan('combined', { stream });

export default LogMiddleware;
