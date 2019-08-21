const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const opinionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  place: {
    type: ObjectId,
    ref: 'Place',
    unique: true
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    unique: true
  },
  rating: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

opinionSchema.index({ location: '2dsphere' });

const Opinion = mongoose.model('Opinion', opinionSchema);

module.exports = Opinion;
