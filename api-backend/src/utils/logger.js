import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
const { combine, timestamp, printf, colorize } = format;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            ),
        }), new transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat  
            )
        }),
        new transports.File({
            filename: path.join(__dirname, '../logs/all.log'),
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat  
            )
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

export default logger;
