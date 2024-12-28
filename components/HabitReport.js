import React from 'react'

const HabitReport = ({ habit }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    return (
        <div className="habit bg-background border border-borderColor p-4 rounded-md">
            <h2 className='font-bold text-white text-3xl'>{habit.name}</h2>
            <p className='text-sm text-gray-500'>{habit.description}</p>
            {!isExpanded ?
            
                <div className='flex items-center gap-2 mt-4'>
                    <p className='text-white text-lg font-semibold'>Observations : </p>
                    <p className='text-gray-400'>{habit.observations}</p>
                    <button onClick={() => setIsExpanded(true)} className='text-white text-linkColor'>Show More</button>
                </div> :



            <div className='mt-4 ml-4'>

                <h3 className='mb-2 font-semibold text-xl text-white'>Performance :</h3>
                <div className='ml-4 space-y-2'>

                    <p className='flex items-center gap-2'><p className="text-lg font-medium text-gray-200 ">Consistency : </p> {habit.performance.consistency}</p>
                    <h4 className="text-lg font-medium text-gray-200 ">Completion Stats :</h4>
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
                        <div className='flex items-center gap-2'>
                            <p className="text-white text-lg font-medium ">Best Day : </p>
                            <p className="">{habit.performance.bestDay}</p>

                        </div>
                        <div className='flex items-center gap-2'>

                            <p className="text-white text-lg font-medium">Lowest Day : </p>
                            <p className=" ">{habit.performance.lowestDay}</p>
                        </div>
                    </div>

                </div>
                <div className="mt-4">
                    <h3 className='text-xl text-white font-semibold'>Observations :</h3>
                    <p className='text-gray-400 ml-4'>{habit.observations}</p>

                    <div className="mt-4">
                        <p className="text-lg font-semibold text-white">Recommendations:</p>
                        <ul className="list-disc list-inside ml-6 space-y-2">
                            {habit.recommendations.map((rec, index) => (
                                <li key={index} className="text-gray-400">{rec}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button onClick={() => setIsExpanded(false)} className='text-white text-linkColor'>Show Less</button>
            </div>
                }

        </div>
    )
}

export default HabitReport
