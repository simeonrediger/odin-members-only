import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.get('/sign-up', authController.getSignup);

export default authRouter;
