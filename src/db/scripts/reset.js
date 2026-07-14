import fs from 'node:fs/promises';

import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../domains/constants.js';

export default async function reset(client) {
  await deleteAll(client);
  await createUsersTable(client);
}

async function deleteAll(client) {
  await client.query('DROP TABLE IF EXISTS users');
}

async function createUsersTable(client) {
  await client.query(`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username text NOT NULL CHECK (
        length(username) >= ${MIN_USERNAME_LENGTH}
        AND length(username) <= ${MAX_USERNAME_LENGTH}
      ),
      password_hash text NOT NULL
    )
  `);
}
