import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the backend
    async function fetchUserData() {
      try {
        const response = await axios.get('/api/profile/'); // Assuming your profile endpoint is at '/api/profile/'
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more fields here as needed */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
}

export default Profile;
