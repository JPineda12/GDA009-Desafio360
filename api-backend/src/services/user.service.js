import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';
import RolEnum from '../utils/constants/RolEnum.js';
import EstadoEnum from '../utils/constants/EstadoEnum.js';

const UserService = {

  async getUserById(id) {
    try {
      const [result] = await sequelize.query('EXEC obtener_usuario_por_id @idUsuario = :id', {
        replacements: { id: id },
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },

  async getUserList() {
    try {
      const result = await sequelize.query('EXEC obtener_usuarios;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },


  async createUser(body) {
    try {
      const replacements = {
        correo: body.correo_electronico,
        nombre: body.nombre_completo,
        pass: await this.hashPassword(body.password),
        fecha: body.fecha_nacimiento,
      };
      if (body.telefono) replacements.telefono = body.telefono;
      if (body.idCliente) replacements.idCliente = body.idCliente;


      const query = `
      EXEC crear_usuario 
          @correo_electronico=:correo,
          @nombre_completo=:nombre,
          @password=:pass,
          @fecha_nacimiento=:fecha,
          @idRol=${RolEnum.CLIENTE},
          @idEstado=${EstadoEnum.ACTIVO}
          ${body.telefono ? ', @telefono=:telefono' : ''}
          ${body.idCliente ? ', @idCliente=:idCliente' : ''}`;


      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(idUsuario, data) {
    try {


      const replacements = {
        idUsuario: idUsuario,
        correo: data.correo_electronico,
        nombre: data.nombre_completo,
        pass: await this.hashPassword(data.password),
        fecha: data.fecha_nacimiento,
        idRol: data.idRol,
        idEstado: data.idEstado,
      };
      if (data.telefono) replacements.telefono = data.telefono;
      if (data.idCliente) replacements.idCliente = data.idCliente;

      const query = `
      EXEC editar_usuario
          @idUsuario=:idUsuario, 
          @correo_electronico=:correo,
          @nombre_completo=:nombre,
          @password=:pass,
          @fecha_nacimiento=:fecha,
          @idRol=:idRol,
          @idEstado=:idEstado
          ${data.telefono ? ', @telefono=:telefono' : ''}
          ${data.idCliente ? ', @idCliente=:idCliente' : ''}`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const [result] = await sequelize.query('EXEC eliminar_usuario @idUsuario = :id', {
        replacements: { id: id },
        type: QueryTypes.DELETE,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },


  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

}

export default UserService;