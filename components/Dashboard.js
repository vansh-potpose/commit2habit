'use client'
import React from 'react'
import { useState } from 'react'

const Dashboard = () => {
    const [status, setStatus] = useState([
        { "ability": "problem solving skills", "current_points": 10 },
        { "ability": "daily pull-ups", "current_points": 5 },
        { "ability": "time management", "current_points": 8 },
        { "ability": "study", "current_points": 7 },
        { "ability": "typing speed", "current_points": 4 },
        { "ability": "habit tracking", "current_points": 6 }
    ])
    return (
        <div className='flex mx-auto'>
            <div className="profile_info">
                <div className="image_container w-80 h-80 rounded-full object-center overflow-hidden border border-borderColor mb-5">

                    <img className='object-contain' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f358078c-71d6-4c9c-8f8d-ee4c154fcc4b/delzpsb-9c75cdf2-eb11-46df-8436-066aaa45739a.png/v1/fill/w_1280,h_1627/jin_woo_profile_by_elsyjbn_300_delzpsb-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYyNyIsInBhdGgiOiJcL2ZcL2YzNTgwNzhjLTcxZDYtNGM5Yy04ZjhkLWVlNGMxNTRmY2M0YlwvZGVsenBzYi05Yzc1Y2RmMi1lYjExLTQ2ZGYtODQzNi0wNjZhYWE0NTczOWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.R5Ryaqcb7aCzvIXvVwaxcZhWQZAm_glpySzk8CbBnfY" alt="profile" />
                </div>
                <h1 className='name font-semibold text-lg'>Sung Jin Woo</h1>
                <p>Title : Web Developer</p>
            </div>
            <div className="status m-5  ">
                <h1 className='font-semibold text-lg'>Status</h1>
                <div className="levels flex flex-col justify-center items-center">
                    <h1 className='text-7xl font-semibold text-white -mb-2'>19</h1>
                    <p className=''>Level</p>
                </div>
                <div className="points flex flex-wrap w-[530px] m-5 gap-4">

                    {status.map((item, index) => (
                        <div key={index} className=' border border-borderColor p-2 rounded-md w-64 flex justify-between items-center'>
                            <p className='font-semibold'>{item.ability} :</p>

                            <p>{item.current_points}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
