'use client';
import { useEffect, useState } from 'react';

const ProgressBar = ({ score, maxScore }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Set initial progress to zero to enable smooth transition on mount
    setTimeout(() => {
      const calculatedProgress = Math.floor((score / maxScore) * 100);
      setProgress(calculatedProgress);
    }, 100);
  }, [score, maxScore]);

  return (
    <div className="flex flex-col  p-2 w-full bg-background border border-borderColor rounded-md justify-center">
      <h3 className="text-white text-lg">Total Points:</h3>

    <div className="flex items-center gap-2 justify-center">

      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg width="160" height="160" className="relative">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#28a745', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7dd329', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle
            className="text-gray-700"
            cx="80"
            cy="80"
            r="60"
            fill="none"
            strokeWidth="15"
            stroke="currentColor"
          />
          <circle
            className="text-green-600 transition-all duration-700 ease-out"
            cx="80"
            cy="80"
            r="60"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="15"
            strokeDasharray={`${2 * Math.PI * 60}`}
            strokeDashoffset={`${2 * Math.PI * 60 * (1 - progress / 100)}`}
            style={{
              filter: 'drop-shadow(0 0 1px #28a745) drop-shadow(0 0 3px #28a745) blur(0px)',
              transition: 'stroke-dashoffset 1s ease-out',
            }}
            strokeLinecap="butt"
            transform="rotate(-90 80 80)"
          />
        </svg>
        <span className="absolute text-white text-xl font-semibold">{progress}%</span>
      </div>
      <div className="w-fit text-white">
        <p>Points Scored : <span>{score}</span></p>
        <p>Max Points : <span>{maxScore}</span></p>
      </div>
    </div>
    </div>

  );
};

export default ProgressBar;
