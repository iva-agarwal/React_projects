import React from 'react';
import Note from './Note';

const NotesList = ({ notes, onDeleteNote, onUpdateNote }) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          date={note.date}
          background={note.background}
          onDelete={onDeleteNote}
          onUpdate={onUpdateNote} // Pass the update function
        />
      ))}
    </div>
  );
}

export default NotesList;
