const express = require('express');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET all events
router.get('/', authMiddleware, async (req, res) => {
  const events = await Event.find({ user: req.userId });
  res.json(events);
});

// POST new event
router.post('/', authMiddleware, async (req, res) => {
  const event = await Event.create({ ...req.body, user: req.userId });
  res.status(201).json(event);
});

// PATCH update event status
router.patch('/:id', authMiddleware, async (req, res) => {
  const event = await Event.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { status: req.body.status },
    { new: true }
  );
  res.json(event);
});

module.exports = router;
