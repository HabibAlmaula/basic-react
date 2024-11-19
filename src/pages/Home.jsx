import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import HeaderApp from "../components/HeaderApp";

import { getInitialData } from "../utils";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AppButton from "../components/AppButton";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  //define notes state
  const [notes, setNotes] = useState(getInitialData());
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleDelete = (id) => {
    // Filter out the note with the specified id
    const updatedNotes = notes.filter((note) => note.id !== id);
    // Update the notes state
    setNotes(updatedNotes);
  };

  const handleArchive = (id) => {
    // Find the note with the specified id
    const note = notes.find((note) => note.id === id);
    // Update the archived property of the note
    note.archived = !note.archived;
    // Update the notes state
    setNotes([...notes]);
  };

  const handleSearchChange = (keyword) => {
    // Update the searchKeyword state
    setSearchParams({ keyword });
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

  // Handle incoming new note when navigating back from add-note
  useEffect(() => {
    if (location.state?.newNote) {
      const newNote = location.state.newNote;
      setNotes([...notes, newNote]);

      // Clear the location state to avoid duplicate additions on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <HeaderApp />
      <div className="flex flex-row justify-between">
        <SearchBar onSearchChange={handleSearchChange} />
        <AppButton
          label="Add Note"
          onClick={() =>
            navigate("/add-note", {
              state: { lastNoteId: notes[notes.length - 1].id },
            })
          }
        />
      </div>
      <NoteContainer
        notes={
          (searchParams.get("keyword") ?? "").trim() ? filteredNotes : notes
        }
        onDelete={handleDelete}
        onArchive={handleArchive}
      />
    </>
  );
}

export default Home;
