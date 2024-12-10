'use client';
import React from 'react'
import { useState,useEffect } from 'react'
import HabitContainer from './HabitContainer'
import ProgressBar from './ProgressBar'
import LineChart from './LineChart'
import service from '@/app/appwrite/services';
import auth from '@/app/appwrite/auth';

const HabitWindow = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [click_points, setClick_points] = useState(1);
  const setClick_points_temp = (value) => {
    const template = templates.find((template) => template.template_name === selectedTemplate);
    template.click_points = value;
    console.log(template.click_points,value);
    console.log(template.total_points)
    setClick_points(value);
    console.log(template.total_points)

  }
  
  const exampleData = [
    {
      date: '2025-02-01',
      template_id: 111,
      total_points: 13,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 4, message: 'Missed one glass.' },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3 },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
    {
      date: '2025-02-02',
      template_id: 112,
      total_points: 14,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 2, message: 'Only ate one orange today.' },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 7 },
      ],
    },
    {
      date: '2025-02-03',
      template_id: 113,
      total_points: 12,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 3 },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3, message: 'Had a mango and a kiwi.' },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
  ];

 
  // const [templates,setTemplates] = useState([
  //   {
  //     template_name: "Productivity Booster",
  //     template_id:"6757018b00188d2deea3",
  //     user_id:"6757018b00188d2deea3",
  //     click_points: 2,
  //     total_points: 10,
  //     max_points: 12,
  //     habits: [
  //       {
  //         id: 1,
  //         name: "Morning Exercise",
  //         description: "A 30-minute workout to energize your day.",
  //         target: 5,
  //         current: 3,
  //         message: "Felt great, but could push harder.",
  //       },
  //       {
  //         id: 2,
  //         name: "Read a Book",
  //         description: "Read at least 20 pages of a book.",
  //         target: 4,
  //         current: 4,
  //         message: "Completed the goal!",
  //       },
  //       {
  //         id: 3,
  //         name: "Plan the Day",
  //         description: "Write a to-do list for the day.",
  //         target: 3,
  //         current: 2,
  //         message: "Missed adding a few tasks.",
  //       },
  //     ],
  //   },
  //   {
  //     template_name: "Health Tracker",
  //     user_id:"6757018b00188d2deea3",
  //     template_id:"675701ae0005e5d8b656",
  //     click_points: 1,
  //     total_points: 13,
  //     max_points: 15,
  //     habits: [
  //       {
  //         id: 4,
  //         name: "Drink Water",
  //         description: "Consume 8 glasses of water.",
  //         target: 5,
  //         current: 4,
  //         message: "Missed one glass.",
  //       },
  //       {
  //         id: 5,
  //         name: "Eat Fruits",
  //         description: "Have at least 2 servings of fruits.",
  //         target: 3,
  //         current: 3,
  //         message: "Managed to eat a banana and an apple.",
  //       },
  //       {
  //         id: 6,
  //         name: "Sleep 8 Hours",
  //         description: "Get a full night's rest.",
  //         target: 7,
  //         current: 6,
  //         message: "Slept late but still felt refreshed.",
  //       },
  //     ],
  //   },
  //   {
  //     template_name: "Skill Building",
  //     user_id:"6757018b00188d2deea3",
  //     template_id:"675701b10039f852ddec",
  //     click_points: 5,
  //     total_points: 16,
  //     max_points: 20,
  //     habits: [
  //       {
  //         id: 7,
  //         name: "Practice Typing",
  //         description: "Spend 30 minutes practicing typing.",
  //         target: 4,
  //         current: 4,
  //         message: "Improved speed by 5 WPM!",
  //       },
  //       {
  //         id: 8,
  //         name: "Solve Coding Problems",
  //         description: "Solve 3 problems on the coding platform.",
  //         target: 10,
  //         current: 7,
  //         message: "Solved 2 problems successfully.",
  //       },
  //       {
  //         id: 9,
  //         name: "Learn New Skill",
  //         description: "Watch tutorials or read about a skill.",
  //         target: 6,
  //         current: 5,
  //         message: "Watched a video on web animations.",
  //       },
  //     ],
  //   },
  // ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await service.getTemplates();
        console.log(response);
        if (response && Array.isArray(response.documents)) {
          const templatesData = response.documents;
          console.log(templatesData);
          setTemplates(templatesData);
          setSelectedTemplate(templatesData[0]?.template_name || '');
          setTotalPoints(templatesData[0]?.total_points || 0);
          setMaxPoints(templatesData[0]?.max_points || 0);
          setClickPoints(templatesData[0]?.click_points || 1);
        } else {
          console.error('Fetched data is not in the expected format:', response);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const template = templates.find((template) => template.template_name === selectedTemplate);
    setTotalPoints(template?.total_points);
    setMaxPoints(template?.max_points);
    setClick_points(template?.click_points || 1);
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

  const addHabit = () => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.template_name === selectedTemplate) {
          return {
            ...template,
            habits: [...template.habits, { id: template.habits.length + 1, name: '', description: '', target: 0, current: 0, message: '' }],
          };
        }
        return template;
      })
    );
  };

  const removeHabit = (habitId) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.template_name === selectedTemplate) {
          return {
            ...template,
            habits: template.habits.filter((habit) => habit.id !== habitId),
          };
        }
        return template;
      })
    );
  };
  
  const updateTemplate = ()=>{
    
  }

  const printTemplate= async ()=>{
    service.createTemplate({
      max_points: selectedT.max_points,
      total_points: selectedT.total_points,
      template_name: selectedT.template_name,
      click_points: selectedT.click_points,
      habits: selectedT.habits
    }).then((res)=>{
      console.log(res);
    })
    // service.getTemplates("user_0001").then((res)=>{
    //   console.log(res,"getTemplates");
    // }

    // )
    // service.getTemplate("template_0001").then((res)=>{
    //   console.log(res);
    // })
  }

  const updateSelectedTemplate = async () => {
    const template = templates.find((template) => template.template_name === selectedTemplate);
    console.log(template)
    const updatedTemplate = await service.updateTemplate({
      template_id: template.template_id,
      user_id: template.user_id,
      max_points: template.max_points,
      total_points: template.total_points,
      template_name: template.template_name,
      click_points: template.click_points,
      habits: template.habits,
    });

    if (updatedTemplate) {
      console.log('Template updated successfully:', updatedTemplate);
    } else {
      console.error('Failed to update template:', template);
    }
  }

  const selectedHabits = templates.find((template) => template.template_name === selectedTemplate)?.habits || [];
  const selectedT = templates.find((template) => template.template_name === selectedTemplate)|| {};

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
          <button className='bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1 ' onClick={()=>{printTemplate("user_0001")}}>
            Save
          </button>
      </div>
      <div className='flex justify-between  gap-6'>

        <HabitContainer updateSelectedTemplate={updateSelectedTemplate} habits={selectedHabits} setClick_points_temp={setClick_points_temp} removeHabit={removeHabit} addHabit={addHabit} click_points={click_points} updateHabit={updateHabit}/>
        <div className='w-1/2 mt-2 flex flex-col  items-center gap-2'>
          <ProgressBar score={totalPoints} maxScore={maxPoints} />
          <LineChart data={exampleData} />
        </div>

      </div>

          

    </div>
  )
}

export default HabitWindow

