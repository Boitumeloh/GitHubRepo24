import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Navbar from "./Navbar"; // Import Navbar component
import "../styles/PolicyAnalysisPage.css";
import BrowserConsole from "./BrowserConsole";

function PolicyAnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary } = location.state || {};
  const [progress, setProgress] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [analyzingText, setAnalyzingText] = useState("Analyzing your policy...");

  const sentences = [
    `Your name is: ${summary?.clientName}`,
    `The Franchise is: ${summary?.franchise}`,
    `Hazard: ${summary?.hazard}`,
    `Free doctor choice: ${summary?.freeDoctorChoice}`,
    `Accident insurance: ${summary?.accidentInsurance}`,
    `Premium: ${summary?.premium}`
  ];

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/api/logs');
    eventSource.onmessage = (event) => {
      setConsoleLogs((prevLogs) => [...prevLogs, event.data]);
      console.log(event.data);
    };
    eventSource.onerror = () => {
      eventSource.close();
    };

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);

    const sentenceTimer = setInterval(() => {
      setCurrentSentenceIndex((prevIndex) => {
        if (prevIndex < sentences.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(sentenceTimer);
          return prevIndex;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(sentenceTimer);
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    if (progress === 100 && currentSentenceIndex === sentences.length - 1) {
      setAnalyzingText("Policy Analyzed");
    }
  }, [progress, currentSentenceIndex]);

  return (
    <div className="analysis-container">
      <Navbar /> {/* Include Navbar component */}
      <h2>{analyzingText}</h2>
      <div className="content">
        <div className="progress-container">
          <CircularProgress variant="determinate" value={progress} size={150} />
          <div className="progress-text">{`${progress}%`}</div>
        </div>
        <div className="summary-details">
          {sentences.slice(0, currentSentenceIndex + 1).map((sentence, index) => (
            <p key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              >
                <path
                  d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                  fill-rule="nonzero"
                />
              </svg>
              <strong>{sentence}</strong>
            </p>
          ))}
        </div>
      </div>
      <BrowserConsole logs={consoleLogs} />
      <div className="navigation-buttons">
        <button onClick={() => navigate(-1)} className="previous-button">Previous</button>
        <button onClick={() => navigate("/dashboard", { state: { summary } })} className="next-button">Next</button>
      </div>
    </div>
  );
}

export default PolicyAnalysisPage;