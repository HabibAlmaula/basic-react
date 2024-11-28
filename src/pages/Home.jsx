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

  const handleSearchChange = (keyword) => {
    // Update the searchKeyword state
    setSearchParams({ keyword });
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
      <NoteContainer searchParams={searchParams} />
    </>
  );
}

export default Home;
