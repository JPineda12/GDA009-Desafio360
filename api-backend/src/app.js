import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import IndexRoutes from './routes/index.routes.js';
import errorMiddleware from './middlewares/errorMiddlewares.js';
import authenticateJWT from './middlewares/authMiddleware.js';
import ProductCategoryRoutes from './routes/productCategory.routes.js';
import RoleRoutes from './routes/role.routes.js';
import StateRoutes from './routes/state.routes.js';
import ProductRoutes from './routes/product.routes.js';
import OrderRoutes from './routes/order.routes.js';
import LogMiddleware from './middlewares/log.middleware.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  }));

app.use(LogMiddleware);

app.use(express.json({ limit: `${process.env.FILE_MAX_SIZE || '10mb'}` }));
app.use(express.urlencoded({ extended: true }));

app.use('/', IndexRoutes.router)
app.use('/api/auth/', AuthRoutes.router);
app.use('/api/users/', authenticateJWT, UserRoutes.router);
app.use('/api/products-categories/', authenticateJWT, ProductCategoryRoutes.router);
app.use('/api/roles/', authenticateJWT, RoleRoutes.router);
app.use('/api/states/', authenticateJWT, StateRoutes.router)
app.use('/api/products/', authenticateJWT, ProductRoutes.router);
app.use('/api/orders/', authenticateJWT, OrderRoutes.router);

app.use(errorMiddleware);

export default app;
