import React, { useContext } from 'react';
import NoteContext from '../context/noteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    return (
        <>
            <div className='d-flex align-items-center justify-content-between m-0'>
                <h5>{props.title}</h5>
                <p><i className="fa-solid fa-tag text-primary"></i> {props.tag}</p>
            </div>
            <hr />
            <p className='mb-3 note-description'>{props.description}</p>
            <div className="d-flex align-items-center notes-items-button">
                <button className="btn btn-sm btn-danger" onClick={() => { deleteNote(props._id) }}><i className="fa-solid fa-trash"></i></button>
                <div className='mx-2'></div>
                <button className="btn btn-sm btn-warning" onClick={() => {props.updateNote(props.note)}}><i className="fa-solid fa-pen-to-square"></i></button>
            </div>
        </>
    )
}

export default NoteItem
