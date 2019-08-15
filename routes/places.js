'use strict';

const express = require('express');
const router = express.Router();
const Place = require('../models/Place.js');

router.get('/places', async (req, res, next) => {
  try {
    const listOfPlaces = await Place.find();
    res.status(200).json({ listOfPlaces });
  } catch (error) {
    next(error);
  }
});

router.post('/places/add', async (req, res, next) => {
  const newPlace = req.body;
  try {
    // create new App
    const createdPlace = await Place.create(newPlace);
    res.status(200).json(createdPlace);
  } catch (error) {
    next(error);
  }
});

router.put('/places/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const placeUpdated = req.body;
  try {
    const updated = await Place.findByIdAndUpdate(id, placeUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/places/:id/delete', async (req, res, next) => {
  const { id } = req.params;
  try {
    // delete one App
    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: 'place deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
