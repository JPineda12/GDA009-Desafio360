import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import EstadoEnum from '../utils/constants/EstadoEnum.js';

const CustomerService = {

  async getCustomerById(idCliente) {
    try {
      const [result] = await sequelize.query('EXEC obtener_cliente_por_id @idCliente = :id', {
        replacements: { id: idCliente },
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },

  async getCustomerList() {
    try {
      const result = await sequelize.query('EXEC obtener_clientes;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },


  async createCustomer(body) {
    try {
      const replacements = {
        razon_social: body.razon_social,
        nombre_comercial: body.nombre_comercial,
        direccion_entrega: body.direccion_entrega,
        telefono: body.telefono,
        correo_electronico: body.correo_electronico,
        idEstado: EstadoEnum.ACTIVO
      };

      const query = `
      EXEC crear_cliente
          @razon_social=:razon_social,
          @nombre_comercial=:nombre_comercial,
          @direccion_entrega=:direccion_entrega,
          @telefono=:telefono,
          @correo_electronico=:correo_electronico,
          @idEstado=:idEstado`

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateCustomer(idCliente, data) {
    try {
      const replacements = {
        idCliente: idCliente,
        razon_social: data.razon_social,
        nombre_comercial: data.nombre_comercial,
        direccion_entrega: data.direccion_entrega,
        telefono: data.telefono,
        correo_electronico: data.correo_electronico,
        idEstado: EstadoEnum.ACTIVO
      };

      const query = `
      EXEC editar_cliente
          @idCliente=:idCliente,
          @razon_social=:razon_social,
          @nombre_comercial=:nombre_comercial,
          @direccion_entrega=:direccion_entrega,
          @correo_electronico=:correo_electronico,
          @telefono=:telefono,
          @idEstado=:idEstado`

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteCustomer(id) {
    try {
      const [result] = await sequelize.query('EXEC eliminar_cliente @idCliente = :id', {
        replacements: { id: id },
        type: QueryTypes.DELETE,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },

}

export default CustomerService;