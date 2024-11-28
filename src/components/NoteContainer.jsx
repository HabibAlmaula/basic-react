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
import { useEffect } from "react";
import { useState } from "react";

const NoteContainer = ({ searchParams }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
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

  const handleTabSelect = (index) => {
    if (index === 0) {
      mutateActive(); // fetch active notes when the "Catatan Aktif" tab is selected
    } else if (index === 1) {
      mutateArchived(); // fetch archived notes when the "Arsip" tab is selected
    }
  };

  const onDelete = (noteId) => {
    setCurrentAction(() => () => deleteNoteAction(noteId));
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const onArchive = (noteId) => {
    setCurrentAction(() => () => archiveNoteAction(noteId));
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const onUnarchive = (noteId) => {
    setCurrentAction(() => () => unarchiveNoteAction(noteId));
    setCurrentNoteId(noteId);
    setIsDialogOpen(true);
  };

  const deleteNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await deleteNote(noteId);
    setIsLoadingAction(false);
    mutateActive(); // Update active notes after deleting
    mutateArchived(); // Update archived notes in case it was archived
    setIsDialogOpen(false); // Close dialog
  };

  const archiveNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await archiveNote(noteId);
    setIsLoadingAction(false);
    mutateActive(); // Update active notes
    mutateArchived(); // Update archived notes
    setIsDialogOpen(false); // Close dialog
  };

  const unarchiveNoteAction = async (noteId) => {
    setIsLoadingAction(true);
    await unarchiveNote(noteId);
    setIsLoadingAction(false);
    mutateActive(); // Update active notes
    mutateArchived(); // Update archived notes
    setIsDialogOpen(false); // Close dialog
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
          ) : activeNotes && activeNotes.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
              {activeNotes.data.map((note) => (
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
            <EmptyState message="Tidak ada catatan aktif yang tersedia" />
          )}
        </TabPanel>

        <TabPanel>
          {isLoadingArchived ? (
            <NoteLoader />
          ) : archivedError ? (
            <div>Error loading notes</div>
          ) : archivedNotes && archivedNotes.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
              {archivedNotes.data.map((note) => (
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
            <EmptyState message="Tidak ada catatan yang diarsipkan" />
          )}
        </TabPanel>
      </Tabs>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={currentAction}
        isLoading={isLoadingAction}
        message={`Are you sure you want to ${
          currentAction === deleteNoteAction
            ? "delete"
            : currentAction === archiveNoteAction
            ? "archive"
            : "unarchive"
        } this note?`}
      />
    </div>
  );
};

export default NoteContainer;
