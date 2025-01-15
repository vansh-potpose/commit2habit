'use client';
import React from 'react'
import CheckboxElement from './CheckboxElement'

const Challenges = ({ setCurrentAbility, currentAbility, deleteChallenge, challenges, changeCompletedChallenges, updateChallenge, addChallenge }) => {
    return (
        <div className='bg-black p-5 md:px-10 border-l border-borderColor md:min-h-[calc(100vh-71px)] min-h-screen' >
            <h1 className='font-semibold text-2xl flex justify-between items-center my-3'>
                <div className='group flex gap-4'>Challenges

                    <button onClick={() => { addChallenge(currentAbility.name) }} className=' group-hover:opacity-100 lg:opacity-0 opacity-100  ease-in-out duration-500 bg-green-500 text-white text-lg p-1  rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M427-427H180.78v-106H427v-246.22h106V-533h246.22v106H533v246.22H427V-427Z" /></svg></button>
                </div>
                <button onClick={() => setCurrentAbility({})} className='  text-white px-3  rounded-md font-medium text-3xl'>&times;</button>
            </h1>

            <div className="challenges_list w-full flex flex-col gap-3">
                {(!challenges || challenges.length === 0) && (
                    <p className="text-white text-center">No challenges yet</p>
                )}                
                {challenges && challenges.map((challenge, index) => (
                    !challenge.isCompleted &&
                    <CheckboxElement id={challenge.challenge_id} deleteChallenge={deleteChallenge} name={challenge.name} updateChallenge={updateChallenge} changeCompletedChallenges={changeCompletedChallenges} isCompleted={challenge.isCompleted} points={challenge.points} key={index} />
                ))}
                <div className='w-full h-1 border-white border-t-2'></div>
                {challenges && challenges.map((challenge, index) => (
                    challenge.isCompleted &&
                    <CheckboxElement id={challenge.challenge_id} deleteChallenge={deleteChallenge} name={challenge.name} updateChallenge={updateChallenge} changeCompletedChallenges={changeCompletedChallenges} isCompleted={challenge.isCompleted} points={challenge.points} key={index} />
                ))}
            </div>

        </div>
    )
}

export default Challenges
