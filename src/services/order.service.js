import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import EstadoEnum from '../utils/constants/EstadoEnum.js';

const OrderService = {

  async getOrderById(idOrden) {
    try {
      const [result] = await sequelize.query('EXEC obtener_orden_por_id @idOrden = :id', {
        replacements: { id: idOrden },
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },

  async getOrdersByUserId(idUsuario) {
    try {
      const [result] = await sequelize.query('EXEC obtener_orden_por_idUsuario @idUsuario = :id', {
        replacements: { id: idUsuario },
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },

  async getOrdersList() {
    try {
      const result = await sequelize.query('EXEC obtener_ordenes;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },


  async createOrder(data) {
    try {
      const replacements = {
        ordenJson: JSON.stringify(data),
      };

      const query = `
      EXEC crear_orden_con_detalle
          @ordenJson=:ordenJson`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async updateOrder(data) {
    try {
      const replacements = {
        ordenJson: JSON.stringify(data),
      };

      const query = `
      EXEC editar_orden_con_detalle
          @ordenJson=:ordenJson`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });

      return result;
    } catch (error) {
      throw error;
    }
  },

  async getOrderDetail(idOrden) {
    try {
      const [result] = await sequelize.query('EXEC obtener_detalle_orden @idOrden = :id', {
        replacements: { id: idOrden },
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  }

}

export default OrderService;