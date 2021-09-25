'use strict'

module.exports = (req, res, next) => {
  console.log('Logged');
  next();
}
