import { useParams } from "react-router-dom";
import { getNote } from "../utils";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import HeaderApp from "../components/HeaderApp";
import NotFound from "./base/NotFound";

function DetailNote() {
  const { id } = useParams();
  const [note] = useState(getNote(id));

  console.log(`DetailNote: ${JSON.stringify(note)}`);

  return (
    <div className="w-full">
      {note ? (
        <>
          <HeaderApp />
          <div className="bg-white p-5 rounded-md">
            <h1 className="text-2xl font-semibold mb-5">{note.title}</h1>
            <ReactQuill value={note.body} readOnly={true} theme={"bubble"} />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default DetailNote;
