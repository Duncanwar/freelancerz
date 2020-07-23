import bcrypt from 'bcrypt';
import handleResponse from '../utils/responseHandler.util';
import UserService from '../services/user.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import tokenGenerator from '../utils/jwtTokenGenerator';

const { createUser, getUserByEmailOrById, changeEmailNotificationStatus } = UserService;
const { created, ok } = statusCode;
const { userCreated, successfulLogin, notificationStatusUpdated } = customMessage;
const { successResponse, updatedResponse } = handleResponse;
/**
 * @description this class deals with the user model
 */
export default class UserController {
  /**
     *
     * @param {request} req
     * @param {response} res
     * @returns {object} the token of a created user or error messages
     */
  static async signup(req, res) {
    const formData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const plainTextPassword = formData.password;
    formData.password = bcrypt.hashSync(plainTextPassword, salt);
    formData.getEmailNotification = true;
    if (formData.userTypeId === 1) {
      formData.status = 'pending';
    }
    const { dataValues } = await createUser(formData);
    const token = tokenGenerator(dataValues);
    return successResponse(res, created, userCreated, token);
  }

  /**
   *
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns the token of the logged in user
   */
  static async login(req, res) {
    const { email } = req.body;
    const { dataValues } = await getUserByEmailOrById(email);
    const token = tokenGenerator(dataValues);
    return successResponse(res, ok, successfulLogin, token);
  }

  /**
   * @description opt in/out of email notifications
   * @param {request} req
   * @param {response} res
   * @returns {object} it returns a message that says either
   'notification turned on or off successfully'
   */
  static async enableOrDisableEmailNotification(req, res) {
    const { email } = req.authUser;
    const { status } = req.body;
    await changeEmailNotificationStatus(email, status);
    return updatedResponse(res, ok, notificationStatusUpdated);
  }
}
