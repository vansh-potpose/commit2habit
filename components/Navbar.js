'use client';
import React, { useEffect, useState } from 'react';
import SvgText from './SvgText';
import auth from '@/app/appwrite/auth';
import Link from 'next/link';

const Navbar = ({ setCurrentPage, currentPage, user }) => {

    return (
        <div className='bg-black flex md:flex-row  md:items-center md:px-5 px-2 gap-4  flex-col justify-between py-4 border-b border-borderColor text-sm font-light  '>
            <div className="leftNav items-center flex it gap-4">
                {/* <button className="p-2  rounded-md border border-borderColor">

                    <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--foreground)'>
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button> */}


                {/* Use a plain <img> for the small static logo so it renders reliably from /public */}
                <img src="/icon2.jpg" className='w-9 h-9 object-cover' alt="Github Logo" width={36} height={36} />
                {user ? <p className="text-white flex gap-2"> <p className='text-textColor'>{user.name}</p>/ <p>Commit2Habit</p></p> : <p className="text-white">Commit2Habit</p>}
            </div>

            <div className="rightNav flex items-center md:gap-4 justify-between sm:justify-start ">

                <div className='relative hover:bg-buttonColor p-1 rounded-md ease-in-out duration-200' onClick={() => { setCurrentPage("dashboard") }}>
                    <SvgText
                        path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                        text="Dashboard" />
                    {currentPage == "dashboard" && <div className='absolute w-[calc(100%-7px)]  -bottom-1 h-[2px]  bg-orange-500'></div>}
                </div>
                <div className='relative hover:bg-buttonColor p-1 rounded-md ease-in-out duration-200' onClick={() => { setCurrentPage("habitwindow") }}>
                    <SvgText
                        path={"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"}
                        text="Habits" />
                    {currentPage == "habitwindow" && <div className='absolute w-[calc(100%-7px)]   -bottom-1 h-[2px]  bg-orange-500'></div>}
                </div>
                <div className='relative hover:bg-buttonColor p-1 rounded-md ease-in-out duration-200' onClick={() => { setCurrentPage("reportwindow") }}>
                    <SvgText
                        path={"M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"}
                        text="Reports" />
                    {currentPage == "reportwindow" && <div className='absolute w-[calc(100%-7px)]  -bottom-1 h-[2px]  bg-orange-500'></div>}
                </div>

                <div className=' relative hover:bg-buttonColor p-1 rounded-md ease-in-out duration-200' onClick={() => { setCurrentPage("settingswindow") }}>
                    <div className='flex items-center gap-2 mx-2 ' >
                        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--svg-color)'>
                            <path d={"M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"}></path>
                        </svg>
                        <p className="text-white sm:block hidden">{"Setting"}</p>

                    </div>
                    
                    {currentPage == "settingswindow" && <div className='absolute w-[calc(100%-7px)]  -bottom-1 h-[2px]  bg-orange-500'></div>}
                </div>


            </div>
        </div>
    );
};

export default Navbar;
