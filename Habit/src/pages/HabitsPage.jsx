import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../styles/HabitsPage.css";

const HabitsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [habits, setHabits] = useState([]);

  const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const dates = Array.from({ length: totalDays }, (_, i) => i + 1);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/habits?month=${selectedMonth + 1}&year=${selectedYear}`)
      .then((res) => {
        setHabits(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch habits:", err);
      });
  }, [selectedMonth, selectedYear]);

  const handleCheckboxToggle = (habitIndex, dayIndex) => {
    const updatedHabits = [...habits];
    const current = updatedHabits[habitIndex].progress[dayIndex];
    updatedHabits[habitIndex].progress[dayIndex] = !current;
    setHabits(updatedHabits);

    axios
      .post("http://localhost:8080/api/habits/update", {
        habitName: updatedHabits[habitIndex].name,
        day: dayIndex + 1,
        month: selectedMonth + 1,
        year: selectedYear,
        status: !current,
      })
      .catch((err) => {
        console.error("Failed to update habit:", err);
      });
  };

  const calculateCompletion = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <>
      <Navbar />
      <div className="habit-page">
        <div className="header-controls centered-selectors">
          <div className="selectors">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="month-selector"
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ].map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="year-selector"
            >
              {generateYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="habit-table">
          <thead>
            <tr>
              <th className="habit-name">Habit</th>
              {dates.map((day) => (
                <th key={day} className="date">{day}</th>
              ))}
              <th className="stats-header">Progress</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, i) => {
              const completed = habit.progress.filter((p) => p).length;
              const remaining = totalDays - completed;
              const completionPercentage = calculateCompletion(completed, totalDays);

              return (
                <tr key={i}>
                  <td className="habit-name">{habit.name}</td>
                  {habit.progress.map((done, j) => (
                    <td key={j}>
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => handleCheckboxToggle(i, j)}
                        className="habit-checkbox"
                      />
                    </td>
                  ))}
                  <td className="habit-stats">
                    <div className="stats-container">
                      <div className="stats-bar">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      <div className="stats-numbers">
                        <span className="completed">{completed} days</span>
                        <span className="separator">/</span>
                        <span className="total">{totalDays} days</span>
                      </div>
                      <div className="completion-percent">
                        {completionPercentage}%
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HabitsPage;