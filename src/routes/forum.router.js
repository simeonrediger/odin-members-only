import { Router } from 'express';

import * as forumController from '../controllers/forum.controller.js';
import * as forumValidation from '../validators/forum.validation.js';
import { ensureAuthenticated, ensureUserIsAdmin } from '../middleware/auth.js';

const forumRouter = Router();

forumRouter.get('/', forumController.getForum);
forumRouter
  .route('/message')
  .all(ensureAuthenticated)
  .get(forumController.getMessageForm)
  .post(forumValidation.validateMessage, forumController.createMessage);

forumRouter
  .route('/message/:id')
  .delete(
    ensureUserIsAdmin,
    forumValidation.validateParams,
    forumController.deleteMessage,
  );

export default forumRouter;
