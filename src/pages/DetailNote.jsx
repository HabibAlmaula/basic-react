import useSWR from "swr";
import { useParams } from "react-router-dom";
import { getNote } from "../utils/network-data";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import HeaderApp from "../components/HeaderApp";
import NotFound from "./base/NotFound";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function DetailNote() {
  const { id } = useParams();
  const { data: note, error, isLoading, mutate } = useSWR(`/${id}`, getNote);
  return (
    <div className="w-full">
      <HeaderApp />
      {isLoading ? (
        <div className="flex mt-10 items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin object-contain text-2xl" />
        </div>
      ) : error ? (
        <div>Error loading note</div>
      ) : note ? (
        <>
          <div className="p-5">
            <h1 className="text-2xl font-bold">{note.data.title}</h1>
            <ReactQuill
              value={note.data.body}
              readOnly={true}
              theme="bubble"
              className="mt-5"
            />
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default DetailNote;
