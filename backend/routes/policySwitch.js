const express = require('express');
const mongoose = require('mongoose');
const { recommendPolicy } = require('../utils/recommendationUtils');
const Policy = require('../models/Policy');
const router = express.Router();

const uri = 'mongodb://localhost:27017/insuranceDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/switch', async (req, res) => {
  const currentPolicy = req.body.currentPolicy;
  const availablePolicies = await Policy.find();

  const bestPolicy = await recommendPolicy(currentPolicy, availablePolicies);

  if (bestPolicy) {
    res.json({ message: 'Policy switched successfully!', bestPolicy });
  } else {
    res.status(400).json({ message: 'No suitable match found for switching policy' });
  }
});

module.exports = router;