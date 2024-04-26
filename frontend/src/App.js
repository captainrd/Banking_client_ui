import axios from "axios";
import { useState } from "react";
import "./App.css";
import Profile from "./Profile"; // Import the Profile component

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        " http://127.0.0.1:8000/login/",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      // Fetch user profile after successful login
      const profileRes = await axios.get("http://localhost:8000/profile/", {
        withCredentials: true,
      });
      setUserData(profileRes.data); // Set user data in state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {userData ? (
        <Profile userData={userData} /> // Render Profile component if userData is available
      ) : (
        <form onSubmit={login}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      )}
    </div>
  );
}

export default App;
