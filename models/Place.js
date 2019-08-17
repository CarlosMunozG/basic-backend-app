const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  owner: {
    type: String
  },
  postalCode: Number,
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: [Number]
  // },
  locationType: {
    type: String,
    required: true,
    enum: ['urban', 'rural']
  },
  bestMomentOfYear: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  inOutDoors: [{
    type: String,
    required: true,
    enum: ['indoors', 'outdoors']
  }],
  money: [{
    type: String,
    required: true,
    enum: ['free', 'paid']
  }],
  categories: [{
    type: String
  }],
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  images: [{
    type: String,
    required: true
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
