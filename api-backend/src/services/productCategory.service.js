import EstadoEnum from "../utils/constants/EstadoEnum.js";
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from "../utils/logger.js";

const ProductCategoryService = {

  async createProductCategory(body, userCreatorid) {
    try {
      const replacements = {
        idUsuario: userCreatorid,
        nombre: body.nombre,
        idEstado: body.idEstado,
      };

      const query = `
          EXEC crear_categoria_producto
              @idUsuario=:idUsuario,
              @nombre=:nombre,
              @idEstado=:idEstado`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });
      console.log('Create product category database result ', result );
      return result[0][0];
    } catch (error) {
      logger.error('Create category service error ', error)
      throw error;
    }
  },

  async getCategoriesList() {
    try {
      const result = await sequelize.query('EXEC obtener_categoria_producto;', {
        type: QueryTypes.SELECT,
      });
      logger.debug('Get category list database result ', result)
      return result
    } catch (exception) {
      logger.error('Get categories list service error ', exception)
      throw exception
    }
  },

  async updateProductCategory(idCategoria, body, userCreatorid) {
    try {
      const replacements = {
        idCategoria: idCategoria,
        idUsuario: userCreatorid,
        nombre: body.nombre,
        idEstado: body.idEstado,
      };

      const query = `
          EXEC editar_categoria_producto
              @idCategoria=:idCategoria,
              @idUsuario=:idUsuario,
              @nombre=:nombre,
              @idEstado=:idEstado`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });
      logger.debug('Update product category database result ', result)
      return result[0][0];
    } catch (error) {
      logger.error('Update product category service error ', error)
      throw error;
    }
  },

  async deleteCategory(idCategoria) {
    try {
      const result = await sequelize.query('EXEC eliminar_categoria_producto @idCategoria=:idCategoria;', {
        replacements: { idCategoria: idCategoria},
        type: QueryTypes.DELETE,
      });
      logger.debug('Delete category database result ', result);
      return result
    } catch (exception) {
      logger.error('Delete category service error ', exception)
      throw exception
    }
  }
}

export default ProductCategoryService;