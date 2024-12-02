import React from 'react';
import Image from 'next/image';
import SvgText from './SvgText';

const Navbar = () => {
    return (
        <div className='bg-black flex items-center justify-between py-4 border-b border-borderColor text-sm font-light   px-2'>
            <div className="leftNav items-center flex it gap-4">
                <button className="p-2  rounded-md border border-borderColor">
                    
                    <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--foreground)'>
                        <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path>
                    </svg>
                </button>
               
                <Image src="/github-mark.svg" className='invert w-9 h-9' alt="Github Logo" width={50} height={50} />
                <p className="text-white ">Github</p>
            </div>
            <div className="rightNav flex items-center gap-4">
                <SvgText 
                path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                text="Sign In"
                link="/"/>
                <SvgText 
                path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                text="Habits"
                link="/"/>
                <SvgText 
                path={"M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"}
                text="Reports"
                link="/"/>
            </div>
        </div>
    );
};

export default Navbar;
