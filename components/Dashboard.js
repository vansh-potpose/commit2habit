'use client'
import React, { use, useEffect } from 'react'
import { useState } from 'react'
import Challenges from './Challenges'

const Dashboard = ({status,setStatus,changeCompletedChallenges,updateChallenge,deleteChallenge,addChallenge}) => {
    const [currentAbility, setCurrentAbility] = useState({})
    const [showingChallenges, setshowingChallenges] = useState(false)

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
    }, [status]);
    
    
    
    
    
    return (
        <div className='flex justify-center w-screen items-start'>


            <div className={`flex mx-auto   justify-center ${showingChallenges ? ' flex-col items-center' : 'my-14'}`}>

                <div className={`profile_info flex ${showingChallenges ? "flex-row items-center gap-3 flex-grow w-full px-1" : "flex-col"} `}>


                    <div className={`image_container ${showingChallenges? "w-16 h-16 mt-5" : "w-80 h-80"} rounded-full object-center overflow-hidden border border-borderColor mb-5`}>
                        <img className='object-contain' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f358078c-71d6-4c9c-8f8d-ee4c154fcc4b/delzpsb-9c75cdf2-eb11-46df-8436-066aaa45739a.png/v1/fill/w_1280,h_1627/jin_woo_profile_by_elsyjbn_300_delzpsb-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYyNyIsInBhdGgiOiJcL2ZcL2YzNTgwNzhjLTcxZDYtNGM5Yy04ZjhkLWVlNGMxNTRmY2M0YlwvZGVsenBzYi05Yzc1Y2RmMi1lYjExLTQ2ZGYtODQzNi0wNjZhYWE0NTczOWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.R5Ryaqcb7aCzvIXvVwaxcZhWQZAm_glpySzk8CbBnfY" alt="profile" />
                    </div>
                    <div className='flex flex-grow items-center justify-between' >
                        <div className='' >
                            <h1 className='name font-semibold text-lg'>Sung Jin Woo</h1>
                            <p className={`${showingChallenges ? "text-xs" : ""}`}>Title : Web Developer</p>
                        </div>
                        {showingChallenges && <h1 className='text-lg font-semibold'>lvl : 19</h1>}
                    </div>

                </div>

                <div className={`status ${showingChallenges? "":"m-5"}`}>
                    <h1 className='font-semibold text-2xl'>Status</h1>
                    {
                        !showingChallenges &&
                        <div className="levels w-full flex flex-col justify-center items-center">
                            <h1 className='text-7xl font-semibold text-white -mb-2'>19</h1>
                            <p className='text-center w-full'>LEVEL</p>
                        </div>
                    }

                    <div className={`points flex flex-wrap ${showingChallenges ? "w-96 " : "w-[660px] m-5"}  gap-4`}>
                        {status.map((item, index) => (
                            <div key={index} onClick={() => { setCurrentAbility(item) }} className={`${currentAbility.name==item.name ? "border-white ":""} ${showingChallenges ? "w-full": " w-80"} border border-borderColor p-3 rounded-md flex justify-between items-center`}>
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
                <div className="challenges  min-w-[65%] ">
                    <Challenges setCurrentAbility={setCurrentAbility} currentAbility={currentAbility} addChallenge={addChallenge} deleteChallenge={deleteChallenge} updateChallenge={updateChallenge} changeCompletedChallenges={changeCompletedChallenges} challenges={currentAbility.challenges} />

                </div>}
        </div>
    )
}

export default Dashboard
