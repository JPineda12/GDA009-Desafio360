import { Router } from 'express';
import IndexController from '../controllers/index.controller.js';

const router = Router();

router.get('/', IndexController.getHome);

const IndexRoutes = {
  router,
};

export default IndexRoutes;
