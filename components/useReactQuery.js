import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useReactQuery(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }, 3000);
    return () => clearTimeout(timer);
  }, [url]);

  return [data, error, loading];
}
