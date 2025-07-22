import '../styles/AddHabit.css';
import axios from 'axios';

const handleSubmit = async e => {
  e.preventDefault();
  await axios.post('http://localhost:8080/api/habits', { name, days, purpose }, { headers: { Authorization: localStorage.getItem('token') } });
  window.location = '/habits';
};

const AddHabit = () => {
  return (
    <div className="addhabit-container">
      <h2>Add New Habit</h2>
      <form className="habit-form">
        <label htmlFor="habitName">Habit Name</label>
        <input id="habitName" type="text" placeholder="Enter habit name" required />

        <label htmlFor="days">How many days?</label>
        <input id="days" type="number" placeholder="e.g., 21" required />

        <label htmlFor="purpose">Purpose</label>
        <textarea id="purpose" placeholder="Why do you want to build this habit?" rows="4" required />

        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;
