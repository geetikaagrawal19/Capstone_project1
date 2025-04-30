// src/components/Card.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ title, subtitle, action, icon, backgroundColor, backText }) => {
  const [flipped, setFlipped] = useState(false);
  const tutorialSection = title.split(" ")[1]?.toLowerCase();

  const handleFlip = (e) => {
    e.stopPropagation();
    setFlipped((f) => !f);
  };

  // Correct the path for analyze routes
  const getAnalyzePath = (action) => {
    if (action === "Analyze Logs") return "/analyze/logs";
    if (action === "Analyze Images") return "/analyze/images";
    if (action === "Analyze Documents") return "/analyze/documents";
    return "/";
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} style={{ backgroundColor }}>
      <div className="card-inner">
        {/* FRONT */}
        <div className="card-front" onClick={handleFlip}>
          <img src={icon} alt={title} className="card-icon" />
          <button className="card-button">{title}</button>

          {/* Tutorial Button */}
          <Link to={`/tutorial?section=${tutorialSection}`}>
            <button className="card-button">{subtitle}</button>
          </Link>

          {/* Action Button */}
          <Link to={getAnalyzePath(action)}>
            <button className="card-button">{action}</button>
          </Link>
        </div>

        {/* BACK */}
        <div className="card-back" onClick={handleFlip}>
          {backText}
        </div>
      </div>
    </div>
  );
};

export default Card;
