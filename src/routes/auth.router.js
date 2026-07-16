import { Router } from 'express';
import passport from 'passport';

import * as authController from '../controllers/auth.controller.js';
import * as authValidation from '../validators/auth.validation.js';
import {
  ensureAuthenticated,
  ensureUserHasNoRole,
  ensureUserIsMember,
} from '../middleware/auth.js';

const authRouter = Router();

authRouter
  .route('/log-in')
  .get(authController.getLogin)
  .post(
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/log-in',
      failureMessage: true,
    }),
  );

authRouter.get('/log-out', authController.logOut);

authRouter
  .route('/sign-up')
  .get(authController.getSignup)
  .post(authValidation.validateUser, authController.registerUser);

authRouter
  .route('/member')
  .all(ensureAuthenticated, ensureUserHasNoRole)
  .get(authController.getMemberForm)
  .post(authValidation.validateMember, authController.registerMember);

authRouter
  .route('/admin')
  .all(ensureUserIsMember)
  .get(authController.getAdminForm)
  .post(authValidation.validateAdmin, authController.registerAdmin);

export default authRouter;
