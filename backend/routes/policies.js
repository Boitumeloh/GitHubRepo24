const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { comparePolicies } = require('../utils/compareUtils');

router.get('/policies', (req, res) => {
  const policiesPath = path.join(__dirname, '../policies.json');
  fs.readFile(policiesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load policies' });
    }
    const policies = JSON.parse(data);
    res.json(policies);
  });
});

router.post('/compare-policies', (req, res) => {
  const userPolicySummary = req.body;
  const similarPolicies = comparePolicies(userPolicySummary);
  res.json(similarPolicies);
});

module.exports = router;