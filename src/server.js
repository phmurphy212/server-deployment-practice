'use strict'

const express = require ('express');

const app = express();

const handleNotFound = require ('./handlers/404.js');
const handleServerError = require ('./handlers/500.js');
const handleLogger = require ('./middleware/logger.js');
const validator = require ('./middleware/validator.js');

app.get('/', handleLogger, (req, res) => {
  res.status(200).send('Success');
});

app.get('/bad', (req, res, next) => {
  throw new Error('Not today Lord Licorice');
  next();
});

app.get('/person', validator, (req, res) => {
  let outputData = {
    name: req.query.name
  }
  res.status(200).json(outputData);
});

app.use('*', handleNotFound);
app.use(handleServerError);
app.use(handleLogger);
app.use(validator);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`))
}

module.exports = {
  server: app,
  start: start
}
