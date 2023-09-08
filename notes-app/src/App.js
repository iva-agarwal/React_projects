import React, { useState } from 'react';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import SideBar from './components/SideBar';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Welcome to Ghibli notes",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const updateNote = (id, newText) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };

  return (
    <div className='container'>
      <SideBar onAddNote={addNote} />
      <NotesList
        notes={notes}
        onDeleteNote={deleteNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
}

export default App;
