'use client';
import React, { useState, useEffect } from 'react';
import Habit from './Habit';
import EditHabit from './EditHabit';
import EditableText from './EditableText';

const HabitContainer = ({ template = { habits: [] }, updateHabit, updateSelectedTemplate, saveDailyProgress }) => { // Default value for `template`
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [edit_template, setEdit_template] = useState(template);
 

  useEffect(() => {
    setEdit_click_points(template.click_points || 0); // Sync when template changes
    setEdit_template(template);
  }, [template, isEditing]);


  const setEdit_click_points = (value) => {
    if (value < 0) value = 0;
    if (value > 99) value = 99;
    setEdit_template((prev) => ({ ...prev, click_points: value }));
  };



  const save = async () => {
    if (!isEditing) {
      // Save Daily Progress
      try {
        setIsSaving(true);
        await saveDailyProgress(template); // Save progress using the provided function
        
      } catch (error) {
        console.error("Error saving daily progress:", error);
    
      }
      setIsSaving(false);
    } else {
      // Save Template
      try {
        setIsSaving(true);
        await updateSelectedTemplate(edit_template); // Save the edited template
      } catch (error) {
        console.error("Error saving template:", error);
      }
      setIsSaving(false);
    }
  };


  const removeHabit = (habitId) => {
    setEdit_template((prev) => {
      const habitToRemove = prev.habits.find((habit) => habit.id === habitId);

      if (!habitToRemove) {
        console.log("Habit not found.");
        return prev; // Return the previous state if the habit is not found
      }

      const updatedTemplate = {
        ...prev,
        max_points: prev.max_points - habitToRemove.target,
        total_points: prev.total_points - habitToRemove.current,
        habits: prev.habits.filter((habit) => habit.id !== habitId),
      };

      return updatedTemplate; // Return the updated state
    });
  };


  const handleUpdate = (habitId, updates) => {
    setEdit_template((prev) => {
      const updatedHabits = prev.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updates } : habit
      );

      // Recalculate total_points and max_points
      const total_points = updatedHabits.reduce((sum, habit) => sum + habit.current, 0);
      const max_points = updatedHabits.reduce((sum, habit) => sum + habit.target, 0);

      const updatedTemplate = {
        ...prev,
        total_points,
        max_points,
        habits: updatedHabits,
      };

      return updatedTemplate; // Return the updated state
    }
    );
  };


  const addHabit = () => {
    setEdit_template((prev) => {
      const newHabit = {
        id: Date.now(),
        name: 'New Habit',
        description: 'Description',
        target: 0,
        current: 0,
      };

      const updatedTemplate = {
        ...prev,
        habits: [...prev.habits, newHabit],
      };

      return updatedTemplate; // Return the updated state
    }
    );
  };






  return (
    <div className="xl:w-1/2 w-full">
      <div className="flex gap-2 pb-4 pt-2 justify-between flex-row-reverse">
        <div className="flex gap-2 xs:text-base text-sm ">
          <button
            className="bg-buttonColor border border-borderColor  hover:bg-[#262c36] text-white rounded-md font-medium xs:px-3 px-2 py-1"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Exit Editing' : 'Edit Template'}
          </button>
          {isSaving ? <div className="w-[132px] h-[34px]  flex items-center justify-center  bg-[#238636] border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium object-center overflow-hidden"><img className='w-[70px] scale-150' src='/lodingScreen-unscreen.gif'></img></div>:
          <button
            className="bg-[#238636] max-w-[132px]  border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium xs:px-3 px-2 py-1"
            onClick={save}  
          >
            {isEditing ? 'Save Template' : 'Save Progress'}
          </button>
        }
        </div>
        <div className="flex gap-2 xs:text-base text-sm">
          <button className="flex items-center bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium xs:px-3 px-2 py-1">
            Click points+:{' '}
            {!isEditing ? (
              <div className="text-gray-400 pl-2">{template.click_points}</div>
            ) : ( 
              <EditableText
                value={edit_template.click_points}
                onChange={(value) => setEdit_click_points(Number(value))}

                className="bg-transparent w-8 outline-none border-none text-gray-400 h-full"
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-track-rounded">

        {!isEditing
          ? template.habits?.map((habit) => ( // Optional chaining to handle undefined `habits`
            <Habit key={habit.id} habit={habit} click_points={template.click_points} updateHabit={updateHabit} />
          ))
          : edit_template.habits?.map((habit) => (
            <EditHabit
              key={habit.id}
              habit={habit}
              removeHabit={removeHabit}
              click_points={template.click_points}
              handleUpdate={handleUpdate}
            />
          ))}
        {isEditing && (
          <button
            className="bg-[#238636] w-fit px-10 py-2 mx-auto border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium"
            onClick={addHabit}
          >
            Add Habit
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitContainer;
