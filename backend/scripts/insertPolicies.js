const mongoose = require('mongoose');
const Policy = require('../models/Policy');

const policies = [
  {
    name: "KEYCAR PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 1102,
    coverage: {
      hospitalCover: "standard",
      chronicIllness: "Unlimited",
      cancer: "standard",
      dayToDay: "standard"
    }
  },
  {
    name: "SMART PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 1565,
    coverage: {
      hospitalCover: "standard",
      chronicIllness: "Unlimited",
      cancer: "standard",
      dayToDay: "standard"
    }
  },
  {
    name: "CORE PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 2281,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "Unlimited",
      cancer: "none",
      dayToDay: "none"
    }
  },
  {
    name: "SAVER PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 2673,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "Unlimited",
      cancer: "none",
      dayToDay: "unlimited"
    }
  },
  {
    name: "PRIORITY PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 4531,
    coverage: {
      hospitalCover: "standard",
      chronicIllness: "standard",
      cancer: "none",
      dayToDay: "standard"
    }
  },
  {
    name: "COMPREHENSIVE PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 7163,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "Unlimited",
      cancer: "unlimited",
      dayToDay: "unlimited"
    }
  },
  {
    name: "EXECUTIVE PLAN",
    provider: "DISCOVERY HEALTH",
    premium: 10303,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "Unlimited",
      cancer: "unlimited",
      dayToDay: "unlimited"
    }
  },
  {
    name: "EVOLVE PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 1847,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "standard",
      cancer: "basic",
      dayToDay: "standard"
    }
  },
  {
    name: "CUSTOM PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 2353,
    coverage: {
      hospitalCover: "medium",
      chronicIllness: "basic",
      cancer: "basic",
      dayToDay: "standard"
    }
  },
  {
    name: "INCETIVE PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 3060,
    coverage: {
      hospitalCover: "medium",
      chronicIllness: "Unlimited",
      cancer: "basic",
      dayToDay: "standard"
    }
  },
  {
    name: "EXTENDER PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 7215,
    coverage: {
      hospitalCover: "medium",
      chronicIllness: "Unlimited",
      cancer: "basic",
      dayToDay: "medium"
    }
  },
  {
    name: "SUMMIT PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 14903,
    coverage: {
      hospitalCover: "unlimited",
      chronicIllness: "Unlimited",
      cancer: "basic",
      dayToDay: "medium"
    }
  },
  {
    name: "INGWE PLAN",
    provider: "MOMENTUM HEALTH",
    premium: 589,
    coverage: {
      hospitalCover: "basic",
      chronicIllness: "basic",
      cancer: "basic",
      dayToDay: "basic"
    }
  }
];

const uri = 'mongodb://localhost:27017/insuranceDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

Policy.insertMany(policies)
  .then(() => {
    console.log('Data inserted');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting data:', err);
  });