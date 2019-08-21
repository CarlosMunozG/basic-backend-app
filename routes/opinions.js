'use strict';

const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion.js');
const Place = require('../models/Place.js');
const User = require('../models/User.js');

// router.get('/', async (req, res, next) => {
//   try {
//     const listOfPlaces = await Place.find();
//     res.status(200).json({ listOfPlaces });
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneOpinion = await Opinion.findById(id).populate('place');
    res.status(200).json({ oneOpinion });
  } catch (error) {
    next(error);
  }
});

router.post('/add', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const newOpinion = req.body;
  newOpinion.place = req.body.placeId;
  newOpinion.owner = userId;
  try {
    const createdOpinion = await Opinion.create(newOpinion);
    await User.findByIdAndUpdate(userId, { $push: { opinions: createdOpinion._id } });
    await Place.findByIdAndUpdate(req.body.placeId, { $push: { opinions: createdOpinion._id } });
    res.status(200).json(createdOpinion);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const opinionUpdated = req.body;
  try {
    const updated = await Opinion.findByIdAndUpdate(id, opinionUpdated);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { opinions: id } });
    const currentOpinion = await Opinion.findById(id);
    const placeOpinion = currentOpinion.place;
    await Place.findByIdAndUpdate(placeOpinion);
    await Opinion.findByIdAndDelete(id);
    res.status(200).json({ message: 'place deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
