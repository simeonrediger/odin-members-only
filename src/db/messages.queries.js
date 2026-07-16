import pool from './pool.js';

export async function find({ includeAuthor = false } = {}) {
  let sql;

  if (includeAuthor) {
    sql = `
    SELECT
      messages.*,
      to_jsonb(users) AS author
    FROM messages
    INNER JOIN users
      ON users.id = messages.author_id
    `;
  } else {
    sql = 'SELECT * FROM messages';
  }

  sql += ' ORDER BY messages.time DESC';

  const { rows } = await pool.query(sql);
  return rows;
}

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
