import { Router } from 'express';

import * as forumController from '../controllers/forum.controller.js';
import * as forumValidation from '../validators/forum.validation.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const forumRouter = Router();

forumRouter.get('/', forumController.getForum);
forumRouter
  .route('/message')
  .all(ensureAuthenticated)
  .get(forumController.getMessageForm)
  .post(forumValidation.validateMessage, forumController.createMessage);

export default forumRouter;
