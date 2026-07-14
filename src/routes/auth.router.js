import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authValidation from '../validators/auth.validation.js';

const authRouter = Router();

authRouter
  .route('/sign-up')
  .get(authController.getSignup)
  .post(authValidation.validateUser, authController.registerUser);

export default authRouter;
