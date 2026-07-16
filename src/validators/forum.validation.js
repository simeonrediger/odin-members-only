import { param, body } from 'express-validator';

import { MAX_TITLE_LENGTH, MAX_MESSAGE_LENGTH } from '../domains/constants.js';
import db from '../db/queries.js';

export const validateParams = [
  param('id')
    .isInt()
    .withMessage(id => `Message ID must be an integer. Got "${id}"`)
    .bail()
    .custom(messageIdExists),
];

export const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: MAX_TITLE_LENGTH })
    .withMessage(`Title must not exceed ${MAX_TITLE_LENGTH} characters`),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: MAX_MESSAGE_LENGTH })
    .withMessage(`Message must not exceed ${MAX_MESSAGE_LENGTH} characters`),
];

async function messageIdExists(id) {
  const message = await db.messages.findById(id);

  if (!message) {
    throw new Error(`Message ID does not exist: "${id}"`);
  }

  return true;
}
