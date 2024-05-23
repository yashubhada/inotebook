import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { showAlert, addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleChange = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note added successfully", "success")
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <h2 className='my-5'>Add Notes</h2>
            <form className='border p-4 rounded-3'>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} name="title" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={note.description} name="description" onChange={onchange}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" placeholder='Optional' className="form-control" value={note.tag} name="tag" onChange={onchange} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleChange}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote
