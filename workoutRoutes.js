
const express = require('express');
const multer = require('multer');
const Workout = require('../models/workout');
const path = require('path');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Create a new workout
router.post('/workouts', upload.single('media'), (req, res) => {
  const { exercise, duration, caloriesBurned } = req.body;
  const media = req.file ? req.file.path : null;
  
  const workout = new Workout({ exercise, duration, caloriesBurned, media });
  workout.save()
    .then(() => res.redirect('/workouts'))
    .catch(err => res.status(400).send('Error saving workout.'));
});

// Get all workouts
router.get('/workouts', (req, res) => {
  Workout.find()
    .then(workouts => res.render('workout', { workouts }))
    .catch(err => res.status(400).send('Error fetching workouts.'));
});

// Edit workout
router.get('/workouts/edit/:id', (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => res.render('editWorkout', { workout }))
    .catch(err => res.status(400).send('Error fetching workout.'));
});

router.post('/workouts/edit/:id', (req, res) => {
  const { exercise, duration, caloriesBurned, media } = req.body;
  Workout.findByIdAndUpdate(req.params.id, { exercise, duration, caloriesBurned, media })
    .then(() => res.redirect('/workouts'))
    .catch(err => res.status(400).send('Error updating workout.'));
});

// Delete workout
router.post('/workouts/delete/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/workouts'))
    .catch(err => res.status(400).send('Error deleting workout.'));
});

module.exports = router;
