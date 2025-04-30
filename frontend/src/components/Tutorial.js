import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './Tutorial.css';
import { useNavigate } from 'react-router-dom';

function Tutorial() {
  const navigate = useNavigate();
  const [selectedTutorial, setSelectedTutorial] = useState('logs');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchTutorialContent(selectedTutorial);
  }, [selectedTutorial]);

  const fetchTutorialContent = async (tutorialType) => {
    let filename = '';
    if (tutorialType === 'logs') filename = 'how-to-analyze-logs.md';
    else if (tutorialType === 'images') filename = 'how-to-analyze-images.md';
    else if (tutorialType === 'documents') filename = 'how-to-analyze-documents.md';

    try {
      const response = await fetch(`http://localhost:5001/tutorials/${filename}`);
      const text = await response.text();
      setContent(text);
    } catch (error) {
      console.error('Error loading tutorial:', error);
      setContent('# Error loading tutorial.');
    }
  }; // <-- THIS } is important to close fetchTutorialContent

  const renderActionsButtons = () => {
    let label = '';
    let path = '';
    let videoURL = '';

    if (selectedTutorial === 'logs'){ 
      label = 'Analyze Logs';
      path = '/analyze/logs';
      videoURL = 'https://youtube.com/tA-32BLjrFA?feature=shared'
    }
    else if (selectedTutorial === 'images'){
      label = 'Analyze Images';
      path = '/analyze/images';
      videoURL = 'https://youtube.com/-OhxfhgWjTU?feature=shared'
    }
    else if (selectedTutorial === 'documents'){
      label = 'Analyze Documents'
      path = '/analyze/documents';
      videoURL = 'https://youtube.com/RRbrLuYXdTw?feature=shared'
    }

    return (
      <div className="action-buttons">
        <button className="analyze-button" onClick={() => navigate(path)}>
          {label}
        </button>
        <button className="video-btn" onClick={() => window.open(videoURL, '_blank')}>
          Watch Video
        </button>
      </div>
    )
  }

  const renderTutorialContent = () => {
    return (
      <motion.div
        key={selectedTutorial}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
        {renderActionsButtons()}
      </motion.div>
    );
  }; // <-- THIS } is important to close renderTutorialContent

  return (
    <div className="tutorial-page">
      <div className="sidebar">
        <button
          className={selectedTutorial === 'logs' ? 'active' : ''}
          onClick={() => setSelectedTutorial('logs')}
        >
          Logs Tutorial
        </button>
        <button
          className={selectedTutorial === 'images' ? 'active' : ''}
          onClick={() => setSelectedTutorial('images')}
        >
          Images Tutorial
        </button>
        <button
          className={selectedTutorial === 'documents' ? 'active' : ''}
          onClick={() => setSelectedTutorial('documents')}
        >
          Documents Tutorial
        </button>
      </div>
      <div className="tutorial-content">
        {renderTutorialContent()}
      </div>
    </div>
  );
}

export default Tutorial;
