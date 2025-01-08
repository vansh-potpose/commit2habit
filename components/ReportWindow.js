import React from 'react'
import LineChart from './LineChart'
import Heatmap from './Heatmap'
import Habit from './Habit';
import Calendar from './Calendar';
import Report from './Report';
import RadarChart from './RadarChart'

const ReportWindow = ({ DailyProgresses ,reportData,transformDataByHabitNames}) => {

  
  const transformedData = transformDataByHabitNames(DailyProgresses);

  



  return (
    <div className='mb-1'>

      <div className='px-5'>

        <div className=' w-full h-fit py-10 '>
          <LineChart exampleData={DailyProgresses} days={31} height="70px" />
        </div>
        <div className=' w-full h-fit py-7 '>
          <Heatmap reportData={transformedData} />
        </div>

       <Report reportData={reportData} />
        
      </div>
          

    </div>
  )
}

export default ReportWindow
