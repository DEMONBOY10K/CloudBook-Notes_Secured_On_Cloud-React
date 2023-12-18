import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Get All Notes
    const fetchNote = async () => {
        //API CAll
        const url = `${host}/api/notes/fetch-all-note`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        //Logic to Get Note in Client Side
        if (response.ok) {
            const json = await response.json();

            // Make sure json is an array and not nested within another array
            if (Array.isArray(json) && json.length > 0) {
                setNotes(json[0]); // Use the first element of the outer array
            } else {
                setNotes([]); // Set an empty array if no data is returned
            }
        } else {
            console.error("Failed to fetch notes");
        }

    }

    //Add A Note
    const addNote = async (title, description, tag) => {
        //API CAll
        const url = `${host}/api/notes/add-note`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const noteJson = await response.json();
        setNotes(notes.concat(noteJson));
    }

    //Delete A Note
    const deleteNote = async (id) => {
        //API CAll
        const url = `${host}/api/notes/delete-note/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        try {
            console.info("Note "+json.note.title.substring(1, 5) + "... Deleted");
        } catch (error) {}
        //Logic to Delete Note in Client
        const updatedNotes = notes.filter((note) => { return note._id !== id });
        setNotes(updatedNotes);

    }
    //Edit A Note
    const editNote = async (id, title, description, tag) => {
        //API CAll
        const url = `${host}/api/notes/update-note/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        try {
            console.info("Note "+json.note.title.substring(1, 5) + "... Updated");
        } catch (error) {}

        //Logic to Edit Note in Client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;