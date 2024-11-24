import { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import NoteItem from "./NoteItem";
import EmptyState from "./EmptyState";

class NoteContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { notes, onDelete, onArchive } = this.props;

    //separate active notes and archived notes
    const activeNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);

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
              <EmptyState message="Tidak ada catatan yang diarsipkan" />
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default NoteContainer;
