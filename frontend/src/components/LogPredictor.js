import React, { useState } from 'react';
import axios from 'axios';

function LogPredictor() {
  const [log, setLog] = useState({
    Activity_Type: "Login",
    Action: "Success",
    Anomaly_Type: "None",
    Timestamp: "2024-04-25T10:00:00",
    User_ID: "1234",
    IP_Address: "192.168.1.1",
    File_Name: "file.txt",
    Resource_Accessed: "resource"
  });

  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/predict', log);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult('Error predicting log.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">🔍 Log Anomaly Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(log).map(([key, value]) => (
            <div key={key}>
              <label className="block text-gray-800 font-semibold mb-2 tracking-wide">{key.replace(/_/g, ' ')}</label>
              <input
                type="text"
                placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                value={value}
                onChange={(e) => setLog({ ...log, [key]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white text-lg font-semibold py-2 px-8 rounded-full shadow-md hover:bg-blue-800 hover:scale-105 transform transition-all duration-300"
          >
            Predict
          </button>
        </div>
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-inner">
          <p className="font-semibold text-gray-700 mb-2">Prediction Result:</p>
          <p className="text-blue-900 break-words text-lg">{result || 'No prediction yet.'}</p>
        </div>
      </div>
    </div>
  );
}

export default LogPredictor;
