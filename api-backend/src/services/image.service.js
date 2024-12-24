import axios from 'axios';

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
            console.log("RESPONSE: ", response)
            return response.data.imageUrl;

        } catch (error) {
            console.log("ERROR AQUI:", error)
            throw error
        }
    }
};

export default ImageService;
