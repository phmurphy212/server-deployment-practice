'use strict'

const express = require ('express');

const app = express();

const handleNotFound = require ('./handlers/404.js');
const handleServerError = require ('./handlers/500.js');
const handleLogger = require ('./middleware/logger.js');

app.get('/', handleLogger, (req, res) => {
  res.status(200).send('Success');
});

app.get('/bad', (req, res, next) => {
  throw new Error('Not today Lord Licorice');
  next();
});

app.get('/data', (req, res) => {
  let outputData = {
    name: 'Michael Jordan',
    job: 'GOAT',
  }
  res.status(200).json(outputData);
});

app.use('*', handleNotFound);
app.use(handleServerError);
app.use(handleLogger);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`))
}

module.exports = {
  app: app,
  start: start
}
