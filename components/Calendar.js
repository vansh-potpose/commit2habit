'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import EditableText from './EditableText';
import service from '@/app/appwrite/services';

const Calendar = () => {
  const [tasks, setTasks] = useState({});
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

  // Fetch tasks from the service
  useEffect(() => {
    const getTasks = async () => {
      try {
        const res = await service.getTasks();
        setTasks(res.tasks || {});
      } catch (error) {
        console.error('Error getting tasks:', error);
      }
    };

    getTasks();
  }, []);

  // Sync tasks with the backend
  useEffect(() => {
    const updateTasks = async () => {
      try {
        await service.updateTasks(tasks);
      } catch (error) {
        console.error('Error updating tasks:', error);
      }
    };

    updateTasks();
  }, [tasks]);

  const toggleTaskCompletion = (taskIndex) => {
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        isCompleted: !updatedTasks[taskIndex].isCompleted,
      };
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const updateTaskName = (taskIndex, newName) => {
    if (!newName.trim()) return; // Prevent empty task names
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks[taskIndex].name = newName;
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const deleteTask = (taskIndex) => {
    setTasks((prev) => {
      const updatedTasks = [...(prev[selectedDate] || [])];
      updatedTasks.splice(taskIndex, 1);
      return { ...prev, [selectedDate]: updatedTasks };
    });
  };

  const addTask = () => {
    setTasks((prev) => ({
      ...prev,
      [selectedDate]: [
        ...(prev[selectedDate] || []),
        { isCompleted: false, name: 'New Task' },
      ],
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 w-fit bg-black p-4 rounded-xl">
      {/* Calendar */}
      <div className="bg-black text-textColor border border-borderColor h-fit p-4 rounded-xl max-w-md shadow-lg">
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
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-xs font-bold text-center uppercase text-[#8b949e] tracking-wide"
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
                onClick={() =>{ if (!dayObj.date) return; 
                setSelectedDate(dayObj.date)}}
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
                  dayTasks.length > 0 ? 'border-[#3cb371]' : ''
                } hover:bg-[#30363d] hover:text-[#c9d1d9] transition duration-300 ease-in-out transform hover:scale-105`}
                title={
                  dayTasks.length > 0
                    ? dayTasks.map((task) => task.name).join('\n')
                    : ''
                }
              >
                {dayObj.day > 0 && dayObj.day <= daysInMonth ? dayObj.day : ''}
                {dayTasks.length > 0 && (
                  <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#ffcc00]"></div>
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
              key={index}
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
                className={`flex-1 bg-transparent outline-none border-none ${
                  task.isCompleted ? 'line-through text-gray-500' : 'text-white'
                }`}
              />
              <button
                onClick={() => deleteTask(index)}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
          {!(tasks[selectedDate] || []).length && (
            <div className="text-sm text-[#8b949e]">No tasks for this date.</div>
          )}
        </div>
        <button
          onClick={addTask}
          className="mt-4 px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-lg hover:bg-[#30363d] transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Calendar;
