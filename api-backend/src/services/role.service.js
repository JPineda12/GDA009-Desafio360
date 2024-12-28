import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

const RoleService = {

  async createRole(body) {
    try {
      const replacements = {
        nombre: body.nombre,
      };

      const query = `
          EXEC crear_rol @nombre=:nombre`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });
      logger.debug('Create role result ', result);
      return result;
    } catch (error) {
      logger.error('Create role service error ', error);
      throw error;
    }
  },

  async getRolesList() {
    try {
      const result = await sequelize.query('EXEC obtener_roles;', {
        type: QueryTypes.SELECT,
      });
      logger.debug('Get roles list database result ', result)
      return result
    } catch (exception) {
      logger.error('Get roles list service error ', exception)
      throw exception
    }
  },
}

export default RoleService;