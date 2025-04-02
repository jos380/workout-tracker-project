
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  exercise: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  media: { type: String, default: null }, // For media uploads
});

module.exports = mongoose.model('Workout', workoutSchema);
