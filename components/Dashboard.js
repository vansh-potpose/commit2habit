'use client';
import React, { useEffect, useState } from 'react';
import Challenges from './Challenges';
import RadarChart from './RadarChart';
import Calendar from './Calendar';
import service from '@/app/appwrite/services';

const Dashboard = ({ status, setStatus, changeCompletedChallenges, updateChallenge, deleteChallenge, addChallenge, user, profile_pic 
  ,tasks, setTasks
}) => {
  const [currentAbility, setCurrentAbility] = useState({});
  const [showingChallenges, setshowingChallenges] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (Object.keys(currentAbility).length > 0) {
      setshowingChallenges(true);
    } else {
      setshowingChallenges(false);
    }
  }, [currentAbility]);

  useEffect(() => {
    if (currentAbility.name) {
      const updatedAbility = status.find((item) => item.name === currentAbility.name);
      setCurrentAbility(updatedAbility || {});
    }
    const lvl = Math.floor(
      Math.sqrt(
        status.reduce((acc, item) => acc + Math.pow(item.current_points, 2), 0) /
        (status.length || 1)
      )
    );
    setLevel(lvl);
  }, [status]);



  const [abilities, setAbilities] = useState([]);

 

  useEffect(() => {
    function transformAbilities(data) {
      // Map over the input data to create the desired output structure
      return data.map((item) => ({
        name: item.name, // Extract the name
        current_points: item.current_points, // Extract the current_points
      }));
    }
    const transformedData = transformAbilities(status);
    setAbilities(transformedData);
  }, [status]);




  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center overflow-x-hidden">
      <div className="flex justify-center w-full items-start">
        <div
          className={`flex mx-auto justify-center ${showingChallenges ? 'flex-col items-center' : 'md:flex-row flex-col md:my-14 my-8'}`}
        >
          <div
            className={`profile_info flex ${showingChallenges
                ? 'flex-row items-center gap-3 flex-grow w-full px-1'
                : 'md:flex-col md:gap-0 md:items-start md:px-0 flex-row gap-3 items-center px-1'
              }`}
          >
              <img
                className={`image_container ${showingChallenges ? 'w-16 h-16 mt-5' : 'md:w-80 md:h-80 md:mt-0 w-16 h-16'
                  } rounded-full object-center overflow-hidden border border-borderColor mb-5 object-cover`}
                src={typeof profile_pic === 'string' && profile_pic ? profile_pic : '/profile.jfif'}
                alt="profile"
                loading="lazy"
                onError={(e) => {
                  // If the src is invalid (object or failed to load), fallback to placeholder
                  console.warn('Profile image failed to load, falling back to placeholder', profile_pic);
                  e.currentTarget.src = '/profile.jfif';
                }}
              />
            <div className="flex flex-grow items-center justify-between">
              <div>
                <h1 className="name font-semibold text-lg">{user.name}</h1>
                <p className={`${showingChallenges ? 'text-xs' : 'md:text-base text-xs'}`}>
                  Title : {user?.prefs.title || 'None'}
                </p>
              </div>
              <h1 className={`${showingChallenges ? '' : 'md:hidden'} text-lg font-semibold`}>lvl : {level}</h1>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-2xl">Status</h1>
            <div
              className={`${!showingChallenges ? 'md:flex hidden' : 'hidden'} levels w-full flex flex-col justify-center items-center`}
            >
              <h1 className="text-7xl font-semibold text-white -mb-2">{level}</h1>
              <p className="text-center w-full">LEVEL</p>
            </div>
            <div className={`points flex flex-wrap ${showingChallenges ? 'md:w-96 w-80 m-5' : 'lg:w-[660px] w-80 m-5'} gap-4`}>
              {status.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentAbility(item);
                  }}
                  className={`${currentAbility.name == item.name ? 'border-white ' : ''
                    } ${showingChallenges ? 'w-full' : 'w-80'} border border-borderColor p-3 rounded-md flex justify-between items-center`}
                >
                  <p className="font-semibold">{item.name} :</p>
                  <p>{item.current_points}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showingChallenges && (
          <div className="challenges md:relative absolute md:min-w-[50%] xl:min-w-[65%] min-w-full min-h-full overflow-x-hidden">
            <Challenges
              setCurrentAbility={setCurrentAbility}
              currentAbility={currentAbility}
              addChallenge={addChallenge}
              deleteChallenge={deleteChallenge}
              updateChallenge={updateChallenge}
              changeCompletedChallenges={changeCompletedChallenges}
              challenges={currentAbility.challenges}
            />
          </div>
        )}
      </div>

        { !showingChallenges && 
      <div className="flex lg:flex-row lg:items-start flex-col items-center  gap-4 overflow-x-auto">
        <Calendar 
          tasks={tasks}
          setTasks={setTasks}
        />
        <RadarChart data={abilities} />
      </div>
}
    </div>
  );
};

export default Dashboard;
