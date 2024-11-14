import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // FileUpload.js
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/your-upload-route", formData);
      console.log("Backend response:", response.data);

      const { summary, extractedText, recommendations } = response.data;

      // Ensure the data exists before proceeding
      if (!summary || !extractedText) {
        console.error("Summary or extracted text is missing");
        return;
      }

      // Store the response data in state
      setSummary(summary);
      setRecommendations(recommendations);

      // Navigate to the PolicyAnalysisPage with the extracted data
      navigate("/policy-analysis", {
        state: { summary, extractedText, recommendations }, // Passing extractedText here
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUpload = () => {
    if (file) {
      handleFileUpload(file); // Call the file upload handler
    } else {
      console.log("No file selected.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Compare</button>

      {summary && (
        <div>
          <h3>Policy Summary:</h3>
          <p>
            <strong>Client Name:</strong> {summary.clientName}
          </p>
          <p>
            <strong>Franchise:</strong> {summary.franchise}
          </p>
          <p>
            <strong>Hazard:</strong> {summary.hazard}
          </p>
          <p>
            <strong>Free Doctor Choice:</strong> {summary.freeDoctorChoice}
          </p>
          <p>
            <strong>Accident Insurance:</strong> {summary.accidentInsurance}
          </p>
          <p>
            <strong>Premium:</strong> {summary.premium}
          </p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h3>Recommended Alternative Policies:</h3>
          <ul>
            {recommendations.map((policy, index) => (
              <li key={index}>
                <strong>{policy.name}</strong> - Premium: ${policy.premium}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
