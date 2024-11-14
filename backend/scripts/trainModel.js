const tf = require('@tensorflow/tfjs');
const mongoose = require('mongoose');
const Policy = require('../models/Policy');
const fs = require('fs');

const uri = 'mongodb://localhost:27017/insuranceDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function loadData() {
  const policies = await Policy.find();
  mongoose.connection.close();
  return policies;
}

async function trainModel() {
  const data = await loadData();
  const features = data.map(policy => [policy.premium, policy.coverage.hospitalCover === 'unlimited' ? 1 : 0]);
  const labels = data.map(policy => policy.premium < 3000 ? 1 : 0);

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  await model.fit(xs, ys, { epochs: 50 });

  // Save model in JSON format
  const modelJson = model.toJSON();
  fs.writeFileSync('./model/model.json', JSON.stringify(modelJson));
}

trainModel().catch(console.error);