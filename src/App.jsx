import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage when the app starts
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleAddNote(e) {
    e.preventDefault(); // stop form refresh
    if (!noteText.trim()) return;

    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
  }

  function handleDeleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <div className="app">
      <h1>Mini Notes</h1>
      <p className="subtitle">A tiny React app you built ✨</p>

      <form onSubmit={handleAddNote} className="note-form">
        <input
          type="text"
          placeholder="Type a note and press Enter…"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {notes.length === 0 ? (
        <p className="empty">No notes yet. Start by adding one above.</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <span>{note.text}</span>
              <button onClick={() => handleDeleteNote(note.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
