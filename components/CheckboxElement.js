'use client';
import React, { useEffect } from 'react'
import EditableText from './EditableText'
import { useState } from 'react'
import ModalConfirmation from './ModalConfirmation'

const CheckboxElement = ({ id, name, isCompleted, points, changeCompletedChallenges, updateChallenge, deleteChallenge }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(name);
    const [currentPoints, setCurrentPoints] = useState(points);
    const [current_state, setCurrent_state] = useState(isCompleted)
    const [showModal, setShowModal] = useState(false);
    

    useEffect(() => {
        setCurrentName(name)
        setCurrentPoints(points)
    }, [name, points])


    const handlePointsChange = (e) => {
        let value = e.target.value
        if (value < 0) value = 0
        if (value > 10000) value = 10000
        setCurrentPoints(value)
    }

    const handleSave = () => {
        updateChallenge(id, { name: currentName, points: currentPoints })
        setIsEditing(false)
    }
    const handleCancel = () => {
        setIsEditing(false)
        setCurrentName(name)
        setCurrentPoints(points)
    }
    const handleDelete = () => {
        setShowModal(true)
    }
    return (
        <div className='group challenge border border-borderColor p-3 rounded-md flex   justify-between  xl:flex-row md:flex-col md:gap-2 md:items-start sm:flex-row sm:items-center flex-col gap-2 items-start'>
            <div className="left flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => changeCompletedChallenges(id, !isCompleted)}
                    className="w-6 h-6 accent-green-600 text-white border-2 rounded-3xl border-gray-300"
                />

                <p className={`font-semibol  ${isCompleted && "line-through"}`}>
                    {isEditing ? <input type="text" value={currentName} onChange={(e) => setCurrentName(e.target.value)} className="bg-transparent " />
                        : currentName}
                </p>


            </div>
            <div className="right flex items-center gap-4  xl:flex-row md:flex-row-reverse sm:flex-row  flex-row-reverse">
                {isEditing ?
                    <div className='flex gap-4 '>

                        <div onClick={handleCancel} className='hover:bg-red-500 bg-borderColor  p-1 rounded-md  ease-in-out duration-200'>
                            Cancel
                        </div>
                        <div onClick={handleSave} className='w-14 text-center hover:bg-blue-500 p-1 bg-borderColor rounded-md ease-in-out duration-200'>
                            Save
                        </div>
                    </div> : <div className='flex gap-4 group-hover:opacity-100 opacity-0 ease-in-out duration-100'>

                        <div onClick={() => { handleDelete() }} className='hover:bg-red-500 bg-borderColor  p-1 rounded-md  ease-in-out duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" heigh t="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                        </div>
                        <div onClick={() => { setIsEditing(true) }} className='hover:bg-blue-500 p-1 bg-borderColor rounded-md ease-in-out duration-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none" /><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                        </div>
                    </div>


                }

                <p className='min-w-5  text-center'>
                    {isEditing ? <p className=' flex'><p className='xl:hidden md:block sm:hidden  block'>Points :</p><input type="number" value={currentPoints} onChange={(e) => handlePointsChange(e)} className="w-12 text-center bg-transparent outline-none" /></p>
                        : <p className=' flex gap-2'><p className='xl:hidden md:block sm:hidden  block'>Points :</p> {currentPoints}</p>}
                </p>
            </div>
            <ModalConfirmation
                isOpen={showModal}
                onConfirm={()=>{deleteChallenge(id)}}
                onCancel={() => setShowModal(false)}
                title="Delete Challenge"
                message={`Are you sure you want to delete the challenge "${currentName}"?`}
            />
        </div>
    )
}

export default CheckboxElement
