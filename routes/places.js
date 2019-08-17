'use strict';

const express = require('express');
const router = express.Router();
const Place = require('../models/Place.js');
const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  const currentUserId = req.session.currentUser._id;
  try {
    const listOfPlaces = await Place.find();
    listOfPlaces.currentUserId = currentUserId;
    res.status(200).json({ listOfPlaces });
    console.log(listOfPlaces);
  } catch (error) {
    next(error);
  }
});

router.get('/myplaces', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const listOfMyPlaces = await Place.find({ owner: userId });
    res.status(200).json({ listOfMyPlaces });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const onePlace = await Place.findById(id);
    res.status(200).json({ onePlace });
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  const newPlace = req.body;
  newPlace.owner = req.session.currentUser._id;
  try {
    const createdPlace = await Place.create(newPlace);
    res.status(200).json(createdPlace);
    await User.findByIdAndUpdate(newPlace.owner, { $push: { favouritePlaces: createdPlace._id } });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const placeUpdated = req.body;
  try {
    const updated = await Place.findByIdAndUpdate(id, placeUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: 'place deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
