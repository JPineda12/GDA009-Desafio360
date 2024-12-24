import EstadoEnum from "../utils/constants/EstadoEnum.js";
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
const ProductCategoryService = {

  async createProductCategory(body, userCreatorid) {
    try {
      const replacements = {
        idUsuario: userCreatorid,
        nombre: body.nombre,
        idEstado: EstadoEnum.ACTIVO,
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
      return result;
    } catch (error) {
      throw error;
    }
  },

  async getCategoriesList() {
    try {
      const result = await sequelize.query('EXEC obtener_categoria_producto;', {
        type: QueryTypes.SELECT,
      });
      return result
    } catch (exception) {
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
      return result;
    } catch (error) {
      throw error;
    }
  },

  async deleteCategory(idCategoria) {
    try {
      const result = await sequelize.query('EXEC eliminar_categoria_producto @idCategoria=:idCategoria;', {
        replacements: { idCategoria: idCategoria},
        type: QueryTypes.DELETE,
      });
      return result
    } catch (exception) {
      throw exception
    }
  }
}

export default ProductCategoryService;