import ApplicationService from '../services/application.service';
import StackService from '../services/stack.service';
import statusCode from '../utils/statusCodes';
import customMessage from '../utils/customMessage';
import responseHandler from '../utils/responseHandler.util';

const {
  saveApplication,
  updateApplicationStatus,
  getAllApplicationsByApplicantIdOrJobId,
  getApplicationByApplicantId,
} = ApplicationService;
const { getStackById } = StackService;

const { ok } = statusCode;
const {
  appliedSuccessfully,
  applicationApproved,
  allApplications,
  applicationFound,
} = customMessage;
const { successResponse, updatedResponse } = responseHandler;
/**
 * @description this controller deals with job applications
 */
export default class ApplicationController {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns the a success message
   */
  static async applyJob(req, res) {
    const application = {};
    const { id } = req.body;
    const userId = req.authUser.id;
    application.jobId = parseInt(id, 10);
    application.applicantId = parseInt(userId, 10);
    application.status = 'pending';
    const { dataValues } = await saveApplication(application);
    return successResponse(res, ok, appliedSuccessfully, undefined, dataValues);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {object} it returns a success message upon successful application approval
   */
  static async approveJobApplication(req, res) {
    const { applicantId, id } = req.body;
    const userId = parseInt(applicantId, 10);
    const jobId = parseInt(id, 10);
    const newStatus = 'approved';
    await updateApplicationStatus(jobId, userId, newStatus);
    return updatedResponse(res, ok, applicationApproved);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {array} it returns all applications for a specific job
   */
  static async allJobApplications(req, res) {
    const { id } = req.body;
    const jobId = parseInt(id, 10);
    const applications = await getAllApplicationsByApplicantIdOrJobId(jobId, 'jobId');
    return successResponse(res, ok, allApplications, undefined, applications);
  }

  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {array} it returns all applications for a specific job
   */
  static async jobApplication(req, res) {
    const { id, applicantId } = req.body;
    const application = await getApplicationByApplicantId(id, applicantId);
    return successResponse(res, ok, applicationFound, undefined, application);
  }
}
