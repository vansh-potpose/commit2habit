'use client';
import React from 'react'

const SvgText = ({path,text}) => {
  return (
    
    <div className='flex items-center gap-2 mx-2 ' >
      <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--svg-color)'>
        <path d={path}></path>
        </svg>
        <p className="text-white">{text}</p>

    </div>
    
  )
}

export default SvgText
