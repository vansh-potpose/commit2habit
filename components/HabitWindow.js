'use client';
import React, { use } from 'react'
import { useState,useEffect } from 'react'
import HabitContainer from './HabitContainer'
import ProgressBar from './ProgressBar'
import LineChart from './LineChart'
import service from '@/app/appwrite/services';
import auth from '@/app/appwrite/auth';

const HabitWindow = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateID, setselectedTemplateID] = useState('')
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [click_points, setClick_points] = useState(1);
  const setClick_points_temp = (value) => {
    const template = templates.find((template) => template.template_id === selectedTemplateID);
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

 
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await service.getTemplates();
        console.log(response);
        if (response && Array.isArray(response.documents)) {
          const templatesData = response.documents;
          console.log(templatesData);
          setTemplates(templatesData);
          setselectedTemplateID(templatesData[0]?.template_id || '');
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
    const template = templates.find((template) => template.template_id === selectedTemplateID);
    setTotalPoints(template?.total_points);
    setMaxPoints(template?.max_points);
    setClick_points(template?.click_points || 1);
  }, [selectedTemplateID]);

  const updateHabit = (habitId, updates) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.template_id === selectedTemplateID) {
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

  const setCurrentTemplate = (template) => {
    setTemplates((prevTemplates) => {
      const newTemplates = prevTemplates.map((prevTemplate) =>
        prevTemplate.template_id === selectedTemplateID
          ? { ...prevTemplate, ...template }
          : prevTemplate
      );
  
      return newTemplates;
    });
  };
  
  
  useEffect(() => {
    const updatedTemplate = templates.find((t) => t.template_id === selectedTemplateID);
  }, [templates, selectedTemplateID]);
  


  const updateSelectedTemplate = async (template) => {
    setCurrentTemplate(template);

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

  const selectedHabits = templates.find((template) => template.template_id === selectedTemplateID)?.habits || [];
  const template = templates.find((template) => template.template_id === selectedTemplateID)|| {};

  return (
    <div className='m-auto  w-11/12 p-4'>
      <div className='border-b border-borderColor w-full my-2'>
        <select className='w-full text-left bg-transparent cursor-pointer outline-none appearance-none text-2xl px-2 py-1 font-bold text-white'
         value={selectedTemplateID} onChange={(e) => {setselectedTemplateID(e.target.value)}}>
          <option value="" disabled>
            Select a Template
          </option>
          {templates.map((template, i) => (
            <option
              key={i}
              className='bg-background outline-none border border-borderColor'
              value={template.template_id}
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

        <HabitContainer setCurrentTemplate={setCurrentTemplate} template={template} updateSelectedTemplate={updateSelectedTemplate} habits={selectedHabits} setClick_points_temp={setClick_points_temp} click_points={click_points} updateHabit={updateHabit}/>
        <div className='w-1/2 mt-2 flex flex-col  items-center gap-2'>
          <ProgressBar score={totalPoints} maxScore={maxPoints} />
          <LineChart data={exampleData} />
        </div>

      </div>

          

    </div>
  )
}

export default HabitWindow

