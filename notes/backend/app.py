from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the model for note using Pydantic
class Note(BaseModel):
    title: str
    content: str

class NoteResponse(Note):
    id: int

# In-memory database substitute
notes: List[dict] = []
note_id = 1

# Routes

@app.get("/notes", response_model=List[NoteResponse])
def get_notes():
    return notes

@app.get("/notes/{id}", response_model=NoteResponse)
def get_note(id: int):
    note = next((n for n in notes if n["id"] == id), None)
    if note:
        return note
    raise HTTPException(status_code=404, detail="Note not found")

@app.post("/notes", response_model=NoteResponse, status_code=201)
def create_note(note: Note):
    global note_id
    new_note = {
        "id": note_id,
        "title": note.title,
        "content": note.content
    }
    notes.append(new_note)
    note_id += 1
    return new_note

@app.put("/note/{id}", response_model=NoteResponse)
def update_note(id: int, updated_note: Note):
    for note in notes:
        if note["id"] == id:
            note["title"] = updated_note.title
            note["content"] = updated_note.content
            return note
    raise HTTPException(status_code=404, detail="Note not found")

@app.delete("/note/{id}")
def delete_note(id: int):
    global notes
    notes = [note for note in notes if note["id"] != id]
    return {"message": "Note deleted"}
