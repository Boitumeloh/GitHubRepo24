import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import UploadPage from "./components/UploadPage";
import PolicyAnalysisPage from "./components/PolicyAnalysisPage";
import DocumentGenerationPage from "./components/DocumentGenerationPage";
import "./App.css";

function App() {
  const [policyData, setPolicyData] = useState(null);
  const [similarPolicies, setSimilarPolicies] = useState([]);
  const [availablePolicies, setAvailablePolicies] = useState([]);

  useEffect(() => {
    if (policyData) {
      fetch('http://localhost:5000/api/similar-policies')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched similar policies:', data);
          setSimilarPolicies(data);
        })
        .catch(error => console.error('Error fetching similar policies:', error));
    }
  }, [policyData]);

  useEffect(() => {
    fetch('http://localhost:5000/api/available-policies')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched available policies:', data);
        setAvailablePolicies(data);
      })
      .catch(error => console.error('Error fetching available policies:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UploadPage setPolicyData={setPolicyData} />}
        />
        <Route
          path="/policy-analysis"
          element={<PolicyAnalysisPage policyData={policyData} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardPage policyData={policyData} similarPolicies={similarPolicies} availablePolicies={availablePolicies} />}
        />
        <Route
          path="/generate"
          element={<DocumentGenerationPage policyData={policyData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;