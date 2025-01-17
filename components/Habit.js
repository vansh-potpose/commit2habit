'use client';
import React, { useState } from 'react';

const Habit = (props) => {
  const [currentValue, setCurrentValue] = useState(Number(props.habit.current));
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [message, setMessage] = useState(props.habit.message || "");

  const handleClick_points = () => {

    let newValue = Number(currentValue) + props.click_points;

    if (newValue < 0) {
      newValue = 0;
    }

    newValue = Math.min(newValue, props.habit.target);
    setCurrentValue(newValue);
    props.updateHabit(props.habit.id, { current: newValue });

  };

  const handleChanges = (e) => {
    let newValue = Number(e.target.value);
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > props.habit.target) {
      newValue = props.habit.target;
    }
    setCurrentValue(newValue);
    props.updateHabit(props.habit.id, { current: newValue });
  };

  const handleUpdateMessage = () => {
    setIsEditingMessage(!isEditingMessage);
  };

  const handleSaveMessage = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setIsEditingMessage(false);
      props.updateHabit(props.habit.id, { message });
    }
  };

  return (
    <div className="flex border-borderColor xs:gap-0 gap-1 border rounded-md xs:min-w-[500px] justify-between items-center p-3">
      <div className="habitInfo text-sm flex flex-col gap-1" onClick={() => { handleClick_points() }}>
        <div className="habitName flex items-center gap-3 text-white font-semibold text-base">
          <div className="overflow-hidden rounded-full w-8 h-8">

            <div className='flex items-center justify-center w-8 h-8 rounded-full'>
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill={currentValue==props.habit.target?"#12cb3f":"#4b5563"}><path d="M480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12 65 0 123 18.52t107.48 52.04l-66.37 67.37q-36.57-22.08-77.49-34.51-40.93-12.42-86.62-12.42-131.81 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54 131.8 0 224.47-92.54 92.66-92.55 92.66-224.59 0-16.48-1.76-32.97-1.76-16.48-5.28-32.05l74.32-74.33q11.48 32.72 17.6 67.55 6.12 34.82 6.12 71.7 0 85.01-32.12 159.44-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm-56.72-219.35L249.7-464.8l62.45-62.7 111.13 111.13 402.15-403.15 62.7 62.69-464.85 465.61Z"/></svg>
            </div>
          </div>
          {props.habit.name}
        </div>
        <div className="habitDescription w-fit overflow-ellipsis  text-white">{props.habit.description}</div>
        {isEditingMessage ? (
          <div>
            Note:
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSaveMessage}
              onBlur={handleSaveMessage}
              className=" text-sm bg-transparent outline-none rounded-md p-1"
              autoFocus
            />
          </div>
        ) : (
          props.habit.message && (
            <div className="message text-gray-500 text-sm">
              Note: {props.habit.message}
            </div>
          )
        )}
      </div>
      <div className="buttons ">
        <div className="flex items-center">
          <input
            type="number"
            min="0"
            onChange={handleChanges}
            value={currentValue}
            pattern="\d{1,3}"
            max={props.habit.target}
            placeholder="0"
            className="text-right max-w-8 p-1 rounded-md text-base bg-transparent outline-none"
          />
          <div className="text-white text-base">/ {props.habit.target}</div>
        </div>
        {!isEditingMessage &&
          <button
            className="button whitespace-nowrap border border-borderColor p-1 bg-buttonColor rounded-md text-sm"
            onClick={handleUpdateMessage}
          >
            Add Note
          </button>
        }
      </div>
    </div>
  );
};

export default Habit;
