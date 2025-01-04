import bcrypt from 'bcrypt';
import jwtUtils from '../utils/jwtUtils.js';
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';
import AppError from '../utils/AppError.js';
import RolEnum from '../utils/constants/RolEnum.js';
import EstadoEnum from '../utils/constants/EstadoEnum.js';

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
                    throw new AppError('Credenciales invalidas', HttpStatusCode.UNAUTHORIZED)
                }
            } else {
                throw new AppError('Credenciales invalidas', HttpStatusCode.UNAUTHORIZED)
            }
        } catch (error) {
            logger.error('Login service error ', error)
            throw error;
        }
    },


    async signup(body) {
        try {
          const replacements = {
            correo: body.correo_electronico,
            nombre: body.nombre_completo,
            pass: await this.hashPassword(body.password),
            fecha: body.fecha_nacimiento,
          };
          if (body.telefono) replacements.telefono = body.telefono;
          if (body.razon_social) replacements.razon_social = body.razon_social;
          if (body.nombre_comercial) replacements.nombre_comercial = body.nombre_comercial;
          if (body.direccion_entrega) replacements.direccion_entrega = body.direccion_entrega;
    
    
          const query = `
          EXEC crear_usuario 
              @correo_electronico=:correo,
              @nombre_completo=:nombre,
              @password=:pass,
              @fecha_nacimiento=:fecha,
              @idRol=${RolEnum.CLIENTE},
              @idEstado=${EstadoEnum.ACTIVO}
              ${body.telefono ? ', @telefono=:telefono' : ''}
              ${body.razon_social ? ', @razon_social=:razon_social' : ''}
              ${body.nombre_comercial ? ', @nombre_comercial=:nombre_comercial' : ''}
              ${body.direccion_entrega ? ', @direccion_entrega=:direccion_entrega' : ''}`;
    
    
          const result = await sequelize.query(query, {
            replacements,
            type: QueryTypes.INSERT,
          });
    
          return result[0][0];
        } catch (error) {
          throw error;
        }
      },
}

export default AuthService