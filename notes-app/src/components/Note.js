import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, date, background, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const noteStyle = {
    backgroundImage: background,
  };

  const handleDelete = () => {
    onDelete(id);
  }

  const handleUpdate = () => {
    onUpdate(id, updatedText);
    setIsEditing(false);
  }

  return (
    <div className='note' style={noteStyle}>
      {isEditing ? (
        <textarea
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          onBlur={handleUpdate}
          autoFocus
          className="transparent-textarea" 
          rows="10" // Set the number of visible text lines
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{updatedText}</span>
      )}
      <div className='note-footer'>
        <date>{date}</date>
        <MdDeleteForever className='delete-icon' size='1.3em' onClick={handleDelete} />
      </div>
    </div>
  );
}

export default Note;
