import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="app-container">
        <h1>User Directory</h1>
        <div className="status-message">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <h1>User Directory</h1>
        <div className="status-message error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>User Directory</h1>
      <ul className="data-list">
        {users.map((user) => (
          <li key={user.id} className="data-card">
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company.name}</p>
            <p><strong>City:</strong> {user.address.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;