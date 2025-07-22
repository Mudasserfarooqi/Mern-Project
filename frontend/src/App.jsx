import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend
  const fetchNotes = () => {
    fetch('http://localhost:5005/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching notes:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5005/add-note', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then(() => {
        setTitle('');
        setContent('');
        fetchNotes(); // reload notes after adding
      })
      .catch((err) => console.error('Error adding note:', err));
  };

  return (
    <div>
      <h1>MERN Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      <h2>All Notes</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              <strong>{note.title}</strong>: {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
