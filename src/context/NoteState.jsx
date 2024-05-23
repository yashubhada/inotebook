import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    // Alert
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    }

    const host = "http://localhost:5000";
    const AllNotes = []
    const [notes, setNotes] = useState(AllNotes);

    // fecth all Notes
    const getNotes = async () => {
        // API call
        const url = `${host}/api/notes/fetchNote`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setNotes(json)
        // End of API call
    }

    // Add note
    const addNote = async (title, description, tag) => {
        // API call
        const url = `${host}/api/notes/addNote`;
        const response = await fetch(url, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // End of API call
        const json = await response.json();
        setNotes([...notes, json]);
    }

    // Delete note
    const deleteNote = async (noteId) => {
        // API call
        const url = `${host}/api/notes/deleteNote/${noteId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        response.json();
        // End of API call
        const removeNote = notes.filter((e) => { return e._id !== noteId });
        setNotes(removeNote);
        showAlert("Note deleted successfully", "success");
    }

    // Update Note
    const editNote = async (noteId, title, description, tag) => {

        // API call
        const url = `${host}/api/notes/updateNote/${noteId}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        response.json();
        // End Of API call

        let parseNote = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < parseNote.length; index++) {
            const element = parseNote[index];
            if (element._id === noteId) {
                parseNote[index].title = title;
                parseNote[index].description = description;
                parseNote[index].tag = tag;
                break;
            }
        }
        setNotes(parseNote);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote, showAlert, alert }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState
