import pool from './pool.js';

export async function create({ authorId, title, content }) {
  await pool.query(
    `
    INSERT INTO messages
      (author_id, title, content)
    VALUES
      ($1, $2, $3)
    `,
    [authorId, title, content],
  );
}
