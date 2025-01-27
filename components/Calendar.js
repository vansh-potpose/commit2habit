'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import EditableText from './EditableText';
import service from '@/app/appwrite/services';

const Calendar = ({ tasks, setTasks }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().format('D-M-YY'));
  const today = dayjs().format('D-M-YY');

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const days = [...Array(42)].map((_, index) => {
    const day = index - startDay + 1;
    const date =
      day > 0 && day <= daysInMonth
        ? currentDate.date(day).format('D-M-YY')
        : null;
    return { day, date };
  });

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const toggleTaskCompletion = (taskIndex) => {
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        isCompleted: !updatedTasks[taskIndex].isCompleted,
      };
  
      // Save updated tasks
      service
        .updateTasks({ ...prev, [selectedDate]: updatedTasks })
        .catch((error) => {
          console.error('Error saving tasks:', error);
        });
  
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };
  
  const updateTaskName = (taskIndex, newName) => {
    if (!newName.trim()) return; // Prevent empty task names
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks[taskIndex].name = newName;
  
      // Save updated tasks
      service
        .updateTasks({ ...prev, [selectedDate]: updatedTasks })
        .catch((error) => {
          console.error('Error saving tasks:', error);
        });
  
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };
  
  const deleteTask = (taskIndex) => {
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks.splice(taskIndex, 1);
  
      // Save updated tasks
      service
        .updateTasks({ ...prev, [selectedDate]: updatedTasks })
        .catch((error) => {
          console.error('Error saving tasks:', error);
        });
  
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };
  
  const addTask = () => {
    setTasks((prev) => {
      const updatedTasks = [
        ...(prev[selectedDate] || []),
        { isCompleted: false, name: 'New Task' },
      ];
  
      // Save updated tasks
      service
        .updateTasks({ ...prev, [selectedDate]: updatedTasks })
        .catch((error) => {
          console.error('Error saving tasks:', error);
        });
  
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };
  

  const areAllTasksCompleted = (daysTasks) => {
    return daysTasks.every((task) => task.isCompleted);
    return daysTasks.every((task) => task.isCompleted);
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 w-fit bg-black p-4 rounded-xl">
      {/* Calendar */}
      <div className="bg-black text-textColor border border-borderColor h-fit p-4 rounded-xl max-w-md shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-textColor hover:text-linkColor transition-transform transform hover:scale-110 duration-200"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold tracking-wide text-[#c9d1d9]">
            {currentDate.format('MMMM YYYY')}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-textColor hover:text-linkColor transition-transform transform hover:scale-110 duration-200"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-xs font-bold text-center uppercase text-svgColor tracking-wide"
            >
              {day}
            </div>
          ))}
          {days.map((dayObj, index) => {
            const isToday = dayObj.date === today;
            const isSelected = dayObj.date === selectedDate;
            const dayTasks = tasks[dayObj.date] || [];

            return (
              <div
                key={index}
                onClick={() => {
                  if (!dayObj.date) return;
                  setSelectedDate(dayObj.date);
                }}
                className={`h-10 w-10 flex items-center justify-center rounded-lg relative shadow-inner ${
                  dayObj.date
                    ? 'bg-[#1e222a] text-[#c9d1d9] border border-[#30363d]'
                    : ''
                } ${
                  isToday ? 'bg-[#21262d] text-white font-bold border-[#58a6ff]' : ''
                } ${
                  isSelected
                    ? 'bg-[#004d40] text-white font-bold border-[#3cb371]'
                    : ''
                } ${
                  dayTasks.length > 0 ? areAllTasksCompleted(dayTasks)
                  ? 'border-[#3cb371]'
                  : 'border-[#ffcc00]' : ''
                } hover:bg-[#30363d] hover:text-[#c9d1d9] transition duration-300 ease-in-out transform hover:scale-105`}
                title={
                  dayTasks.length > 0
                    ? dayTasks.map((task) => task.name).join('\n')
                    : ''
                }
              >
                {dayObj.day > 0 && dayObj.day <= daysInMonth ? dayObj.day : ''}
                {dayTasks.length > 0 && (
                  <div
                    className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${
                      areAllTasksCompleted(dayTasks)
                        ? 'bg-[#3cb371]'
                        : 'bg-[#ffcc00]'
                    }`}
                  ></div>
                  <div
                    className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${
                      areAllTasksCompleted(dayTasks)
                        ? 'bg-[#3cb371]'
                        : 'bg-[#ffcc00]'
                    }`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="TaskList p-4 xs:w-96 bg-[#0d1117] text-[#c9d1d9] border border-borderColor rounded-xl shadow-lg flex-1">
        <div className="TaskList__header text-lg font-bold mb-4">
          Tasks for {selectedDate || 'No date selected'}
        </div>
        <div>
          {(tasks[selectedDate] || []).map((task, index) => (
            <div
              key={`${selectedDate}-${index}`} // Ensure a unique key for each task
              className="TaskList__task flex items-center gap-2 mb-2"
            >
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTaskCompletion(index)}
              />
              <EditableText
                value={task.name}
                onChange={(newName) => updateTaskName(index, newName)}
                key={`${selectedDate}-${index}`} // Force re-render on date switch
                className={`flex-1 bg-transparent outline-none border-none ${
                  task.isCompleted ? 'line-through text-gray-500' : 'text-white'
                }`}
              />
              <button
                onClick={() => deleteTask(index)}
                className="text-xs text-red-500 hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#ef4444"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </div>
          ))}
          {!(tasks[selectedDate] || []).length && (
            <div className="text-sm text-[#8b949e]">No tasks for today</div>
          )}
          <button
            onClick={addTask}
            className="bg-[#2d333b] hover:bg-[#3c444d] text-white py-2 px-4 mt-4 rounded-xl w-full"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
