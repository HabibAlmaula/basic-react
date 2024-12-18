import { format } from "date-fns";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
function NoteItem({ id, title, date, body, archived, onDelete, onArchive, onUnarchive }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg text-left bg-slate-200 dark:bg-slate-800 border border-neutral-700 dark:border-neutral-400 max-w-[250px] max-h-[250px] min-h-[250px] min-w-[250px] flex flex-col">
      <div className="flex-grow px-5 py-2 cursor-pointer" onClick={() => navigate(`/detail/${id}`)}>
        <h2 className="text-lg font-bold text-slate-600 dark:text-slate-300">{title}</h2>
        <p className="text-sm text-slate-500 pb-3">
          {" "}
          {format(new Date(date), "EEEE, dd MMMM yyyy")}{" "}
        </p>
        {/* <div className="text-slate-500 line-clamp-4">{body}</div> */}
        <div className="text-slate-500 line-clamp-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }} />
      </div>

      <div className="flex w-full">
        {/* delete button */}
        <div
          className="flex-1 border border-neutral-700 text-red-800 py-2 cursor-pointer select-none hover:bg-red-600 transition-colors text-center rounded-bl-md"
          onClick={onDelete}
        >
          Delete
        </div>
        {/* archive button */}
        <div
          className="flex-1 border border-neutral-700 text-amber-600 py-2 cursor-pointer select-none hover:bg-blue-600 transition-colors text-center rounded-br-md"
          onClick={archived ? onUnarchive : onArchive}
        >
          {archived ? "Pindahkan" : "Arsipkan"}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};
