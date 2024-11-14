import React from "react";
import "../styles/BrowserConsole.css";

const BrowserConsole = ({ logs }) => {
  return (
    <div className="browser-console">
      <h3>Console Logs</h3>
      <div className="console-output">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default BrowserConsole;