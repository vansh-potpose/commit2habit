'use client';
import React, { useState } from 'react';

const Habit = (props) => {
  const [currentValue, setCurrentValue] = useState(Number(props.habit.current));
  const [isEditingMessage, setIsEditingMessage] = useState(false); 
  const [message, setMessage] = useState(props.habit.message || "");

  const handleClick_points = () => {

    let newValue = Number(currentValue) + props.click_points;

    if (newValue < 0 ){
      newValue=0;
    }
    
    newValue = Math.min(newValue, props.habit.target);
    setCurrentValue(newValue);
    props.updateHabit(props.habit.id, { current: newValue });
    
  };

  const handleChanges = (e) => {
    let newValue = Number(e.target.value);
    if (newValue < 0 ){
      newValue=0;
    }
    if(newValue > props.habit.target){
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
    <div className="flex border-borderColor border rounded-md min-w-[500px] justify-between items-center p-3">
      <div className="habitInfo text-sm flex flex-col gap-1" onClick={()=>{handleClick_points()}}>
        <div className="habitName flex items-center gap-3 text-white font-semibold text-base">
          <img src="/github-mark.svg" alt="habit icon" className="rounded-full w-8" />
          {props.habit.name}
        </div>
        <div className="habitDescription text-white">{props.habit.description}</div>
        {isEditingMessage ? (
          <div>
             Message:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSaveMessage}
            onBlur={handleSaveMessage}
            className=" w-80 text-sm bg-transparent outline-none rounded-md p-1"
            autoFocus
          />
          </div>
        ) : (
          props.habit.message && (
            <div className="message text-gray-500 text-sm">
              Message: {props.habit.message}
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
        { !isEditingMessage &&
        <button
          className="button border border-borderColor p-1 bg-buttonColor rounded-md text-sm"
          onClick={handleUpdateMessage}
        >
          Add message
        </button>
  }
      </div>
    </div>
  );
};

export default Habit;
