'use client';
import { useState } from 'react';
import useReactQuery from '../../components/useReactQuery';
import useDebounce from '@/components/useDebounceHook';
import useThrottole from '@/components/useThrottleHook';

export default function Home() {
    const [search, setSearch] = useState('');
    // const [query, setQuery] = useState('');
    // const throttledSearch = useThrottole(search, 500);
    // const debouncedSearch = useDebounce(search, 500);
//   const [data, error, loading] = useReactQuery( debouncedSearch ? `https://jsonplaceholder.typicode.com/comments?id=${search}` : null);
   const [data, error, loading] = useReactQuery(`https://jsonplaceholder.typicode.com/comments?id=${search}`);

// const handleSearch = () => setQuery(search);
//   const [data, error, loading] = useReactQuery(query ? `https://jsonplaceholder.typicode.com/comments?id=${search}` : null);
//    const [data, error, loading] = useReactQuery(throttledSearch ? `https://jsonplaceholder.typicode.com/comments?id=${search}` : null);


  return (
    <div>
      <input
        type="number"
        placeholder="search by id"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', marginRight: '8px' }}
      />

      {/* <button onClick={handleSearch}>Search</button> */}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Something went wrong</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <p><strong>ID:</strong> {item.id}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Body:</strong> {item.body}</p>
          </li>
        ))}
      </ul>

      {!loading && !error && data.length === 0 && <p>No results found.</p>}
    </div>
  );
}
