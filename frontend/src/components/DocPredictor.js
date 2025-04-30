import React, { useState } from 'react';
import axios from 'axios';

function DocPredictor() {
  const [docFeatures, setDocFeatures] = useState({ Size: 512, Entropy: 5.5 });
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/predict-doc', docFeatures);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult('Error predicting document.');
    }
  };

  return (
    <div>
      <h3>Document Malware Detection</h3>
      <input
        type="number"
        value={docFeatures.Size}
        onChange={(e) => setDocFeatures({ ...docFeatures, Size: Number(e.target.value) })}
        placeholder="Size"
      />
      <input
        type="number"
        step="0.1"
        value={docFeatures.Entropy}
        onChange={(e) => setDocFeatures({ ...docFeatures, Entropy: Number(e.target.value) })}
        placeholder="Entropy"
      />
      <button onClick={handleSubmit}>Predict</button>
      <p>Result: {result}</p>
    </div>
  );
}

export default DocPredictor;
