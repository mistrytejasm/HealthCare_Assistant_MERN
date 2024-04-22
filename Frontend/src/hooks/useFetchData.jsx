import { useEffect, useState } from 'react';
import { token } from '../config';

const useFetchData = (url) => { // Ensure URL is passed as an argument
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize with loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        setData(result.data); // Set data on success
        setLoading(false); // Stop loading

      } catch (err) { // Catch and handle errors
        setLoading(false);
        setError(err.message); // Set error message
      }
    };

    fetchData(); // Execute fetch function
  }, [url]); // Dependency array should include 'url'

  return { data, loading, error }; // Return an object with the fetched data, loading state, and error message
};

export default useFetchData;