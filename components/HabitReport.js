'use client';
import React from 'react'

const HabitReport = ({ habit }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <div className="habit bg-background border border-borderColor sm:p-4 p-2 rounded-md" onClick={() => setIsExpanded(!isExpanded)}>
            <h2 className='font-bold text-white sm:text-3xl text-xl'>{habit.name}</h2>
            <p className='text-sm text-gray-500'>{habit.description}</p>
            {!isExpanded ?
            
                <div className='flex sm:flex-row flex-col  sm:gap-2 gap-0 mt-4'>
                    <p className='text-white  font-semibold min-w-fit'>Observations :</p>
                    <p className='text-gray-400'>{habit.observations}</p>
                </div> :



            <div className='mt-4 sm:ml-4'>

                <h3 className='mb-2 font-semibold text-xl text-white'>Performance :</h3>
                <div className='sm:ml-4 space-y-2'>

                    <p className='flex sm:flex-row flex-col sm:items-center items-start sm:gap-2 text-gray-400'><p className="text-lg font-medium text-white min-w-fit">Consistency : </p> {habit.performance.consistency}</p>
                    <h4 className="text-lg font-medium text-white min-w-fit">Completion Stats :</h4>
                    <div className="mx-4 my-2 ">
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 font-bold text-lg">{habit.performance.completionStats.notCompleted}</span>
                            <p className="text-gray-400 text-sm">Not Completed</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500 font-bold text-lg">{habit.performance.completionStats.partiallyCompleted}</span>
                            <p className="text-gray-400 text-sm">Partially Completed</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500 font-bold text-lg">{habit.performance.completionStats.fullyCompleted}</span>
                            <p className="text-gray-400 text-sm">Fully Completed</p>
                        </div>
                    </div>


                    <div className="mt-4">
                        <div className='flex sm:flex-row flex-col sm:items-center items-start sm:gap-2 text-gray-400'>
                            <p className="text-white text-lg font-medium ">Best Day : </p>
                            <p className="">{habit.performance.bestDay}</p>

                        </div>
                        <div className='flex sm:flex-row flex-col sm:items-center items-start sm:gap-2 text-gray-400'>

                            <p className="text-white text-lg font-medium">Lowest Day : </p>
                            <p className=" ">{habit.performance.lowestDay}</p>
                        </div>
                    </div>

                </div>
                <div className="mt-4">
                    <h3 className='text-xl text-white font-semibold'>Observations :</h3>
                    <p className='text-gray-400 sm:ml-4'>{habit.observations}</p>

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-white">Recommendations:</p>
                        <ul className="list-disc list-inside  sm:ml-6 space-y-2">
                            {habit.recommendations.map((rec, index) => (
                                <li key={index} className="text-gray-400">{rec}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
                }

        </div>
    )
}

export default HabitReport
