import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(token) : null;

  return (
    <div>
      <h2>Welcome to Your Profile</h2>

      {user && (
        <p>
          <strong>Joined On:</strong>{" "}
          {new Date(user.joined).toLocaleDateString()}
        </p>
      )}

      <Link to={token ? "/addhabit" : "/register"}>
        <button className="bottom-btn">Add Habits</button>
      </Link>
    </div>
  );
};

export default Profile;
