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
  email: {
    type: String
  },
  images: [{
    type: String
  }],
  postalCode: {
    type: Number
  },
  location: {
    type: String
  },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: [Number]
  // },
  friends: [{
    type: ObjectId,
    ref: 'User'
  }],
  favouritePlaces: [{
    type: ObjectId,
    ref: 'Place'
  }],
  opinions: [{
    type: ObjectId,
    ref: 'Opinion'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
