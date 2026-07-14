import pool from './pool.js';

export async function create({ username, passwordHash }) {
  await pool.query(
    `
    INSERT INTO users
      (username, password_hash)
    VALUES
      ($1, $2)
  `,
    [username, passwordHash],
  );
}
