import bcrypt from 'bcrypt';
import jwtUtils from '../utils/jwtUtils.js';
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
const AuthService = {
    async login(data) {
        try {
            const [user] = await sequelize.query('EXEC obtener_usuario_por_correo @correo_electronico = :correo_electronico', {
                replacements: { correo_electronico: data.correo_electronico },
                type: QueryTypes.SELECT,
            });
            if (user) {
                const storedPassword = user.password;
                const isPasswordCorrect = await bcrypt.compare(data.password, storedPassword);

                if (isPasswordCorrect) {
                    const token = jwtUtils.generateToken(user);

                    return { message: 'Login successful', token: token };
                } else {
                    throw new Error('Invalid credentials');
                }
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.log('ERROR:', error);
            throw error;
        }
    },
}

export default AuthService