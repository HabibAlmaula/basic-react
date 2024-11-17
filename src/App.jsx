import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import FormInputNote from "./components/FormInputNote";
import NoteContainer from "./components/NoteContainer";

// App.js or index.js
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";
import HeaderApp from "./components/HeaderApp";

function App() {
  // Set the default locale to Indonesian
  setDefaultOptions({ locale: id });

  //define notes state
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      createdAt: "2022-04-14T04:27:34.572Z",
    },
  ]);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchChange = (keyword) => {
    // Update the searchKeyword state
    setSearchKeyword(keyword);
    // search the notes title or body
    const tempFilteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(keyword.toLowerCase())
    );
    // Update the filteredNotes state
    setFilteredNotes(tempFilteredNotes);
    console.log(
      `Search keyword: ${keyword} || Filtered notes: ${JSON.stringify(
        tempFilteredNotes
      )}`
    );
  };

  const handleOnSave = (note) => {
    const newNote = {
      ...note,
      archived: false,
      id: notes.length + 1,
      createdAt: new Date().toISOString(),
    };
    // Add the new note to the notes state
    setNotes([...notes, newNote]);

    console.log(`New note added: ${JSON.stringify(newNote)}`);
    // Log the notes state
    console.log(`Notes state: ${JSON.stringify(notes)}`);
  };


  const handleDelete = (id) => {
    // Filter out the note with the specified id
    const updatedNotes = notes.filter((note) => note.id !== id);
    // Update the notes state
    setNotes(updatedNotes);
  }

  const handleArchive = (id) => {
    // Find the note with the specified id
    const note = notes.find((note) => note.id === id);
    // Update the archived property of the note
    note.archived = !note.archived;
    // Update the notes state
    setNotes([...notes]);
  }

  return (
    <>
    <HeaderApp />
      <FormInputNote onSave={handleOnSave} />
      <SearchBar onSearchChange={handleSearchChange} />
      <NoteContainer notes={searchKeyword.trim() ? filteredNotes : notes} onDelete={handleDelete} onArchive={handleArchive}/>
    </>
  );
}

export default App;
