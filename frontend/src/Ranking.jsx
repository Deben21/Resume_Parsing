import React, { useState, useEffect } from 'react';

const ParsedData = () => {
  const [parsed_data, setParsedData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const myHeaders = new Headers();
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
        redirect: 'follow',
      };
      const response = await fetch(
        'http://127.0.0.1:8000/get_parsed_data/',
        requestOptions
      );
      const result = await response.json();
      setParsedData(result.parsed_data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data.');
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div>
      <h1>Parsed Data</h1>
      {/* Check if loading */}
      {loading && <p>Loading...</p>}
      {/* Check if error */}
      {error && <p>{error}</p>}
      {/* Check if parsed_data is defined and not empty */}
      {parsed_data && parsed_data.length > 0 && (
        <ul>
          {parsed_data.map((item) => (
            <li key={item.id}>
              <h3>ID: {item.id}</h3>
              <p>Extracted Data: {item.name}</p>
              <p>Extracted Data: {item.experience}</p>
              <p>Extracted Data: {item.certifiacation}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParsedData;
