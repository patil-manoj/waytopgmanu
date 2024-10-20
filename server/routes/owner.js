import express from 'express';
import { auth, requireRole } from '../middleware/auth.js';
import Accommodation from '../models/Accommodation.js';

const router = express.Router();

router.post('/accommodations', auth, requireRole(['owner']), async (req, res) => {
  try {
    const accommodation = new Accommodation({
      ...req.body,
      owner: req.user._id
    });
    await accommodation.save();
    res.status(201).json(accommodation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating accommodation' });
  }
});

router.get('/accommodations', auth, requireRole(['owner']), async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ owner: req.user._id });
    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations' });
  }
});

export default router;