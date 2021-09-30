'use strict'

module.exports = (req, res, next) => {
  let name = req.query.name;
  if (!name) {
    next(`Name Required`);
  } else { next(); }
}
