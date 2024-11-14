import React, { useState } from 'react';
import axios from 'axios';

const PolicySwitch = ({ policyComparisonResults }) => {
  const [currentPolicy, setCurrentPolicy] = useState(null);
  const [recommendedPolicy, setRecommendedPolicy] = useState(null);

  const handleRecommend = async () => {
    const response = await axios.post('http://localhost:5000/switch', { currentPolicy });
    setRecommendedPolicy(response.data.bestPolicy);
  };

  return (
    <div>
      <h2>Find a Better Policy</h2>
      {/* Form to input current policy */}
      <button onClick={handleRecommend}>Recommend Policy</button>
      {recommendedPolicy && (
        <div>
          <h3>Recommended Policy:</h3>
          <p>{recommendedPolicy.name}</p>
          <p>Premium: {recommendedPolicy.premium}</p>
          <p>Provider: {recommendedPolicy.provider}</p>
        </div>
      )}
    </div>
  );
};

export default PolicySwitch;