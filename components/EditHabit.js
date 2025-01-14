'use client';
import React, { useState } from 'react';
import EditableText from './EditableText';
import { useRef } from 'react';
import ModalConfirmation from './ModalConfirmation';

const EditHabit = ({ habit, handleUpdate, removeHabit }) => {
  const [currentTarget, setCurrentTarget] = useState(habit.target);



  const timeoutRef = useRef(null); // To track the long-press timer
  const [showModal, setShowModal] = useState(false);
  // Long-Press Handlers
  const handleTouchStart = () => {
    timeoutRef.current = setTimeout(() => {
      handleDelete(); // Trigger delete on long press
    }, 1000); // Adjust long-press duration
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current); // Cancel long-press if touch is released early
  };

  // Mouse support for desktop (optional)
  const handleMouseDown = () => {
    timeoutRef.current = setTimeout(() => {
      handleDelete(); // Trigger delete on long press
    }, 1000); // Same duration as touch
  };

  const handleMouseUp = () => {
    clearTimeout(timeoutRef.current); // Cancel long-press if mouse is released early
  };

  const handleTargetChange = (e) => {
    let newValue = Number(e.target.value);
    if (newValue < 0) newValue = 0;
    if (newValue > 99) newValue = 99;
    setCurrentTarget(newValue);
    if (newValue < habit.current) {
      handleUpdate(habit.id, { current: newValue });
    } else {

      handleUpdate(habit.id, { target: newValue });
    }
  };

  const handleDelete = () => {
    setShowModal(true); // Show modal for delete confirmation
  };

  const confirmDelete = () => {
    removeHabit(habit.id); // Call the remove function
    setShowModal(false); // Close the modal
  };

  return (
    <div       onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
className="flex border-borderColor border rounded-md xs:min-w-[500px] justify-between items-center p-3">

      <div className="text-sm flex flex-col gap-1">
        <div className="flex items-center gap-3 text-white font-semibold text-base">
          <img
            src="/icon.jpg"
            alt="habit icon"
            className="rounded-full w-8"
          />
          <EditableText
            value={habit.name}
            className="bg-transparent text-white outline-none border-none"
            onChange={(value) => handleUpdate(habit.id, { name: value })}
          />
        </div>
        <EditableText
          value={habit.description}
          className="text-white bg-transparent sm:w-96 outline-none border-none"
          onChange={(value) => handleUpdate(habit.id, { description: value })}
        />
      </div>

      {/* Points Section */}
      <div className="flex items-center min-w-fit gap-3 ">
        <div className='xs:text-base text-sm'>

          <span >Total Points:</span>
          <input
            type="number"
            value={currentTarget}
            onChange={handleTargetChange}
            className="text-right max-w-8 p-1  rounded-md text-base bg-transparent outline-none border-none"
          />
        </div>
        <button
          className="sm:flex hidden bg-red-500 text-white rounded-md px-2 py-1"
          onClick={() => handleDelete()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" heigh t="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
        </button>
      </div>
      <ModalConfirmation 
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        title="Delete Habit"
        message={`Are you sure you want to delete the habit "${habit.name}"?`}
      />
    </div>
  );
};

export default EditHabit;
