import Link from 'next/link'
import React from 'react'

const SvgText = ({path,text,link}) => {
  return (
    <Link href={link}>
    <div className='flex items-center gap-2 mx-2' >
      <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" fill='var(--border-color)'>
        <path d={path}></path>
        </svg>
        <p className="text-white">{text}</p>

    </div>
    </Link>
  )
}

export default SvgText
