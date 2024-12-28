import axios from 'axios';
import logger from '../utils/logger.js';

const ImageService = {
    async callImageUploadBackend(base64Image) {
        try {
            const imageApiUrl = `${process.env.FILES_API_URL}/images/upload`;

            const imagePayload = {
                imagen_base64: base64Image
            };

            const response = await axios.post(imageApiUrl, imagePayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            logger.info('Call image upload backend result: ', response)
            return response.data.imageUrl;
        } catch (error) {
            logger.error('Call image upload backend error', error)
            throw error
        }
    }
};

export default ImageService;
