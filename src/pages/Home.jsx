import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import HeaderApp from "../components/HeaderApp";

import { getAllNotes, deleteNote, archiveNote, unarchiveNote } from "../utils";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppButton from "../components/AppButton";

function Home() {
  const navigate = useNavigate();

  //define notes state
  const [notes, setNotes] = useState(getAllNotes());
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleDelete = (id) => {
    deleteNote(id);
    setNotes(getAllNotes());
  };

  const handleArchive = (id) => {
    archiveNote(id);
    setNotes(getAllNotes());
  };

  const handleUnarchive = (id) => {
    unarchiveNote(id);
    setNotes(getAllNotes());
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
  };
  return (
    <>
      <HeaderApp />
      <div className="flex flex-row justify-between">
        <SearchBar onSearchChange={handleSearchChange} />
        <AppButton
          label="Add Note"
          onClick={() =>
            navigate(
              "/add-note"
              //   {
              //   state: { lastNoteId: notes[notes.length - 1].id },
              // }
            )
          }
        />
      </div>
      <NoteContainer
        notes={
          (searchParams.get("keyword") ?? "").trim() ? filteredNotes : notes
        }
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnArchive={handleUnarchive}
      />
    </>
  );
}

export default Home;
