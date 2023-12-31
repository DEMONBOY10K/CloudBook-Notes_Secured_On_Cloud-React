import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleTextChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    return (
        <>
            <h2 className="my-4">Add a Note:</h2>
            <form >
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleTextChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={handleTextChange}
                        rows="4"  
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleTextChange} />
                </div>
                <button disabled={note.title.trim().length < 3 || note.description.trim().length < 5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote