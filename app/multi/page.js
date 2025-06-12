'use client';
import { useState, useEffect } from "react";
import axios from "axios";
//multiple data fetch
export default function Multifetch() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  
useEffect(() => {
  const fetchData = async () => {
    try {
      const emailAPI = 'https://jsonplaceholder.typicode.com/comments?id=2';
      const titleAPI = 'https://jsonplaceholder.typicode.com/albums?id=2';

      const [emailRes, titleRes] = await axios.all([
        axios.get(emailAPI),
        axios.get(titleAPI),
      ]);

      const emailValue = emailRes.data[0]?.email;
      const titleValue = titleRes.data[0]?.title;

      setEmail(emailValue);
      setTitle(titleValue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  return (
    <div>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Title:</strong> {title}</p>
    </div>
  );
}
