// components/Calendar.js
'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = ({tasks}) => {
   
      


  const [currentDate, setCurrentDate] = useState(dayjs());
  const today = dayjs().format('YYYY-MM-DD');

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const days = [...Array(42)].map((_, index) => {
    const day = index - startDay + 1;
    const date = currentDate.date(day).format('YYYY-MM-DD');
    return day > 0 && day <= daysInMonth ? { day, date } : null;
  });

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div
      className="bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] h-fit p-4 rounded-xl max-w-md shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="text-[#8b949e] hover:text-[#58a6ff] transition-transform transform hover:scale-110 duration-200"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold tracking-wide text-[#c9d1d9]">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button
          onClick={handleNextMonth}
          className="text-[#8b949e] hover:text-[#58a6ff] transition-transform transform hover:scale-110 duration-200"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-xs font-bold text-center uppercase text-[#8b949e] tracking-wide"
          >
            {day}
          </div>
        ))}
        {days.map((dayObj, index) => {
          const isToday = dayObj?.date === today;
          const dayTasks = dayObj
            ? tasks.flatMap(task => 
                task.challenges.filter(challenge => challenge.date === dayObj.date)
              )
            : [];
          return (
            <div
              key={index}
              className={`
                h-10 w-10 flex items-center justify-center
                rounded-lg relative
                shadow-inner
                ${dayObj ? "bg-[#1e222a] text-[#c9d1d9] border border-[#30363d]" : ""}
                ${isToday ? "bg-[#21262d] text-white font-bold border-[#58a6ff]" : ""}
                ${dayTasks.length > 0 ? "bg-[#004d40] text-[#c9d1d9] font-bold border-[#3cb371]" : ""}
                hover:bg-[#30363d] hover:text-[#c9d1d9] transition duration-300 ease-in-out transform hover:scale-105
              `}
              title={dayTasks.length > 0 ? dayTasks.map(task => task.name).join(', ') : ""}
            >
              {dayObj?.day || ""}
              {dayTasks.length > 0 && (
                <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#ffcc00]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
