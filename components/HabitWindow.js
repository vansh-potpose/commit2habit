'use client';
import React, { use } from 'react'
import { useState,useEffect } from 'react'
import HabitContainer from './HabitContainer'
import ProgressBar from './ProgressBar'
import LineChart from './LineChart'
import service from '@/app/appwrite/services';
import auth from '@/app/appwrite/auth';

const HabitWindow = (
  {templates, 
  selectedTemplateID, 
  setselectedTemplateID, 
  totalPoints, 
  maxPoints, 
  template, 
  DailyProgresses, 
  updateSelectedTemplate,  
  updateHabit,
  saveDailyProgress}
) => {
  


  return (
    <div className='m-auto  md:w-11/12 p-4 '>
      <div className='border-b border-borderColor w-full my-2'>
        <select className='w-full text-left bg-transparent cursor-pointer outline-none appearance-none md:text-2xl text-xl px-2 py-1 font-bold text-white'
         value={selectedTemplateID} onChange={(e) => {setselectedTemplateID(e.target.value)}}>
          <option className='max-w-full md:text-2xl text-base' value="" disabled>
            Select a Template
          </option>
          {templates.map((template, i) => (
            <option
              key={i}
              className='bg-background md:text-2xl text-base max-w-full outline-none border border-borderColor'
              value={template.template_id}
            >
              {template.template_name}
            </option>
          ))}
        </select>
         
      </div>
      <div className='flex xl:flex-row flex-col-reverse items-center xl:items-start xl:justify-between  gap-6'>

        <HabitContainer 
        template={template}
        updateSelectedTemplate={updateSelectedTemplate} 
        updateHabit={updateHabit}
        saveDailyProgress={saveDailyProgress}
        />

        <div className='xl:w-1/2 w-full mt-2  flex flex-col items-center gap-2'>
          <ProgressBar score={totalPoints} maxScore={maxPoints} />
          <LineChart exampleData={DailyProgresses} days={7} height={`${window.matchMedia('(max-width: 600px)').matches?"190px":"300px"}`} />
        </div>

      </div>
    </div>
  )
}

export default HabitWindow

