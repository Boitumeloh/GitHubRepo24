import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../services/apiService";
import Navbar from "./Navbar"; // Import Navbar component
import "../styles/UploadPage.css";

function UploadPage({ setPolicyData }) {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    previewFile(selectedFile); // Call preview function when file is selected
    setIsUploaded(false); // Reset upload state when a new file is selected
  };

  const previewFile = (file) => {
    const fileReader = new FileReader();
    if (file.type.startsWith("image/")) {
      // For images
      setFileContent(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      // For PDFs
      setFileContent(URL.createObjectURL(file));
    } else if (file.type.startsWith("text/")) {
      // For text files
      fileReader.onload = (e) => setFileContent(e.target.result);
      fileReader.readAsText(file);
    } else {
      setFileContent("Preview not available for this file type.");
    }
  };

  const handleNext = async () => {
    console.log("handleNext called");
    if (file) {
      try {
        console.log("Uploading file:", file);
        const response = await uploadFile(file);
        console.log("Response received:", response);
        // Set policy data in App.js
        setPolicyData({
          clientName: response.summary.clientName,
          premium: response.summary.premium,
          franchise: response.summary.franchise,
          hazard: response.summary.hazard,
          accidentInsurance: response.summary.accidentInsurance,
          freeDoctorChoice: response.summary.freeDoctorChoice,
          recommendations: response.recommendations,
        });
        // Navigate to the next page
        navigate("/policy-analysis", {
          state: {
            summary: response.summary,
            extractedText: response.extractedText,
            availablePolicies: response.availablePolicies,
            similarPolicies: response.similarPolicies,
          },
        });
        setIsUploaded(true); // Set upload state to true after successful upload
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="upload-container">
      <Navbar /> {/* Include Navbar component */}
      {/* <header className="upload-header">EasyInsurance</header> */}
      <h2>Please upload your insurance policy</h2>
      <div className="file-preview">
        {fileContent ? (
          <>
            {file.type.startsWith("image/") ? (
              <img src={fileContent} alt="File Preview" className="file-image" />
            ) : file.type === "application/pdf" ? (
              <iframe
                src={fileContent}
                title="PDF Preview"
                className="file-iframe"
              ></iframe>
            ) : (
              <div className="file-text-content">
                <pre>{fileContent}</pre>
              </div>
            )}
            <div className="file-details">
              <p>{file.name}</p>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </>
        ) : (
          <p>No file selected</p>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="file-input"
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} className="upload-button">
        {isUploaded ? "Upload Another File" : "Upload File"}
      </button>
      <div className="button-container">
        <button onClick={handleNext} className="next-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default UploadPage;