import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HabitsPage from "./pages/HabitsPage";
import AddHabit from "./pages/AddHabit";
import AddNote from "./pages/AddNote";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/habits" element={<HabitsPage />} />
      <Route path="/addhabit" element={<AddHabit />} />
      <Route path="/addnote" element={<AddNote />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
