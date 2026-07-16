import pool from './pool.js';

export async function findById(id) {
  const { rows } = await pool.query(
    `
    SELECT * FROM users
    WHERE id = $1
    `,
    [id],
  );

  return rows;
}

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

export async function create({ username, displayName, passwordHash }) {
  const {
    rows: [user],
  } = await pool.query(
    `
    INSERT INTO users
      (username, display_name, password_hash)
    VALUES
      ($1, $2, $3)
    RETURNING *
    `,
    [username, displayName, passwordHash],
  );

  return user;
}

export async function updateRoleById(id, role) {
  await pool.query(
    `
    UPDATE users
    SET role = $2
    WHERE id = $1
    `,
    [id, role],
  );
}
