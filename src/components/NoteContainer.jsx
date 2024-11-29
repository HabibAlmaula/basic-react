import useSWR from "swr";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NoteItem from "./NoteItem";
import EmptyState from "./EmptyState";
import PropTypes from "prop-types";
import ConfirmationDialog from "./ConfirmationDialog";
import {
  getActiveNotes,
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import { NoteLoader } from "./NoteLoader";
import { useEffect, useMemo } from "react";
import { useState } from "react";

const NoteContainer = ({ searchKeyword }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentActionType, setCurrentActionType] = useState(null); // New state for tracking action type
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  // Fetch active notes and archived notes using SWR
  const {
    data: activeNotes,
    error: activeError,
    isLoading: isLoadingActive,
    mutate: mutateActive,
  } = useSWR("activeNotes", getActiveNotes, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  const {
    data: archivedNotes,
    error: archivedError,
    isLoading: isLoadingArchived,
    mutate: mutateArchived,
  } = useSWR("archivedNotes", getArchivedNotes, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  // Filter notes based on search keyword
  const filteredActiveNotes = useMemo(() => {
    if (!activeNotes?.data) return [];
    if (!searchKeyword) return activeNotes.data;

    return activeNotes.data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        note.body.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [activeNotes, searchKeyword]);

  const filteredArchivedNotes = useMemo(() => {
    if (!archivedNotes?.data) return [];
    if (!searchKeyword) return archivedNotes.data;

    return archivedNotes.data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        note.body.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [archivedNotes, searchKeyword]);

  const handleTabSelect = (index) => {
    if (index === 0) {
      mutateActive();
    } else if (index === 1) {
      mutateArchived();
    }
  };

  const onDelete = (noteId) => {
    setCurrentAction(() => () => deleteNoteAction(noteId));
    setCurrentActionType("delete"); // Set action type
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const onArchive = (noteId) => {
    setCurrentAction(() => () => archiveNoteAction(noteId));
    setCurrentActionType("archive"); // Set action type
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const onUnarchive = (noteId) => {
    setCurrentAction(() => () => unarchiveNoteAction(noteId));
    setCurrentActionType("unarchive"); // Set action type
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const deleteNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await deleteNote(noteId);
    setIsLoadingAction(false);
    mutateActive();
    mutateArchived();
    setIsDialogOpen(false);
  };

  const archiveNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await archiveNote(noteId);
    setIsLoadingAction(false);
    mutateActive();
    mutateArchived();
    setIsDialogOpen(false);
  };

  const unarchiveNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await unarchiveNote(noteId);
    setIsLoadingAction(false);
    mutateActive();
    mutateArchived();
    setIsDialogOpen(false);
  };

  useEffect(() => {
    mutateActive();
  }, []);

  return (
    <div>
      <Tabs onSelect={handleTabSelect}>
        <TabList>
          <Tab>Catatan Aktif</Tab>
          <Tab>Arsip</Tab>
        </TabList>

        <TabPanel>
          {isLoadingActive ? (
            <NoteLoader />
          ) : activeError ? (
            <div>Error loading notes</div>
          ) : filteredActiveNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
              {filteredActiveNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  date={note.createdAt}
                  body={note.body}
                  archived={note.archived}
                  onDelete={() => onDelete(note.id)}
                  onArchive={() => onArchive(note.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message={
                searchKeyword
                  ? `Tidak ada catatan yang cocok dengan "${searchKeyword}"`
                  : "Tidak ada catatan aktif yang tersedia"
              }
            />
          )}
        </TabPanel>

        <TabPanel>
          {isLoadingArchived ? (
            <NoteLoader />
          ) : archivedError ? (
            <div>Error loading notes</div>
          ) : filteredArchivedNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
              {filteredArchivedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  date={note.createdAt}
                  body={note.body}
                  archived={note.archived}
                  onDelete={() => onDelete(note.id)}
                  onUnarchive={() => onUnarchive(note.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message={
                searchKeyword
                  ? `Tidak ada catatan yang cocok dengan "${searchKeyword}"`
                  : "Tidak ada catatan yang diarsipkan"
              }
            />
          )}
        </TabPanel>
      </Tabs>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={currentAction}
        isLoading={isLoadingAction}
        message={`Are you sure you want to ${currentActionType} this note?`}
      />
    </div>
  );
};

NoteContainer.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
};

export default NoteContainer;
