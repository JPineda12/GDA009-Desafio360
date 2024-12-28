import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import imageType from 'image-type';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ImageService = {
    async saveBase64Image(base64String, req) {
        try {
            const imageData = base64String;
            if (!/^[A-Za-z0-9+/=]+$/.test(imageData)) {
                throw new Error('Invalid Base64 string');
            }
            const buffer = Buffer.from(imageData, 'base64');
            const type = await imageType(buffer);
            if (!type) {
                throw new Error('Could not determine the image type');
            }
            const extension = type.ext;

            const filename = `${Date.now()}-${uuidv4()}.${extension}`;
            const storageDir = path.join(__dirname, '../storage');
            if (!existsSync(storageDir)) {
                mkdirSync(storageDir, { recursive: true });
            }
            const filePath = path.join(storageDir, filename);
            writeFileSync(filePath, imageData, { encoding: 'base64' });

            const imageUrl = `${req.protocol}://${req.get('host')}/api/uploaded/${filename}`;
            return imageUrl;
        } catch (error) {
            throw new Error('Failed to save Base64 image: ' + error.message);
        }
    }
}

export default ImageService;
