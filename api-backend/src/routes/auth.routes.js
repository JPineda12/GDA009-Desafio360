import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', AuthController.login);


const AuthRoutes = {
    router
};

export default AuthRoutes;