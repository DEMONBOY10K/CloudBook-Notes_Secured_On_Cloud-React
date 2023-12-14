import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context
    const { note ,updateNote} = props
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex alight-item-center">
                        <h5 className="card-title mx-2" style={{"flex": "auto"}}>{note.title}</h5>
                        <i className="fa-solid fa-pen-to-square" style={{"color": "#0a943f"}} onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid fa-trash" style={{"color": "#ff0000"}} onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem