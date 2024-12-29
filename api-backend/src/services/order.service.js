import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

const OrderService = {

  async getOrderById(idOrden) {
    try {
      const [result] = await sequelize.query('EXEC obtener_orden_por_id @idOrden = :id', {
        replacements: { id: idOrden },
        type: QueryTypes.SELECT,
      });
      logger.debug('Get order by orderId database result ', result)
      return result
    } catch (exception) {
      logger.error('Get order by orderId service error ', exception)
      throw exception
    }
  },

  async getOrdersByUserId(idUsuario) {
    try {
      const [result] = await sequelize.query('EXEC obtener_orden_por_idUsuario @idUsuario = :id', {
        replacements: { id: idUsuario },
        type: QueryTypes.SELECT,
      });
      logger.debug('Get orders by User Id database result ', result)
      return result
    } catch (exception) {
      logger.error('Get order by User Id service error ', exception)
      throw exception
    }
  },

  async getOrdersList() {
    try {
      const result = await sequelize.query('EXEC obtener_ordenes;', {
        type: QueryTypes.SELECT,
      });
      logger.debug('Get Order list database result', result)
      return result
    } catch (exception) {
      logger.erro('Get orders list service error ', exception)
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
      logger.debug('Create order database result ', result)
      return result;
    } catch (error) {
      console.log("ERROR: test", error.stack)
      logger.error('Crate order service error ', error)
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
      logger.debug('Update order database result ', result)
      return result;
    } catch (error) {
      logger.error('Update order service error ', exception)
      throw error;
    }
  },

  async updateDeliveredOrder(idOrden) {
    try {
      const replacements = {
        idOrden: idOrden,
      };

      const query = `
      EXEC actualizar_orden_entregada
          @idOrden=:idOrden`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });
      logger.debug('Update delivered order database result', result)
      return result;
    } catch (error) {
      logger.error('Update delivered order service error ', error)
      throw error;
    }
  },

  async getOrderDetail(idOrden) {
    try {
      const [result] = await sequelize.query('EXEC obtener_detalle_orden @idOrden = :id', {
        replacements: { id: idOrden },
        type: QueryTypes.SELECT,
      });
      logger.debug('Get order detail database result ', result)
      return result
    } catch (exception) {
      logger.error('Get order detail service error ', exception)
      throw exception
    }
  }

}

export default OrderService;