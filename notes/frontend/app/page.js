"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

const page = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const noteColors = [
    {
      bgColor: "bg-[#FEEABB]", // Pastel Yellow
      borderColor: "border-[#FAD589]", // Darker Yellow
    },
    {
      bgColor: "bg-[#C9E7C3]", // Pastel Green
      borderColor: "border-[#A4CF9F]", // Darker Green
    },
    {
      bgColor: "bg-[#FEE0B8]", // Pastel Peach
      borderColor: "border-[#FAC795]", // Darker Peach
    },
    {
      bgColor: "bg-[#D1E5F7]", // Pastel Blue
      borderColor: "border-[#A4C4E0]", // Darker Blue
    },
    {
      bgColor: "bg-[#F3D9F7]", // Pastel Lavender
      borderColor: "border-[#DFB5E7]", // Darker Lavender
    },
    {
      bgColor: "bg-[#FFD1D1]", // Pastel Pink
      borderColor: "border-[#FFADAD]", // Darker Pink
    },
    {
      bgColor: "bg-[#E0F7F6]", // Pastel Mint
      borderColor: "border-[#B5E8E5]", // Darker Mint
    },
    {
      bgColor: "bg-[#F7EED9]", // Pastel Cream
      borderColor: "border-[#E8DAB5]", // Darker Cream
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to load notes", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes((prevNotes) => [...prevNotes, data]);
        setNewNote({ title: "", content: "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to add note", err);
        setLoading(false);
      });
  };

  const handleDelete = (noteId) => {
    fetch(`http://localhost:5000/note/${noteId}`, {
      method: "DELETE",
    }).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    });
  };

  const handleEdit = (note) => {
    setEditingNote(note); // Set the note to be edited
  };

  const handleSaveEdit = () => {
    setLoading(true);
    fetch(`http://localhost:5000/note/${editingNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingNote),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note.id === editingNote.id ? data : note))
        );
        setEditingNote(null); // Reset editing state after saving
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to save note", err);
        setLoading(false);
      });
  };

  const getColorForNote = (noteId) => {
    const colorIndex = (noteId - 1) % noteColors.length;
    return noteColors[colorIndex];
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-[#2B5185] nunito">
      <div className="w-[95vw] sm:w-3/4 bg-[#FDF7EA] rounded-4xl p-4 md:p-10 shadow-xl shadow-[#d6cfc3] shadow-inner">
        <div className="p-4">
          <p className="text-5xl font-extrabold pb-4">Notes</p>
        </div>
        <Image
        src="/images/1.png" 
        alt="image"
        width={120} 
        height={120}
        className="absolute top-24 left-20 rotate-45"
      />      
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3  max-h-96 overflow-y-auto">
          {/* Add Note Form - First Item */}
          <div className="bg-[#FFECBA] border-5 border-[#FAD487] rounded-xl p-5 mb-4">
            <h3 className="text-3xl mb-4">Add a New Note</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 mb-4 rounded-lg"
              />
              <textarea
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                placeholder="Content"
                className="w-full p-2 mb-4 rounded-lg"
              />
              <button
                type="submit"
                className="bg-[#F6978E] px-6 py-2 rounded-3xl text-white text-xl cursor-pointer"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Note"}
              </button>
            </form>
          </div>

          {notes.map((note) => {
            const { bgColor, borderColor } = getColorForNote(note.id);
            return (
              <div
                key={note.id}
                className={`${bgColor} ${borderColor} border-5 rounded-xl p-5 mb-4 min-h-52`}
              >
                <div className="pb-3">
                  {editingNote && editingNote.id === note.id ? (
                    <>
                      <input
                        type="text"
                        value={editingNote.title}
                        onChange={(e) =>
                          setEditingNote({
                            ...editingNote,
                            title: e.target.value,
                          })
                        }
                        className="text-3xl w-full mb-3"
                      />
                      <textarea
                        value={editingNote.content}
                        onChange={(e) =>
                          setEditingNote({
                            ...editingNote,
                            content: e.target.value,
                          })
                        }
                        className="w-full mb-4 text-lg"
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="bg-[#F6978E] px-6 py-2 rounded-3xl text-white text-xl cursor-pointer"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row justify-between">
                        <h3 className="text-3xl">{note.title}</h3>
                        <div className="flex flex-row gap-6 items-center">
                          <FontAwesomeIcon
                            icon={faPencil}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleEdit(note)}
                          />
                          <div
                            className="rounded-full bg-[#F9A48B] p-2 cursor-pointer"
                            onClick={() => handleDelete(note.id)}
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="w-6 h-6"
                            />
                          </div>
                        </div>
                      </div>
                      <p className="nunito text-lg">{note.content}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Image
        src="/images/2.png" 
        alt="image"
        width={200} 
        height={200}
        className="absolute bottom-10 right-36 rotate-20"
      />      
    </div>
  );
};

export default page;
