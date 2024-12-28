import { Router } from 'express';
import ImageController from '../controllers/image.controller.js';

const router = Router();

router.post('/upload', ImageController.uploadBase64Image);

const ImageRoutes = {
    router
}

export default ImageRoutes;
