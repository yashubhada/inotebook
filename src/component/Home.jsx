import React, { useContext } from 'react'
import Note from './Note'
import AddNote from './AddNote'
import NoteContext from '../context/noteContext';
import Alert from './Alert';

function Home() {
  const context = useContext(NoteContext);
  const { alert } = context;

  document.title = "iNoteBook | Home"
  return (
    <>
        <Alert alert={alert} />
        <AddNote />
        <Note />
    </>
  )
}

export default Home
