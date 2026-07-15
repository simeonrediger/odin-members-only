import { Router } from 'express';

import * as forumController from '../controllers/forum.controller.js';
import * as forumValidation from '../validators/forum.validation.js';

const forumRouter = Router();

forumRouter.get('/', forumController.getForum);
forumRouter
  .route('/message')
  .get(forumController.getMessageForm)
  .post(forumValidation.validateMessage, forumController.createMessage);

export default forumRouter;
