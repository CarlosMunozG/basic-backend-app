'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  try {
    const user = req.session.currentUser;
    const newUser = await User.findById(user._id);
    res.status(200).json({ newUser });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const { username, password, images, location, email } = req.body.user;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const updated = await User.findByIdAndUpdate(id, { username, password: hashPass, images, location, email }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
