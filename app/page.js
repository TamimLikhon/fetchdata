'use client';
import { useState } from 'react';

export default function Home() {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
    const [alldata, setallData] = useState([]);

  const [error, setError] = useState(null);

  const fetchById = async () => {
    if (!id.trim()) return;

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
      if (!res.ok) throw new Error('Not Found');
      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      setData(null);
      setError(err.message);
    }
  };

  const fetchalll = async()=>{
    const alldata = await fetch('https://jsonplaceholder.typicode.com/comments');
    if(!alldata.ok) throw new Error('Not Found');
    const fetchdataresult = await alldata.json();
    setallData(fetchdataresult);
  }

  return (
    <div>
      <h2>Search Comment by ID</h2>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter ID"
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={fetchById}>Search</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <div>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Body:</strong> {data.body}</p>
        </div>
      )}

      <button onClick={fetchalll}>Fetch all</button>


      <ul>
      {alldata.map((item) =>(
        <li key={item.id}>
          <p>{item.name}</p>
          <strong>body: {item.body} </strong>
        </li>
      ))}
      </ul>

    </div>
  );
}
