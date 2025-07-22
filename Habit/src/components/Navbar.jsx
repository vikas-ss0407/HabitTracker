import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load user name from localStorage or fallback
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    } else {
      setUserName("Guest");
    }
  }, []);

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  navigate("/login");
};


  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/habits">Home</Link>
        <Link to="/addhabit">Add Habits</Link>
        <Link to="/addnote">Add Notes</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="right-nav">
        <span>Hello, {userName}</span>
        {userName !== "Guest" && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
