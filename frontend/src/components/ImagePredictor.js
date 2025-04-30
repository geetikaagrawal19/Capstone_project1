import React, { useState } from 'react';
import axios from 'axios';

function ImagePredictor() {
  const [imagePath, setImagePath] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/predict-img', {
        image_path: imagePath
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
      setResult('Error predicting image.');
    }
  };

  return (
    <div>
      <h3>Image Stego Detection</h3>
      <input
        type="text"
        value={imagePath}
        onChange={(e) => setImagePath(e.target.value)}
        placeholder="Enter full image path"
      />
      <button onClick={handleSubmit}>Predict</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default ImagePredictor;
