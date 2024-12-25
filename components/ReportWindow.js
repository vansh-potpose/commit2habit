import React from 'react'
import LineChart from './LineChart'

const ReportWindow = ({DailyProgresses}) => {
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
    

  return (
    <div>
        <div className=' w-full h-[80px] p-10'> 
            <LineChart exampleData={DailyProgresses} days={31} height="70px"  />
        </div>
    </div>
  )
}

export default ReportWindow
