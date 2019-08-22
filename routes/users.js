'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  try {
    const listOfUsers = await User.find();
    res.status(200).json({ listOfUsers });
  } catch (error) {
    next(error);
  }
});

router.get('/myFavourites', async (req, res, next) => {
  const user = req.session.currentUser;
  try {
    const newUser = await User.findById(user._id).populate('friends').populate('favouritePlaces').populate('opinions');
    console.log(newUser);
    res.status(200).json({ newUser });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const newUser = await User.findById(id).populate('favouritePlaces').populate('friends');
    res.status(200).json({ newUser });
  } catch (error) {
    next(error);
  }
});

router.put('/update', async (req, res, next) => {
  const user = req.session.currentUser;
  const { username, password, images, location, email } = req.body.user;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const updated = await User.findByIdAndUpdate(user._id, { username, password: hashPass, images, location, email }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.put('/addFriend/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const friendAdded = await User.findByIdAndUpdate(user._id, { $push: { friends: id } });
    res.status(200).json(friendAdded);
  } catch (error) {
    next(error);
  }
});

router.put('/deleteFriend/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const friendDeleted = await User.findByIdAndUpdate(user._id, { $pull: { friends: id } });
    res.status(200).json(friendDeleted);
  } catch (error) {
    next(error);
  }
});

router.put('/unlike/:placeId', async (req, res, next) => {
  const { placeId } = req.params;
  const user = req.session.currentUser;
  try {
    const likeDeleted = await User.findByIdAndUpdate(user._id, { $pull: { favouritePlaces: placeId } }, { new: true });
    res.status(200).json(likeDeleted);
  } catch (error) {
    next(error);
  }
});

router.put('/like/:placeId', async (req, res, next) => {
  const { placeId } = req.params;
  const user = req.session.currentUser;
  try {
    const updated = await User.findByIdAndUpdate(user._id, { $push: { favouritePlaces: placeId } }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
