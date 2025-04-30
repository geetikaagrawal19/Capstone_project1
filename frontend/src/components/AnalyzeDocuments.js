import React from 'react';
import './Analyze.css'; // Same styling

function AnalyzeDocuments() {
  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Analyze Documents</h2>
      <div className="analyze-card">
        <p className="analyze-text">
          Upload documents to analyze content, detect plagiarism, find sensitive data, and much more with DetectifAI.
        </p>
        <button className="analyze-button">Upload Document</button>
      </div>
    </div>
  );
}

export default AnalyzeDocuments;
