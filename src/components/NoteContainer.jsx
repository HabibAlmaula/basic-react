import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NoteItem from "./NoteItem";
import EmptyState from "./EmptyState";
import PropTypes from "prop-types";

class NoteContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { notes, onDelete, onArchive, onUnArchive } = this.props;

    //separate active notes and archived notes
    let activeNotes = notes.filter((note) => !note.archived);
    let archivedNotes = notes.filter((note) => note.archived);

    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Catatan Aktif</Tab>
            <Tab>Arsip</Tab>
          </TabList>

          <TabPanel>
            {activeNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
                {activeNotes.map((note) => (
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
            {archivedNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 pb-5 gap-y-5 place-items-center">
                {archivedNotes.map((note) => (
                  <NoteItem
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    date={note.createdAt}
                    body={note.body}
                    archived={note.archived}
                    onDelete={() => onDelete(note.id)}
                    onUnarchive={() => onUnArchive(note.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState message="Tidak ada catatan yang diarsipkan" />
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default NoteContainer;

NoteContainer.propTypes = {
  notes: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnArchive: PropTypes.func,
}
