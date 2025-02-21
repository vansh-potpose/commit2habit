'use client';
import React from 'react'
import LineChart from './LineChart'
import Heatmap from './Heatmap'
import Habit from './Habit';
import Calendar from './Calendar';
import Report from './Report';
import RadarChart from './RadarChart'

const ReportWindow = ({ DailyProgresses ,reportData,transformDataByHabitNames,template}) => {

  
  const transformedData = transformDataByHabitNames(DailyProgresses);
  // console.log(template.habits);
  
  // Extract habit names from the template
  const templateHabitNames = template.habits.map(habit => habit.name);
  
  const newTransformedData = {
    ...transformedData,
    habitTrends: Object.fromEntries(
      Object.entries(transformedData.habitTrends).filter(([habitName]) => 
        templateHabitNames.includes(habitName)
      )
    )
  };
  
  console.log(newTransformedData);

  



  return (
    <div className='mb-1'>

      <div className='sm:px-5 px-2'>

        <div className=' w-full overflow-x-auto  h-fit py-10 '>
          <div className=' min-w-[1000px] '>

          <LineChart exampleData={DailyProgresses} days={31} height="360px" />
          </div>
        </div>
        <div className=' w-full overflow-x-auto h-fit py-7 '>
          <div className='min-w-[1100px]'>

          <Heatmap reportData={newTransformedData} />
          </div>
        </div>

       <Report reportData={reportData} />
        
      </div>
          

    </div>
  )
}

export default ReportWindow
