"use client";
import React, { useState } from "react";
import EditableText from "./EditableText";

const OneEditText = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialValue);

  const handleSave = () => {
    onSave(text); // Perform the save action
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialValue); // Revert to the original value
    setIsEditing(false);
  };

  return (
    <div className="flex w-full justify-between items-center bg-bgColor p-2 rounded-md">
    {isEditing ? (
        <EditableText
        value={text}
        onChange={(value) => setText(value)}
        className="text-white bg-transparent"
        />
        ) : (
        <span
        className="cursor-pointer text-white bg-transparent"
        >
        {text || "Click to edit"}
        </span>
        )}
     
      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-1 hover:bg-blue-600 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default OneEditText;
