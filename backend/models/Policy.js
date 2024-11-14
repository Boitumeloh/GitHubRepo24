const mongoose = require('mongoose');

const coverageSchema = new mongoose.Schema({
  hospitalCover: { type: String, required: true },
  chronicIllness: { type: String, required: true },
  cancer: { type: String, required: true },
  dayToDay: { type: String, required: true },
});

const policySchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  premium: { type: Number, required: true },
  coverage: { type: coverageSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;