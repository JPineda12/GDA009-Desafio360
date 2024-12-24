import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtUtils = {
     generateToken(user) {
        return jwt.sign(
            { id: user.id, email: user.correo_electronico, nombre: user.nombre_completo, idRol: user.rol_idRol },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRE_TIME }
        );
    },

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default jwtUtils;
