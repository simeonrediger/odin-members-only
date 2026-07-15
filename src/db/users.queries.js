import pool from './pool.js';

export async function findByUsername(username) {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    WHERE lower(username) = lower($1)
    `,
    [username],
  );

  return rows;
}

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
