import React from 'react';
import './Analyze.css'; // Same styling

function AnalyzeImages() {
  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Analyze Images</h2>
      <div className="analyze-card">
        <p className="analyze-text">
          Upload images to detect hidden patterns, anomalies, or important visual clues instantly with DetectifAI.
        </p>
        <button className="analyze-button">Upload Image</button>
      </div>
    </div>
  );
}

export default AnalyzeImages;
