'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SvgText from './SvgText';
import auth from '@/app/appwrite/auth';
import Link from 'next/link';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await auth.getCurrentUser();
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error('Error checking user authentication:', error);
            }
        };

        checkUser();
    }, []);

    const logout = async () => {
        try {
            await auth.logout();
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <div className='bg-black flex items-center justify-between py-4 border-b border-borderColor text-sm font-light   px-5'>
            <div className="leftNav items-center flex it gap-4">
                <button className="p-2  rounded-md border border-borderColor">

                    <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--foreground)'>
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button>

                <Image src="/github-mark.svg" className='invert w-9 h-9' alt="Github Logo" width={50} height={50} />
                {user ? <p className="text-white flex gap-2"> <p className='text-textColor'>{user.name}</p>/ <p>Commit2Habit</p></p> : <p className="text-white">Commit2Habit</p>}
            </div>
            <div className="rightNav flex items-center gap-4">

                <SvgText
                    path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                    text="Habits"
                    link="/" />
                <SvgText
                    path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                    text="Reports"
                    link="/" />

                {user ? <button className="p-2  rounded-md border border-borderColor" onClick={logout}>
                    Logout
                </button> :
                <Link href="/login">
                    <button className="p-2  rounded-md border border-borderColor">
                        Login
                    </button>
                </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
