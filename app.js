const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const config = require('./config');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to handle JSON payloads (like from Postman)
app.set('view engine', 'ejs');
app.use(express.static('public')); // Serve static files from the 'public' folder

// MongoDB connection
mongoose
  .connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define a User schema and model
const User = mongoose.model(
  'users',
  new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  })
);

// New route to show all users from the 'users' collection
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the 'users' collection
    const users = await User.find();

    // Render the users data on a new 'users.ejs' page
    res.render('users', { users });
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Failed to fetch users.');
  }
});

// Create a New Username & Password
app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  // Log received data
  console.log('Received data:', { username, password });

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Log before saving
    console.log('Creating new user:', newUser);

    await newUser.save();

    // Log after saving
    console.log('New user created:', newUser);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).send('Failed to create user');
  }
});

// DELETE route to remove a user based on their username
app.delete('/users/:username', async (req, res) => {
  const { username } = req.params;  // Get username from URL parameters

  try {
    // Find and delete the user with the given username
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the deleted user to the console (for debugging purposes)
    console.log('Deleted user:', deletedUser);

    // Respond with a success message
    res.status(200).json({
      message: `User ${username} deleted successfully`,
    });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(500).send('Failed to delete user');
  }
});


// GET route to fetch a specific user by username
app.get('/users/:username', async (req, res) => {
  const { username } = req.params;  // Get username from URL parameters

  try {
    // Find a user by the given username
    const user = await User.findOne({ username });

    if (!user) {
      return res.render('user_not_found', { username }); // Render a page if user is not found
    }

    // Log the found user for debugging purposes
    console.log('Found user:', user);

    // Render the specific user data in HTML using EJS
    res.render('user_detail', { user });
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).send('Failed to fetch user');
  }
});


// Update Username & Password 
app.put('/users/:username', async (req, res) => {
  const currentUsername = req.params.username; // Current username from URL parameters
  const { username, password } = req.body;    // New username and password from request body

  if (!password && !username) {
    return res.status(400).send('At least one field (username or password) is required for update');
  }

  const updateFields = {};
  if (username) updateFields.username = username; // Add new username to update fields
  if (password) updateFields.password = await bcrypt.hash(password, 10); // Add hashed password to update fields

  try {
    // Find the user by the current username and update the specified fields
    const updatedUser = await User.findOneAndUpdate(
      { username: currentUsername },  // Match by current username
      updateFields,                   // Update only specified fields
      { new: true, runValidators: true } // Return the updated user and validate against the schema
    );

    if (!updatedUser) {
      return res.status(404).json({ message: `User ${currentUsername} not found` });
    }

    console.log('Updated user:', updatedUser);

    res.status(200).json({
      message: `User ${currentUsername} updated successfully`,
      user: {
        username: updatedUser.username,
      },
    });
  } catch (err) {
    console.error('Error updating user:', err.message);

    // Handle unique constraint errors for username
    if (err.code === 11000 && err.keyPattern?.username) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    res.status(500).send('Failed to update user');
  }
});

// PATCH route to update only the password of a user
app.patch('/users/:username/password', async (req, res) => {
  const { username } = req.params;  // Get the username from the URL
  const { password } = req.body;   // Get the new password from the request body

  // Validate that a new password is provided
  if (!password) {
    return res.status(400).json({ message: 'Password is required for update' });
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { username },               // Find the user by username
      { password: hashedPassword }, // Update the password field
      { new: true, runValidators: true } // Return the updated user and validate
    );

    // Check if the user was found
    if (!updatedUser) {
      return res.status(404).json({ message: `User ${username} not found` });
    }

    // Log and return success response
    console.log('Updated user password:', updatedUser);
    res.status(200).json({
      message: `Password updated successfully for user ${username}`,
    });
  } catch (err) {
    console.error('Error updating password:', err.message);
    res.status(500).json({ message: 'Failed to update password' });
  }
});


// Handle unexpected errors globally
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err.message);
  res.status(500).send('Something went wrong. Please try again later.');
});

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
