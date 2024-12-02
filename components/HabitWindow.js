'use client';
import React from 'react'
import { useState,useEffect } from 'react'
import HabitContainer from './HabitContainer'
import ProgressBar from './ProgressBar'
import LineChart from './LineChart'

const HabitWindow = () => {

  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const exampleData = [
    { date: '2024-10-01', value: 30, label: 'Data Point 1', extraInfo: 'Extra info for Data Point 1' },
    { date: '2024-10-02', value: 40, label: 'Data Point 2', extraInfo: 'Extra info for Data Point 2' },
    { date: '2024-10-03', value: 25, label: 'Data Point 3', extraInfo: 'Extra info for Data Point 3' },
    { date: '2024-10-04', value: 50, label: 'Data Point 4', extraInfo: 'Extra info for Data Point 4' },
    { date: '2024-10-05', value: 45, label: 'Data Point 5', extraInfo: 'Extra info for Data Point 5' },
    { date: '2024-10-06', value: 60, label: 'Data Point 6', extraInfo: 'Extra info for Data Point 6' },
    { date: '2024-10-07', value: 70, label: 'Data Point 7', extraInfo: 'Extra info for Data Point 7' },
    { date: '2024-10-08', value: 80, label: 'Data Point 8', extraInfo: 'Extra info for Data Point 8' },
    { date: '2024-10-09', value: 65, label: 'Data Point 9', extraInfo: 'Extra info for Data Point 9' },
    { date: '2024-10-10', value: 90, label: 'Data Point 10', extraInfo: 'Extra info for Data Point 10' },
    { date: '2024-10-11', value: 75, label: 'Data Point 11', extraInfo: 'Extra info for Data Point 11' },
    { date: '2024-10-12', value: 55, label: 'Data Point 12', extraInfo: 'Extra info for Data Point 12' },
    { date: '2024-10-13', value: 35, label: 'Data Point 13', extraInfo: 'Extra info for Data Point 13' },
    { date: '2024-10-14', value: 85, label: 'Data Point 14', extraInfo: 'Extra info for Data Point 14' },
    { date: '2024-10-15', value: 40, label: 'Data Point 15', extraInfo: 'Extra info for Data Point 15' },
    { date: '2024-10-16', value: 60, label: 'Data Point 16', extraInfo: 'Extra info for Data Point 16' },
    { date: '2024-10-17', value: 50, label: 'Data Point 17', extraInfo: 'Extra info for Data Point 17' },
    { date: '2024-10-18', value: 75, label: 'Data Point 18', extraInfo: 'Extra info for Data Point 18' },
    { date: '2024-10-19', value: 30, label: 'Data Point 19', extraInfo: 'Extra info for Data Point 19' },
    { date: '2024-10-20', value: 65, label: 'Data Point 20', extraInfo: 'Extra info for Data Point 20' },
    { date: '2024-10-21', value: 45, label: 'Data Point 21', extraInfo: 'Extra info for Data Point 21' },
    { date: '2024-10-22', value: 85, label: 'Data Point 22', extraInfo: 'Extra info for Data Point 22' },
    { date: '2024-10-23', value: 55, label: 'Data Point 23', extraInfo: 'Extra info for Data Point 23' },
    { date: '2024-10-24', value: 70, label: 'Data Point 24', extraInfo: 'Extra info for Data Point 24' },
    { date: '2024-10-25', value: 90, label: 'Data Point 25', extraInfo: 'Extra info for Data Point 25' },
    { date: '2024-10-26', value: 65, label: 'Data Point 26', extraInfo: 'Extra info for Data Point 26' },
    { date: '2024-10-27', value: 55, label: 'Data Point 27', extraInfo: 'Extra info for Data Point 27' },
    { date: '2024-10-28', value: 75, label: 'Data Point 28', extraInfo: 'Extra info for Data Point 28' },
    { date: '2024-10-29', value: 40, label: 'Data Point 29', extraInfo: 'Extra info for Data Point 29' },
    { date: '2024-10-30', value: 80, label: 'Data Point 30', extraInfo: 'Extra info for Data Point 30' },
    { date: '2024-10-31', value: 60, label: 'Data Point 31', extraInfo: 'Extra info for Data Point 31' }
  ];

 
  const [templates,setTemplates] = useState([
    {
      template_name: "Productivity Booster",
      click_points: 2,
      total_points: 10,
      max_points: 12,
      habits: [
        {
          id: 1,
          name: "Morning Exercise",
          description: "A 30-minute workout to energize your day.",
          target: 5,
          current: 3,
          message: "Felt great, but could push harder.",
        },
        {
          id: 2,
          name: "Read a Book",
          description: "Read at least 20 pages of a book.",
          target: 4,
          current: 4,
          message: "Completed the goal!",
        },
        {
          id: 3,
          name: "Plan the Day",
          description: "Write a to-do list for the day.",
          target: 3,
          current: 2,
          message: "Missed adding a few tasks.",
        },
      ],
    },
    {
      template_name: "Health Tracker",
      click_points: 1,
      total_points: 13,
      max_points: 15,
      habits: [
        {
          id: 4,
          name: "Drink Water",
          description: "Consume 8 glasses of water.",
          target: 5,
          current: 4,
          message: "Missed one glass.",
        },
        {
          id: 5,
          name: "Eat Fruits",
          description: "Have at least 2 servings of fruits.",
          target: 3,
          current: 3,
          message: "Managed to eat a banana and an apple.",
        },
        {
          id: 6,
          name: "Sleep 8 Hours",
          description: "Get a full night's rest.",
          target: 7,
          current: 6,
          message: "Slept late but still felt refreshed.",
        },
      ],
    },
    {
      template_name: "Skill Building",
      click_points: 5,
      total_points: 16,
      max_points: 20,
      habits: [
        {
          id: 7,
          name: "Practice Typing",
          description: "Spend 30 minutes practicing typing.",
          target: 4,
          current: 4,
          message: "Improved speed by 5 WPM!",
        },
        {
          id: 8,
          name: "Solve Coding Problems",
          description: "Solve 3 problems on the coding platform.",
          target: 10,
          current: 7,
          message: "Solved 2 problems successfully.",
        },
        {
          id: 9,
          name: "Learn New Skill",
          description: "Watch tutorials or read about a skill.",
          target: 6,
          current: 5,
          message: "Watched a video on web animations.",
        },
      ],
    },
  ]);

  useEffect(() => {
    setSelectedTemplate(templates[0]?.template_name);
    setTotalPoints(templates[0]?.total_points);
    setMaxPoints(templates[0]?.max_points);
  }, []);
  useEffect(() => {
    setTotalPoints(templates.find((template) => template.template_name === selectedTemplate)?.total_points);
    setMaxPoints(templates.find((template) => template.template_name === selectedTemplate)?.max_points);
  }, [selectedTemplate]);

  const updateHabit = (habitId, updates) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.template_name === selectedTemplate) {
          const updatedHabits = template.habits.map((habit) =>
            habit.id === habitId ? { ...habit, ...updates } : habit
          );

          // Recalculate total_points and max_points
          setTotalPoints(updatedHabits.reduce((sum, habit) => sum + habit.current, 0));
          setMaxPoints(updatedHabits.reduce((sum, habit) => sum + habit.target, 0));

          return {
            ...template,
            habits: updatedHabits,
            total_points: totalPoints,
            max_points: maxPoints,
          };
        }
        return template;
      })
    );
  };
  
  
  const selectedHabits = templates.find((template) => template.template_name === selectedTemplate)?.habits || [];
  const selectedT = templates.find((template) => template.template_name === selectedTemplate)|| {};
  const click_points = templates.find((template) => template.template_name === selectedTemplate)?.click_points || 1;

  return (
    <div className='m-auto  w-11/12 p-4'>
      <div className='border-b border-borderColor w-full my-2'>
        <select className='w-full text-left bg-transparent cursor-pointer outline-none appearance-none text-2xl px-2 py-1 font-bold text-white'
         value={selectedTemplate} onChange={(e) => {setSelectedTemplate(e.target.value)}}>
          <option value="" disabled>
            Select a Template
          </option>
          {templates.map((template, i) => (
            <option
              key={i}
              className='bg-background outline-none border border-borderColor'
              value={template.template_name}
            >
              {template.template_name}
            </option>
          ))}
        </select>
          <button className='bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1 ' onClick={()=>{console.log(selectedT)}}>
            Save
          </button>
      </div>
      <div className='flex justify-between  gap-6'>

        <HabitContainer habits={selectedHabits} click_points={click_points} updateHabit={updateHabit}/>
        <div className='w-1/2 mt-2 flex flex-col  items-center gap-2'>
          <ProgressBar score={totalPoints} maxScore={maxPoints} />
          <LineChart data={exampleData} />
        </div>

      </div>


    </div>
  )
}

export default HabitWindow
