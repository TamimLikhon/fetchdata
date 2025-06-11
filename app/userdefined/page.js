'use client';
import { useState } from 'react';

export default function Home() {
  const [queryType, setQueryType] = useState('id'); // 'id' | 'email' | 'name'
  const [queryValue, setQueryValue] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      let url = 'https://jsonplaceholder.typicode.com/comments';

      if (queryValue.trim()) {
        const param = encodeURIComponent(queryValue.trim());
        url += `?${queryType}=${param}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Not Found');
      const data = await res.json();
      setResults(data);
      setError(null);
    } catch (err) {
      setResults([]);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Fetch Comments</h2>

      <div style={{ marginBottom: '12px' }}>
        <select
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
          style={{ padding: '8px', marginRight: '8px' }}
        >
          <option value="id">ID</option>
          <option value="email">Email</option>
          <option value="name">Name</option>
        </select>

        <input
          type="text"
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          placeholder={`Enter ${queryType} (optional)`}
          style={{ padding: '8px', marginRight: '8px' }}
        />

        <button onClick={fetchComments}>Fetch</button>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <ul>
        {results.map((item) => (
          <li key={item.id} style={{ marginBottom: '12px' }}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Body:</strong> {item.body}</p>
          </li>
        ))}
      </ul>

      {!error && results.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
}
