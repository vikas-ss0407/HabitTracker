import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../styles/LandingPage.css";
import LandingVideo from "../assets/landingpage.mp4"; 
const LandingPage = () => {
  useEffect(() => {
    document.body.classList.add('landing-page');
    return () => {
      document.body.classList.remove('landing-page');
    };
  }, []);

  return (
    <div className="landing-container">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="bg-video"
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        poster="/placeholder.jpg" 
      >
        <source src={LandingVideo} type="video/mp4" />
        <source src="/landingpage.webm" type="video/webm" /> 
        Your browser does not support HTML5 video.
      </video>

      <div className="landing-overlay">
        <div className="top-buttons">
          <Link to="/login">
            <button className="top-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="top-btn">Register</button>
          </Link>
        </div>

        <div className="center-text">
          <h1 className="typing-text">Habit Tracker . . . !</h1>
        </div>

        <div className="info-text-container">
          <p className="info-text">
            Track your progress, stay consistent, and achieve your goals every day with our easy-to-use habit tracker!
          </p>
        </div>

        <div className="bottom-left">
          <Link to="/register">
            <button className="bottom-btn">Add Habits</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;