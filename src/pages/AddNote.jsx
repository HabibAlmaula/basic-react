import useSWR from "swr";
import { useNavigate, useLocation } from "react-router-dom";
import FormInputNote from "../components/FormInputNote";
import HeaderApp from "../components/HeaderApp";

import { addNote } from "../utils/network-data";
import { home } from "../routes/routes";

function AddNote() {
  const navigate = useNavigate();

  const handleOnSave = async (note) => {
    const { error } = await addNote(note);
    if (!error) {
      navigate(home);
    }
  };

  return (
    <>
      <HeaderApp />
      <FormInputNote onSave={handleOnSave} />
    </>
  );
}

export default AddNote;
