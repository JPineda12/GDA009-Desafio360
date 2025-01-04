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
        idEstado: body.idEstado,
        idRol: body.idRol
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
          @idRol=:idRol,
          @idEstado=:idEstado
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
      if (data.razon_social) replacements.razon_social = data.razon_social;
      if (data.nombre_comercial) replacements.nombre_comercial = data.nombre_comercial;
      if (data.direccion_entrega) replacements.direccion_entrega = data.direccion_entrega;

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
          ${data.razon_social ? ', @razon_social=:razon_social' : ''}
          ${data.nombre_comercial ? ', @nombre_comercial=:nombre_comercial' : ''}
          ${data.direccion_entrega ? ', @direccion_entrega=:direccion_entrega' : ''}`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return result[0][0];
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