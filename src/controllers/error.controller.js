export function handleNotFoundError(req, res) {
  res.status(404).render('not-found', { pageName: 'Page Not Found' });
}

export function handleServerError(error, req, res, next) {
  console.error(error);
  error.statusCode ||= 500;
  error.message = 'An unknown error occurred';
  res
    .status(error.statusCode)
    .render('server-error', { error }, (renderError, html) => {
      if (renderError) {
        return res.send(`Server error ${error.statusCode}: ${error.message}`);
      }

      res.send(html);
    });
}
