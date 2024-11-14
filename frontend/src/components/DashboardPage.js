import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component
import "../styles/DashboardPage.css"; // Import custom CSS
 // Import custom icon component

const DashboardPage = ({ policyData, similarPolicies, availablePolicies }) => {
  const navigate = useNavigate();
  const [localPolicyData, setLocalPolicyData] = useState(policyData);
  const [localSimilarPolicies, setLocalSimilarPolicies] = useState(similarPolicies);
  const [localAvailablePolicies, setLocalAvailablePolicies] = useState(availablePolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    // Save data to local storage
    if (policyData) {
      localStorage.setItem("policyData", JSON.stringify(policyData));
    }
    if (similarPolicies) {
      localStorage.setItem("similarPolicies", JSON.stringify(similarPolicies));
    }
    if (availablePolicies) {
      localStorage.setItem("availablePolicies", JSON.stringify(availablePolicies));
    }
  }, [policyData, similarPolicies, availablePolicies]);

  useEffect(() => {
    // Load data from local storage
    const savedPolicyData = localStorage.getItem("policyData");
    const savedSimilarPolicies = localStorage.getItem("similarPolicies");
    const savedAvailablePolicies = localStorage.getItem("availablePolicies");

    if (savedPolicyData) {
      setLocalPolicyData(JSON.parse(savedPolicyData));
    }
    if (savedSimilarPolicies) {
      setLocalSimilarPolicies(JSON.parse(savedSimilarPolicies));
    }
    if (savedAvailablePolicies) {
      setLocalAvailablePolicies(JSON.parse(savedAvailablePolicies));
    }
  }, []);

  console.log('Policy Data:', localPolicyData);
  console.log('Similar Policies:', localSimilarPolicies);
  console.log('Available Policies:', localAvailablePolicies);

  if (!localPolicyData) {
    return <div>No policy data available.</div>;
  }

  const handleNext = () => {
    navigate("/generate", { state: { selectedPolicy } });
  };

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
  };

  return (
    <div className="dashboard-container">
      <Navbar /> {/* Include Navbar component */}
      <div className="dashboard-content">
        <div className="left-column">
          <div className="section">
            <h2>{localPolicyData.clientName}</h2>
            <div className="currently-paying">
              <span className="amount">R {localPolicyData.premium}</span>
              <span className="per-month">per month</span>
            </div>
          </div>
          <hr />
          <div className="section">
            <label>Current Franchise:</label>
            <select>
              <option value="1000">R 1000</option>
              <option value="1500">R 1500</option>
              <option value="2000">R 2000</option>
            </select>
          </div>
          <hr />
          <div className="section checkbox-sections">
            <div className="checkbox-section">
              <h3>Arztmodell</h3>
              <label>
                <input type="checkbox" checked={localPolicyData.freeDoctorChoice} readOnly />
                Freie Arztwahl
              </label>
              <label>
                <input type="checkbox" checked={!localPolicyData.freeDoctorChoice} readOnly />
                Hausarztmodell
              </label>
            </div>
            <div className="checkbox-section">
              <h3>Kategorien</h3>
              <label>
                <input type="checkbox" checked={localPolicyData.accidentInsurance} readOnly />
                Unfallversicherung
              </label>
              <label>
                <input type="checkbox" checked={localPolicyData.hazard === "high"} readOnly />
                Vorsorgeuntersuchungen
              </label>
            </div>
          </div>
        </div>
        <div className="right-column">
          <h3>Available Policies for Comparison</h3>
          <div className="recommendation-cards">
            {localAvailablePolicies && localAvailablePolicies.length > 0 ? (
              localAvailablePolicies.map((policy, index) => (
                <div key={index} className={`recommendation-card ${index === 0 ? 'best-match' : ''}`}>
                  <div className="card-header">
                    <h4>{policy.name}</h4>
                  </div>
                  <div className="card-price">
                    <span className="price">R {policy.premium}</span>
                    <span className="less-per-month">Franchise: R {policy.franchise}</span>
                  </div>
                  <div className="card-details">
                    <p>Hazard: {policy.hazard}</p>
                    <p>Free Doctor Choice: {policy.freeDoctorChoice ? "Yes" : "No"}</p>
                    <p>Accident Insurance: {policy.accidentInsurance ? "Covered" : "Not Covered"}</p>
                    <p>Coverage: {policy.coverage.join(", ")}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No available policies for comparison.</p>
            )}
          </div>
          <h3>Recommended Policies</h3>
          <div className="recommendation-cards">
            {localSimilarPolicies && localSimilarPolicies.length > 0 ? (
              localSimilarPolicies.map((rec, index) => (
                <div
                  key={index}
                  className={`recommendation-card ${index === 0 ? 'best-match' : ''}`}
                  onClick={() => handlePolicyClick(rec)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-header">
                    <img src={rec.logo} alt={`${rec.name} logo`} className="provider-logo" />
                    <h4>{rec.name}</h4>
                  </div>
                  <div className="card-price">
                    <span className="price">R {rec.premium}</span>
                    <span className="less-per-month">R {localPolicyData.premium - rec.premium} less per month</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No recommended policies available.</p>
            )}
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate(-1)} className="previous-button">Previous</button>
        <button onClick={handleNext} className="next-button">Next</button>
      </div>
    </div>
  );
};

export default DashboardPage;