import db from '../db/queries.js';

export function serialize(user, done) {
  done(null, user.id);
}

export async function deserialize(id, done) {
  try {
    const [user] = await db.users.findById(id);
    done(null, user ?? false);
  } catch (error) {
    done(error);
  }
}
