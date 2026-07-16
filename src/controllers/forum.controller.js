import { getErrorMessages } from '../validators/validation-utils.js';

export function getForum(req, res) {
  res.render('forum');
}

export function getMessageForm(req, res) {
  res.render('create-message');
}

export async function createMessage(req, res) {
  const errors = getErrorMessages(req);

  if (errors.length > 0) {
    const { title, content } = req.body;
    return res
      .status(400)
      .render('create-message', { fields: { title, content }, errors });
  }
}
