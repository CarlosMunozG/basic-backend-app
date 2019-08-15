const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  postalCode: Number,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  friends: [{
    type: ObjectId,
    ref: 'User'
  }],
  favouritePlaces: [{
    type: ObjectId,
    ref: 'Place'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
