import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useReactQuery(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          setError(false);

        //   // Construct final URL safely
        //   const query = search.trim() ? `?${search}` : '';
        //   const finalUrl = `${baseUrl}${query}`;

          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();

  }, [url]);

  return [data, error, loading];
}
