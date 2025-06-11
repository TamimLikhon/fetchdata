'use client';
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    setError(null);

    setTimeout(async () => {
      try {
        const query = id.trim() ? `?id=${id.trim()}` : '';
        const res = await fetch(`https://jsonplaceholder.typicode.com/comments${query}`);
        if (!res.ok) throw new Error('Not Found');
        const result = await res.json();
        setComments(result);
      } catch (err) {
        setComments([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div>
      <h2>Fetch Comments</h2>

      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID (optional)"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Body:</strong> {item.body}</p>
          </li>
        ))}
      </ul>

      {!error && !loading && comments.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
}
