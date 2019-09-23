'use strict';

const createError = require('http-errors');

exports.validationFormPlace = () => (req, res, next) => {
  const place = req.body;
  if (!place.name) {
    return next(
      createError(421)
    );
  } else if (!place.locationType) {
    return next(
      createError(422)
    );
  } else if (!place.description) {
    return next(
      createError(423)
    );
  } else if (!place.inOutDoors) {
    return next(
      createError(424)
    );
  } else if (!place.money) {
    return next(
      createError(425)
    );
  } else if (place.images.length === 0) {
    return next(
      createError(426)
    );
  } else if (!place.location) {
    return next(
      createError(427)
    );
  } else {
    next();
  }
};
