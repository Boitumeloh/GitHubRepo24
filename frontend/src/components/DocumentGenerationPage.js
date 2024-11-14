import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/DocumentGenerationPage.css';

function DocumentGenerationPage({ policyData }) {
  const [generatedPolicyDocument, setGeneratedPolicyDocument] = useState(null);
  const [generatedTerminationDocument, setGeneratedTerminationDocument] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPolicy } = location.state || {};

  useEffect(() => {
    if (selectedPolicy) {
      policyData = selectedPolicy;
    }
  }, [selectedPolicy]);

  const handleGenerateDocument = async () => {
    try {
      const doc = new jsPDF();
      doc.text("Client Name: " + policyData.clientName, 10, 10);
      doc.text("Premium: " + policyData.premium, 10, 20);
      doc.text("Franchise: " + policyData.franchise, 10, 30);
      doc.text("Hazard: " + policyData.hazard, 10, 40);
      doc.text("Accident Insurance: " + policyData.accidentInsurance, 10, 50);
      doc.text("Free Doctor Choice: " + policyData.freeDoctorChoice, 10, 60);

      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setGeneratedPolicyDocument({
        pdfUrl,
        details: policyData,
      });
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  const handleGenerateTerminationDocument = async () => {
    try {
      const doc = new jsPDF();
      doc.text("Client Name: " + policyData.clientName, 10, 10);
      doc.text("Premium: " + policyData.premium, 10, 20);
      doc.text("Franchise: " + policyData.franchise, 10, 30);
      doc.text("Hazard: " + policyData.hazard, 10, 40);
      doc.text("Accident Insurance: " + policyData.accidentInsurance, 10, 50);
      doc.text("Free Doctor Choice: " + policyData.freeDoctorChoice, 10, 60);
      doc.text("This is a termination document for the current policy.", 10, 70);

      const pdfBlob = doc.output("blob");
      const pdfUrl = URL.createObjectURL(pdfBlob);

      setGeneratedTerminationDocument({
        pdfUrl,
        details: policyData,
      });
    } catch (error) {
      console.error("Error generating termination document:", error);
    }
  };

  const handlePrevious = () => {
    navigate("/dashboard");
  };

  const handleNext = () => {
    // Navigate to the next page or perform another action
    console.log("Next button clicked");
  };

  return (
    <div className="document-generation-page">
      <Navbar /> {/* Include Navbar component */}
      <h1>Document Generation</h1>

      <div className="buttons">
        <button onClick={handleGenerateDocument} className="generate-button">Generate Document for Selected Policy</button>
        <button onClick={handleGenerateTerminationDocument} className="generate-button">Generate Termination Document</button>
      </div>

      <div className="document-previews">
        {generatedPolicyDocument && (
          <div className="file-preview">
            <h3>Selected Policy Document Preview</h3>
            <iframe src={generatedPolicyDocument.pdfUrl} title="Policy Document Preview" className="pdf-preview" />
          </div>
        )}
        {generatedTerminationDocument && (
          <div className="file-preview">
            <h3>Termination Policy Document Preview</h3>
            <iframe src={generatedTerminationDocument.pdfUrl} title="Termination Document Preview" className="pdf-preview" />
          </div>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} className="previous-button">Previous</button>
        <button onClick={handleNext} className="next-button">Next</button>
      </div>
    </div>
  );
}

export default DocumentGenerationPage;