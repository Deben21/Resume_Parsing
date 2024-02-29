import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Parser = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Clear previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    if (!file) {
      setError('Please select a file.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://127.0.0.1:8000/api/parse_resume/', formData, {
        withCredentials: true, // Send cookies with the request
      });

      // Handle response data
      const data = response.data;
      console.log(data);
      setParsedData(data); // Update parsedData state
    } catch (error) {
      console.error(error);
      setError('An error occurred while processing the request.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Initialize Aos for animation
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  return (
    <div className="parser">
      <div className="parsing_container">
        <h1 data-aos="fade-right">
          Start Using Our <span className="gradient-text">Service</span>
        </h1>
        <div className="parsing_container_content" data-aos="fade-left">
          <h1>Resume Parser</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="resume">Upload Resume:</label>
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <button type="submit" disabled={loading}>
              Parse Resume
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          </form>
          {parsedData && (
            <div>
              <h2>Parsed Data:</h2>
              <pre>{JSON.stringify(parsedData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Parser;
