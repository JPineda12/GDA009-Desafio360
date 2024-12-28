import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';
const StateService = {

  async createState(body) {
    try {
      const replacements = {
        nombre: body.nombre,
      };

      const query = `
          EXEC crear_estado @nombre=:nombre`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });
      logger.debug('Create state database result ', result);
      return result;
    } catch (error) {
      logger.debug('Create state service error', error);
      throw error;
    }
  },

  async getStatesList() {
    try {
      const result = await sequelize.query('EXEC obtener_estado;', {
        type: QueryTypes.SELECT,
      });
      logger.debug('Get States List database result ', result);
      return result
    } catch (exception) {
      logger.debug('Get States List error ', exception)
      throw exception
    }
  },
}

export default StateService;