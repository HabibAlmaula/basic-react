import NoteContainer from "../components/NoteContainer";
import SearchBar from "../components/SearchBar";
import HeaderApp from "../components/HeaderApp";

import { getAllNotes, deleteNote, archiveNote, unarchiveNote } from "../utils";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppButton from "../components/AppButton";

import { addNote } from "../routes/routes";

function Home() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (keyword) => {
    // Update the searchKeyword state
    setSearchParams({ keyword });
  };
  return (
    <>
      <HeaderApp />
      <div className="flex flex-row justify-between">
        <SearchBar onSearchChange={handleSearchChange} />
        <AppButton label="Add Note" onClick={() => navigate(addNote)} />
      </div>
      <NoteContainer searchKeyword={searchParams.get("keyword") ?? ""} />
    </>
  );
}

export default Home;
