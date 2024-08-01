const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Todo = require('./models/Todo');
const Session = require('./models/Session');
const supabase = require('./supabaseClient');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User registration
app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: 'User Already Existed' });
      }
 
      
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
 
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const newSession = new Session({ userId: user._id, ipAddress: req.ip });
      await newSession.save();

      user.sessions.push(newSession);
      await user.save();

      res.status(200).json({ token, message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  // Middleware for protected routes
const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
};

  // Create a new to-do item
app.post('/todos', auth, async (req, res) => {
    try {
      const { title } = req.body;
      const newTodo = new Todo({
        userId: req.userId,
        title,
      });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  // Get all to-do items for the logged-in user
app.get('/todos', auth, async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.userId });
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  // Update a to-do item by ID
app.put('/todos/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      const todo = await Todo.findOneAndUpdate(
        { _id: id, userId: req.userId },
        { title, completed },
        { new: true }
      );

      if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
      }

      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  // Delete a to-do item by ID
app.delete('/todos/:id', auth, async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

      if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
      }

      res.status(200).json({ message: 'To-do item deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

  // Get all user sessions
app.get('/sessions', auth, async (req, res) => {
    try {
      const sessions = await Session.find({ userId: req.userId });
      res.status(200).json(sessions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
