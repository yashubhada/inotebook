import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Note = () => {
    const context = useContext(NoteContext);
    const { showAlert, notes, getNotes, editNote } = context;

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);


    const [note, setNote] = useState({ noteId: "", utitle: "", udescription: "", utag: "" })

    const handleChange = (e) => {
        e.preventDefault();
        editNote(note.noteId, note.utitle, note.udescription, note.utag);
        refClose.current.click();
        showAlert("Note Updeted successfully", "success");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const modalRef = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        modalRef.current.click();
        setNote({ noteId: currentNote._id, utitle: currentNote.title, udescription: currentNote.description, utag: currentNote.tag })
    }
    return (
        <>

            {/* Button trigger modal */}
            <button type="button" ref={modalRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update your note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.utitle} name="utitle" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="3" value={note.udescription} name="udescription" onChange={onchange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.utag} name="utag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.utitle.length < 5 || note.udescription.length < 5 || note.utag.length < 2} className="btn btn-primary" onClick={handleChange}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Over  */}

            <h3 className='my-5'>{notes?.length === 0 ? "No notes available" : "Your Notes :"}</h3>
            <div className="row d-flex g-3 mb-5">
                {
                    notes?.map((ary) => {
                        return (
                            <div className="col-12 col-md-4 main-col" key={ary._id}>
                                <div className="p-3 border rounded-3" style={{ height: "100%" }}>
                                    <NoteItem _id={ary._id} title={ary.title} description={ary.description} tag={ary.tag} date={ary.date} note={ary} updateNote={updateNote} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Note
