'use client';
import React, { useState } from 'react';
import EditableText from './EditableText';

const EditHabit = ({ habit, handleUpdate, removeHabit }) => {
  const [currentTarget, setCurrentTarget] = useState(habit.target);


  const handleTargetChange = (e) => {
    let newValue = Number(e.target.value);
    if (newValue < 0) newValue = 0;
    if (newValue > 99) newValue = 99;
    setCurrentTarget(newValue);
    if(newValue < habit.current){
      handleUpdate(habit.id, { current: newValue });
    }else{

      handleUpdate(habit.id, { target: newValue });
    }
  };

  const handleDelete = () => {
    const check=confirm(`Are you sure you want to delete the ( ${habit.name} ) habit?`);
    if(check){

      removeHabit(habit.id);
    }
  }

  return (
    <div className="flex border-borderColor border rounded-md min-w-[500px] justify-between items-center p-3">
      
      <div className="text-sm flex flex-col gap-1">
        <div className="flex items-center gap-3 text-white font-semibold text-base">
          <img
            src="/github-mark.svg"
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
          className="text-white bg-transparent w-96 outline-none border-none"
          onChange={(value) => handleUpdate(habit.id, { description: value })}
        />
      </div>

      {/* Points Section */}
      <div className="flex items-center gap-3">
        <div>

        <span>Total Points:</span>
        <input
          type="number"
          value={currentTarget}
          onChange={handleTargetChange}
          className="text-right max-w-8 p-1 pl-0 rounded-md text-base bg-transparent outline-none border-none"
          />
          </div>
        <button
          className="bg-red-500 text-white rounded-md px-2 py-1"
          onClick={() =>handleDelete()}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default EditHabit;
