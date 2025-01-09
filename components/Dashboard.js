'use client'
import React, { use, useEffect } from 'react'
import { useState } from 'react'
import Challenges from './Challenges'
import RadarChart from './RadarChart'
import Calendar from './Calendar'

const Dashboard = ({ status, setStatus, changeCompletedChallenges, updateChallenge, deleteChallenge, addChallenge, user,profile_pic }) => {
    const [currentAbility, setCurrentAbility] = useState({})
    const [showingChallenges, setshowingChallenges] = useState(false)
    const [level, setLevel] = useState(0)

    
    useEffect(() => {
        if (Object.keys(currentAbility).length > 0) {
            setshowingChallenges(true)
        } else {
            setshowingChallenges(false)
        }
    }, [currentAbility])





    useEffect(() => {
        if (currentAbility.name) {
            const updatedAbility = status.find(
                (item) => item.name === currentAbility.name
            );
            setCurrentAbility(updatedAbility || {});
        }
        const lvl = Math.floor(
            Math.sqrt(
                status.reduce((acc, item) => acc + Math.pow(item.current_points, 2), 0) / 
                (status.length || 1) // Prevent division by 0 if status is empty
            )
        );
        setLevel(lvl);
    }, [status]);





    return (
        <div>

        <div className='flex justify-center w-screen items-start'>


            <div className={`flex mx-auto   justify-center ${showingChallenges ? ' flex-col items-center' : 'my-14'}`}>

                <div className={`profile_info flex ${showingChallenges ? "flex-row items-center gap-3 flex-grow w-full px-1" : "flex-col"} `}>


                        <img className={`image_container ${showingChallenges ? "w-16 h-16 mt-5" : "w-80 h-80"} rounded-full object-center overflow-hidden border border-borderColor mb-5 object-cover `} src={profile_pic||"/profile.png"} alt="profile" />
                        
                    <div className='flex flex-grow items-center justify-between' >
                        <div className='' >
                            <h1 className='name font-semibold text-lg'>{user.name}</h1>
                            <p className={`${showingChallenges ? "text-xs" : ""}`}>Title : {user.prefs.title}</p>
                        </div>
                        {showingChallenges && <h1 className='text-lg font-semibold'>lvl : {level}</h1>}
                    </div>
                    
                </div>
                <div>


                <div className={`status ${showingChallenges ? "" : "m-5"}`}>
                </div>
                    <h1 className='font-semibold text-2xl'>Status</h1>
                    {
                        !showingChallenges &&
                        <div className="levels w-full flex flex-col justify-center items-center">
                            <h1 className='text-7xl font-semibold text-white -mb-2'>{level}</h1>
                            <p className='text-center w-full'>LEVEL</p>
                        </div>
                    }

                    <div className={`points flex flex-wrap ${showingChallenges ? "w-96 " : "w-[660px] m-5"}  gap-4`}>
                        {status.map((item, index) => (
                            <div key={index} onClick={() => { setCurrentAbility(item) }} className={`${currentAbility.name == item.name ? "border-white " : ""} ${showingChallenges ? "w-full" : " w-80"} border border-borderColor p-3 rounded-md flex justify-between items-center`}>
                                <p className='font-semibold'>{item.name} :</p>
                                <p>{item.current_points}</p>
                            </div>
                        ))
                        }
                    </div>
                </div>
                
            
            </div>
            {
                showingChallenges &&
                <div className="challenges  min-w-[65%] min-h-full">
                    <Challenges setCurrentAbility={setCurrentAbility} currentAbility={currentAbility} addChallenge={addChallenge} deleteChallenge={deleteChallenge} updateChallenge={updateChallenge} changeCompletedChallenges={changeCompletedChallenges} challenges={currentAbility.challenges} />

                </div>}

                    </div>
                    
                    {/* {!showingChallenges &&
                        <div className='flex bg-black p-6 gap-5'>
                    <RadarChart data={status} />
                    <Calendar tasks={status} />
                    </div>
                    }
                     */}
        </div>
    )
}

export default Dashboard
