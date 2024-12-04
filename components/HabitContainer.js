'use client';
import React,{useState} from 'react';
import Habit from './Habit';
import EditHabit from './EditHabit';
import EditableText from './EditableText';

const HabitContainer = ({habits,click_points,updateHabit,removeHabit,addHabit ,setClick_points_temp}) => {
  // const [habits, sethabits] = useState(habits) 
  const [isEditing, setIsEditing] = useState(false);


  return (
    <div className='w-1/2'>
      <div className='flex gap-2 pb-4 pt-2 justify-between flex-row-reverse'>
        <div className='flex gap-2'>
          <button className='flex items-center bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1'>
            Click points+:{ !isEditing? <div className='text-gray-400 pl-2'>{click_points}</div>:<EditableText value={click_points} onChange={(value)=>{setClick_points_temp(value)}} className='bg-transparent w-8 outline-none border-none text-gray-400 h-full' />
} 
          </button>
          <button className='bg-[#238636] border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium px-3 py-1' onClick={()=>{console.log(habits)}}>
            Save {isEditing?"Template":""}
          </button>
        </div>
        <div className='flex gap-2'>
          <button className='bg-buttonColor border border-borderColor hover:bg-[#262c36] text-white rounded-md font-medium px-3 py-1' onClick={()=>{setIsEditing(!isEditing)}}>
            {isEditing?"Exit Editing":"Edit template"} 
          </button>
        </div>
      </div>
      
      <div className='flex  flex-col gap-3 scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded scrollbar-track-rounded'>
        
        {!isEditing ? habits.map((habit) => (
          <Habit key={habit.id} habit={habit} click_points={click_points} updateHabit={updateHabit} />
        )):
        habits.map((habit) => (
          <EditHabit key={habit.id} habit={habit}  removeHabit={removeHabit} click_points={click_points} updateHabit={updateHabit} />
        ))

        }
        {isEditing && <button className='bg-[#238636] w-fit px-10 py-2 mx-auto border border-borderColor hover:bg-[#29903b] text-white rounded-md font-medium ' onClick={()=>{addHabit()}}>
          Add Habit
        </button>}

        
      </div>
    </div>
  );
};

export default HabitContainer;
