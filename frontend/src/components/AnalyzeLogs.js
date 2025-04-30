import React from 'react';
import './Analyze.css'; // Common CSS for all analyze pages

function AnalyzeLogs() {
  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Analyze Logs</h2>
      <div className="analyze-card">
        <p className="analyze-text">
          Upload and analyze your log files here. Extract critical information quickly and efficiently with DetectifAI.
        </p>
        <button className="analyze-button">Upload Log File</button>
      </div>
    </div>
  );
}

export default AnalyzeLogs;


