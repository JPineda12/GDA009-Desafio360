import UserService from '../services/user.service.js';
import responseUtils from '../utils/responseUtils.js';
import HttpStatusCode from '../utils/constants/httpStatusCode.js';

const UserController = {

  async getUserById(req, res, next) {
    try {
      const userId = req.params.idUsuario;
      const result = await UserService.getUserById(userId);
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async getUsersList(_, res, next) {
    try {
      const result = await UserService.getUserList();
      responseUtils.successResponse(res, "", result, HttpStatusCode.OK);
    } catch (error) {
      next(error);
    }
  },

  async createUser(req, res, next) {
    try {
      const userData = req.body;
      const result = await UserService.createUser(userData);
      responseUtils.successResponse(res, 'User created succesfully', result)
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const userId = req.params.idUsuario
      const userUpdate = req.body;
      const result = await UserService.updateUser(userId, userUpdate);
      responseUtils.successResponse(res, 'User updated successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  },

  async inactivateUser(req, res, next){
    try {
      const userId = req.params.idUsuario
      const result = await UserService.deleteUser(userId);
      responseUtils.successResponse(res, 'User deleted successfully', result, HttpStatusCode.OK)
    } catch (error) {
      next(error)
    }
  }
};

export default UserController;