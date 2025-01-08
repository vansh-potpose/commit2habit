import React from 'react';

const ProgressModal = ({ isOpen, onClose, totalPoints, maxPoints, label, onBack ,template}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  // Calculate the progress percentage
  const progress = (totalPoints / maxPoints) * 100;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50 border border-borderColor">
      <div className="bg-background text-white p-6 rounded-lg max-w-[600px] w-full relative max-h-screen overflow-y-auto ">
       

        <h2 className="text-2xl font-semibold mb-4">{label}</h2>
        <h2 className="mb-1">Template name : {template.template_name}</h2>
        
        <div className="flex items-center justify-between mb-2">
          <span>Total Points : {totalPoints}</span>
          <span>Max Points : {maxPoints}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="relative pt-1 mb-4">
          <div className="absolute z-10 flex w-full  items-center justify-center">
            <span className="text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="flex mb-2">
            <div
              className="relative flex mb-2 w-full rounded overflow-hidden bg-foreground"
              style={{ height: '20px' }}
            >
              <div
                className="absolute top-0 left-0 h-full   bg-green-600"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Optional message */}
        {progress === 100 && <p className="text-green-500 text-sm">Congratulations, you've completed all the goals!</p>}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-4xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className='flex flex-col gap-3' >
          {template.habits.map((habit, i) => (
            <div key={i} className="flex flex-col border border-borderColor px-2 rounded-md  py-2">
              <div className='flex items-center justify-between'>

              <span>{habit.name}</span>
              <span>{habit.current}/{habit.target}</span>
              </div>
              
                    
                    {habit.message && habit.message.length > 0 && ( <div className='flex gap-1 message text-white  text-sm'>message : <div className='text-textColor'>{habit.message}</div></div>)}    
                <div className="relative pt-1 mb-2">
                  <div className="flex">
                    <div
                      className="relative flex w-full rounded-full   bg-foreground"
                      style={{ height: '4px' }}
                    >
                      <div
                        className="absolute top-0 left-0 h-1 rounded-full bg-green-600"
                        style={{ width: `${(habit.current/habit.target)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

              
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProgressModal;
