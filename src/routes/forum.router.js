import { Router } from 'express';

import * as forumController from '../controllers/forum.controller.js';

const forumRouter = Router();

forumRouter.get('/', forumController.getForum);
forumRouter.get('/message', forumController.getMessageForm);

export default forumRouter;
