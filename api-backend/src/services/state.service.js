import EstadoEnum from "../utils/constants/EstadoEnum.js";
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
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
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getStatesList() {
    try {
      const result = await sequelize.query('EXEC obtener_estado;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
      throw exception
    }
  },
}

export default StateService;