import { body, matchedData } from 'express-validator';

import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../domains/constants.js';
import { RANGE_SEPARATOR } from '../utils/characters.js';
import db from '../db/queries.js';

export const validateUser = [
  body('username')
    .trim()
    .isLength({ min: MIN_USERNAME_LENGTH, max: MAX_USERNAME_LENGTH })
    .withMessage(
      `Username must be ${MIN_USERNAME_LENGTH}${RANGE_SEPARATOR}${MAX_USERNAME_LENGTH} characters`,
    )
    .custom(isUniqueUsername),
  body('displayName')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: MIN_DISPLAY_NAME_LENGTH, max: MAX_DISPLAY_NAME_LENGTH })
    .withMessage(
      `Display name must be ${MIN_DISPLAY_NAME_LENGTH}${RANGE_SEPARATOR}${MAX_DISPLAY_NAME_LENGTH} characters`,
    ),
  body('password')
    .isStrongPassword({
      minLength: MIN_PASSWORD_LENGTH,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters, including at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol`,
    )
    .custom(matchesPasswordConfirmation)
    .withMessage('Passwords must match'),
];

async function isUniqueUsername(username) {
  const matchingUsers = await db.users.findByUsername(username);

  if (matchingUsers.length === 0) {
    return true;
  }

  throw new Error(`Username "${username.toLowerCase()}" is already taken`);
}

function matchesPasswordConfirmation(password, { req }) {
  return password === req.body.passwordConfirmation;
}
