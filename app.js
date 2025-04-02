
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Workout = require('./models/workout');
const User = require('./models/user');
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.log("Error connecting to MongoDB Atlas:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'workouttracker', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'hbs');

// Routes
app.use('/', workoutRoutes);
app.use('/', authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
