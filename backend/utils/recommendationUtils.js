const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const loadModel = async () => {
  return await tf.loadLayersModel('file://./model/model.json');
};

const recommendPolicy = async (currentPolicy, availablePolicies) => {
  const model = await loadModel();
  const scores = availablePolicies.map(policy => {
    const input = tf.tensor2d([[policy.premium, policy.coverage.hospitalCover === 'unlimited' ? 1 : 0]]);
    const prediction = model.predict(input);
    return { policy, score: prediction.dataSync()[0] };
  });
  return scores.sort((a, b) => b.score - a.score)[0].policy;
};

module.exports = { recommendPolicy };