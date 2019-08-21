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

// router.get('/myplaces', async (req, res, next) => {
//   const userId = req.session.currentUser._id;
//   try {
//     const listOfMyPlaces = await Place.find({ owner: userId });
//     res.status(200).json({ listOfMyPlaces });
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

// router.put('/:id/like', async (req, res, next) => {
//   const { id } = req.params;
//   const user = req.session.currentUser;
//   try {
//     const updated = await Place.findByIdAndUpdate(id, { $push: { likes: user._id } });
//     const userUpdated = await User.findByIdAndUpdate(user._id, { $push: { favouritePlaces: id } });
//     res.status(200).json({ updated, userUpdated });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put('/:id/unlike', async (req, res, next) => {
//   const { id } = req.params;
//   const user = req.session.currentUser;
//   try {
//     const updated = await Place.findByIdAndUpdate(id, { $pull: { likes: user._id } });
//     // const userUpdated = await User.findByIdAndUpdate(user._id, { $push: { favouritePlaces: id } });
//     res.status(200).json(updated);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id/delete', async (req, res, next) => {
//   const { id } = req.params;
//   console.log('aquiiiiiiii', id);
//   try {
//     await Place.findByIdAndDelete(id);
//     res.status(200).json({ message: 'place deleted' });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
