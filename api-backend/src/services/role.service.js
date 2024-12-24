import EstadoEnum from "../utils/constants/EstadoEnum.js";
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
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
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getRolesList() {
    try {
      const result = await sequelize.query('EXEC obtener_roles;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },
}

export default RoleService;