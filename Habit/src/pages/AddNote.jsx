// AddNote.jsx
import { useState } from 'react';
import '../styles/AddNote.css';
import axios from 'axios';

const AddNote = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/notes',
        { content },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      window.location = '/habits';
    } catch (err) {
      alert("Failed to add note");
    }
  };

  return (
    <div className="note-container">
      <h2>Add Notes</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your note..."
          rows={8}
          cols={50}
          className="note-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="note-button">Save</button>
      </form>
    </div>
  );
};

export default AddNote;
