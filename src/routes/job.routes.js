import express from 'express';
import JobController from '../controllers/job.controller';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import jobValidations from '../middlewares/jobValidations.middleware';
import authorization from '../middlewares/authorization.middleware';

const {
  createJob,
  allOpenJobs,
  viewJob,
  updateJobStatus,
  updateJob
} = JobController;
const {
  validateJobObj,
  startDatesValidation,
  endDateValidation,
  validateJobStatus,
  validateId,
  jobExist,
  duplicateJobStatus,
} = jobValidations;
const route = express.Router();

route.post('/jobs', [tokenAuthentication, validateJobObj, startDatesValidation, endDateValidation], createJob);
route.get('/jobs', [tokenAuthentication, validateJobStatus], allOpenJobs);
route.get('/job', [tokenAuthentication, validateId, jobExist], viewJob);
route.put('/job', [tokenAuthentication, authorization, validateJobStatus, duplicateJobStatus, jobExist], updateJobStatus);
route.put('/job/edit', [tokenAuthentication, authorization, validateJobObj, jobExist], updateJob);
export default route;
