'use client';
import React, { use, useEffect, useState } from 'react';
import Habit from './Habit';
import EditHabit from './EditHabit';
import EditableText from './EditableText';

const HabitContainer = ({ template, habits, click_points, updateHabit, setClick_points_temp, updateSelectedTemplate }) => {
  const [template_temp, setTemplate] = useState({ ...template });
  const [isEditing, setIsEditing] = useState(false);


  // Update total and max points when habits change
  const updatePoints = () => {
    let temp = template_temp.habits;
    let total_points = temp.reduce((sum, habit) => sum + habit.current, 0);
    let max_points = temp.reduce((sum, habit) => sum + habit.target, 0);
    setTemplate((prev) => ({
      ...prev,
      total_points,
      max_points,
    }));
  };



  useEffect(() => {
    if (template_temp.habits) {

      updatePoints();
    }
  }, [template_temp.habits]);

  const updateTemplate = async () => {
    if (isEditing) {
      updateSelectedTemplate(template_temp);
    }
  };

  const removeHabit = (habitId) => {
    setTemplate((prev) => ({
      ...prev,
      habits: prev.habits.filter((habit) => habit.id !== habitId),
    }));
  };

  const addHabit = () => {
    const newHabit = {
      id: Date.now(), // Use a unique timestamp as the ID
      name: '',
      description: '',
      target: 0,
      current: 0,
      message: '',
    };

    setTemplate((prev) => ({
      ...prev,
      habits: [...prev.habits, newHabit],
    }));
  };

  const handleUpdate = (habitId, updates) => {
    setTemplate((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === habitId ? { ...habit, ...updates } : habit
      ),
    }));
  };



  useEffect(() => {

    setTemplate({ ...template });
    console.log(template_temp.template_name,template.template_name, "name ")
  
  }, [template, isEditing]); // Sync with parent `template` prop

  return (
    <div className="w-1/2">
      <div className="flex gap-2 pb-4 pt-2 justify-between flex-row-reverse">
        <div className="flex gap-2">
          <button
            className="bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Exit Editing' : 'Edit Template'}
          </button>
          <button
            className="bg-[#238636] border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium px-3 py-1"
            onClick={updateTemplate}
          >
            {isEditing ? 'Save Template' : 'Save Progress'}
          </button>
        </div>
        <div className="flex gap-2">


          <button className="flex items-center bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1">
            Click points+:{' '}
            {!isEditing ? (
              <div className="text-gray-400 pl-2">{click_points}</div>
            ) : (
              <EditableText
                value={click_points}
                onChange={(value) => setClick_points_temp(value)}
                className="bg-transparent w-8 outline-none border-none text-gray-400 h-full"
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-track-rounded">
        {isEditing && <div className="text-center text-lg font-semibold">
          <EditableText
            value={template_temp.template_name}
            className="text-white bg-transparent w-96 outline-none border-none"
            onChange={(value) => { setTemplate((prev) => ({ ...prev, template_name: value })) }}
          />
        </div>}
        {!isEditing
          ? habits.map((habit) => (
            <Habit key={habit.id} habit={habit} click_points={click_points} updateHabit={updateHabit} />
          ))
          :
          template_temp.habits.map((habit) => (
            <EditHabit
              key={habit.id}
              habit={habit}
              removeHabit={removeHabit}
              click_points={click_points}
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
