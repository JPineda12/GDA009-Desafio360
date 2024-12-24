import ImageService from '../services/image.service.js';

const ImageController = {
    async uploadBase64Image(req, res) {
        try {
            const { imagen_base64 } = req.body;
            console.log("THE Body is: ", imagen_base64 )
            if (!imagen_base64) {
                return res.status(400).json({ message: 'No Base64 image provided' });
            }
            const imageUrl = await ImageService.saveBase64Image(imagen_base64, req);
            return res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading image', error: error.message });
        }
    }
}

export default ImageController;