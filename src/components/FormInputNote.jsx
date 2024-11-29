import { Component } from "react";
import AppButton from "./AppButton";
import RichTextEditor from "./RichTextEditor";
import { useState } from "react";
import PropTypes from "prop-types";

function FormInputNote({ onSave, isLoading }) {
  const maxLength = 60;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleOnchangeTitle(event) {
    const title = event.target.value;
    if (title.length > maxLength) {
      return;
    }
    setTitle(title);
  }

  function handleOnChangeBody(value) {
    const textBody = value.plainText;
    setBody(textBody);
  }

  function handleOnSave() {
    //add validation
    if (!title.trim() || !body.trim()) {
      alert("Title and body are required");
      return;
    }
    onSave({ title, body });
    //clear the form
    setTitle("");
    setBody("");
  }

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleOnchangeTitle}
        className="p-2 rounded-md bg-slate-50 border border-x-neutral-200"
        disabled={isLoading}
      />
      <p className="text-lg font-semibold self-end mb-2">
        {title.length}/{maxLength}
      </p>
      <RichTextEditor
        onChange={handleOnChangeBody}
        value={body}
        readOnly={isLoading}
      />
      <AppButton
        className={"self-end"}
        label="Save"
        onClick={handleOnSave}
        disabled={isLoading}
      />
    </div>
  );
}

export default FormInputNote;

FormInputNote.propTypes = {
  onSave: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
