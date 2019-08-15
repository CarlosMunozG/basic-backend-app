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
    type: ObjectId,
    ref: 'User'
  },
  area: String,
  postalCode: Number,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  locationType: {
    type: String,
    required: true,
    enum: ['urban', 'rural']
  },
  bestMomentOfYear: {
    type: String,
    required: true,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  },
  description: {
    type: String,
    description: true
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
  category: {
    type: String,
    required: true,
    enum: ['Sports', 'Leisure', 'Sleep', 'Eating', 'Health', 'Summer', 'Winter', 'Water']
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
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
