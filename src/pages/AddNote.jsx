import { useNavigate, useLocation } from "react-router-dom";
import FormInputNote from "../components/FormInputNote";
import HeaderApp from "../components/HeaderApp";

function AddNote() {
  const navigate = useNavigate();

  const location = useLocation();
  const lastNoteId = location.state?.lastNoteId;

  const handleOnSave = (note) => {
    const newNote = {
      ...note,
      archived: false,
      id: lastNoteId + 1,
      createdAt: new Date().toISOString(),
    };

    // Navigate back with the new note data
    navigate("/", {
      state: { newNote: newNote },
    });
  };
  return (
    <>
      <HeaderApp />
      <FormInputNote onSave={handleOnSave} />
    </>
  );
}

export default AddNote;
