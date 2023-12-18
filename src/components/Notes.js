import React, { useContext, useEffect,useRef,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const [note, setNote] = useState({etitle:"",edescription:"",etag:""});
    const { notes, fetchNote ,editNote} = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNote();
        }else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({eid:currentNote._id,etitle:currentNote.title , edescription:currentNote.description , etag:currentNote.tag})
       
    }
    
    const handleTextChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleUpdateNote = (e)=>{
        e.preventDefault();
        editNote(note.eid,note.etitle,note.edescription,note.etag);
    
    }
    const ref=useRef(null)
    return (
        <>
            <AddNote />

            {/* Modal For Update NOTE */}
            <button type="button" className="btn d-none btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" >
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} rows="4" onChange={handleTextChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleTextChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button"   className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled ={note.etitle.trim().length < 3 || note.edescription.trim().length < 5}type="button"  className="btn btn-primary "   data-bs-dismiss='modal' onClick={handleUpdateNote}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my3">
                <h2 className="my-4">Your Notes:</h2>
                <div className="container mx2">
                    {notes.length===0 && "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;