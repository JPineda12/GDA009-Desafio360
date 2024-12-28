import { QueryTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ImageService from './image.service.js';
import logger from '../utils/logger.js';
const ProductService = {

  async getProductById(idProducto) {
    try {
      const [result] = await sequelize.query('EXEC obtener_producto_por_id @idProducto = :id', {
        replacements: { id: idProducto },
        type: QueryTypes.SELECT,
      });
      logger.debug('Get product by id database result ', result)
      return result
    } catch (exception) {
      logger.error('Get product by id service error ', exception)
      throw exception
    }
  },

  async getProductsList() {
    try {
      const result = await sequelize.query('EXEC obtener_productos;', {
        type: QueryTypes.SELECT,
      });
      logger.debug('Get product list database result ', result)
      return result
    } catch (exception) {
      logger.error('Get products list service error ', exception)
      throw exception
    }
  },


  async createProduct(body, userCreatorid) {
    try {

      //Try to upload the image
      let imageUrl = await ImageService.callImageUploadBackend(body.imagen_base64)
      if (!imageUrl) {
        imageUrl = ''
      }

      const replacements = {
        nombre: body.nombre,
        marca: body.marca,
        codigo: body.codigo,
        stock: body.stock,
        precio: body.precio,
        imagen_url: imageUrl,
        idCategoria: body.idCategoria,
        idUsuario: userCreatorid,
        idEstado: body.idEstado
      };

      const query = `
      EXEC crear_producto
          @nombre=:nombre,
          @marca=:marca,
          @codigo=:codigo,
          @stock=:stock,
          @precio=:precio,
          @imagen_url=:imagen_url,
          @idCategoria=:idCategoria,
          @idUsuario=:idUsuario,
          @idEstado=:idEstado`;


      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.INSERT,
      });
      logger.debug('Create product database result ', result)
      return result;
    } catch (error) {
      logger.error('Create product service error ', error)
      throw error;
    }
  },

  async updateProduct(idProduct, body, userCreatorid) {
    try {
      const replacements = {
        idProducto: idProduct,
        nombre: body.nombre,
        marca: body.marca,
        codigo: body.codigo,
        stock: body.stock,
        precio: body.precio,
        imagen_url: body.imagen_url,
        idCategoria: body.idCategoria,
        idUsuario: userCreatorid,
        idEstado: body.idEstado
      };

      const query = `
      EXEC editar_producto
          @idProducto=:idProducto,
          @nombre=:nombre,
          @marca=:marca,
          @codigo=:codigo,
          @stock=:stock,
          @precio=:precio,
          @imagen_url=:imagen_url,
          @idCategoria=:idCategoria,
          @idUsuario=:idUsuario,
          @idEstado=:idEstado`;

      const result = await sequelize.query(query, {
        replacements,
        type: QueryTypes.UPDATE,
      });
      logger.debug('Update product database result ', result);
      return result;
    } catch (error) {
      logger.error('Update product service error ', error)
      throw error;
    }
  },


  async deleteProduct(id) {
    try {
      const [result] = await sequelize.query('EXEC eliminar_producto @idProducto = :id', {
        replacements: { id: id },
        type: QueryTypes.DELETE,
      });
      logger.debug('Delete product database result ', result);
      return result
    } catch (exception) {
      logger.error('Delete product service error ', exception)
      throw exception
    }
  },

}

export default ProductService;