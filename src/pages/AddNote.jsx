import { useNavigate, useLocation } from "react-router-dom";
import FormInputNote from "../components/FormInputNote";
import HeaderApp from "../components/HeaderApp";

import { addNote } from "../utils";

function AddNote() {
  const navigate = useNavigate();

  const handleOnSave = (note) => {
    addNote(note);
    navigate("/");
  };
  return (
    <>
      <HeaderApp />
      <FormInputNote onSave={handleOnSave} />
    </>
  );
}

export default AddNote;
