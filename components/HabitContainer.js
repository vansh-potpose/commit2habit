'use client';
import React from 'react';
import Habit from './Habit';

const HabitContainer = ({habits,click_points,updateHabit}) => {
  // const [habits, sethabits] = useState(habits) 

  return (
    <div className='w-1/2'>
      <div className='flex gap-2 pb-4 pt-2 justify-between flex-row-reverse'>
        <div className='flex gap-2'>
          <button className='flex items-center bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1'>
            Click points+: <div className='text-gray-400 h-full'>{click_points}</div>
          </button>
          <button className='bg-[#238636] border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium px-3 py-1' onClick={()=>{console.log(habits)}}>
            Save
          </button>
        </div>
        <div className='flex gap-2'>
          <button className='bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1'>
            Edit template
          </button>
        </div>
      </div>
      
      <div className='flex  flex-col gap-3 scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-track-rounded'>
        {habits.map((habit) => (
          <Habit key={habit.id} habit={habit} click_points={click_points} updateHabit={updateHabit} />
        ))}
      </div>
    </div>
  );
};

export default HabitContainer;
