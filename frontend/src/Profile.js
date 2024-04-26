import React from "react";

function Profile({ userData }) {
  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      <p>Email: {userData.email}</p>
      {/* Add more profile information here */}
    </div>
  );
}

export default Profile;
