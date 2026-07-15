import { body } from 'express-validator';

import { MAX_TITLE_LENGTH, MAX_MESSAGE_LENGTH } from '../domains/constants.js';

export const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: MAX_TITLE_LENGTH })
    .withMessage(`Title must not exceed ${MAX_TITLE_LENGTH} characters`),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: MAX_MESSAGE_LENGTH })
    .withMessage(`Message must not exceed ${MAX_MESSAGE_LENGTH} characters`),
];
