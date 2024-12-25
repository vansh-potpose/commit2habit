'use client';
import Dashboard from "@/components/Dashboard";
import HabitWindow from "@/components/HabitWindow";
import ReportWindow from "@/components/ReportWindow";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import service from "./appwrite/services";


export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // loading initial data-----------------------------------------------------
  useEffect(() => {
    service.getAbilities().then((result) => {
      if (result) {
        setStatus(result.documents);
      }
    });

    async function fetchData() {
      try {
        const response = await service.getTemplates();
        
        if (response && Array.isArray(response.documents)) {
          const templatesData = response.documents;
          
          setTemplates(templatesData);
          setselectedTemplateID(templatesData[0]?.template_id || '');
          setTotalPoints(templatesData[0]?.total_points || 0);
          setMaxPoints(templatesData[0]?.max_points || 0);
        } else {
          console.error('Fetched data is not in the expected format:', response);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }
    fetchData();

    fetchDailyProgress();

  }, []);



  // dashbboard code part-----------------------------------------------------
  const [status, setStatus] = useState([]);






  const changeCompletedChallenges = (challenge_id, isCompleted) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        const updatedChallenges = ability.challenges.map((challenge) => {
          if (challenge.challenge_id === challenge_id) {
            if (challenge.isCompleted !== isCompleted) {
              // If status is changing (completed <=> incomplete), adjust current_points
              const pointChange = isCompleted ? challenge.points : -challenge.points;
              ability.current_points += pointChange; // Adjust the ability's current points

                service.updateAbility({
                  ability_id: ability.ability_id,
                  name: ability.name,
                  current_points: ability.current_points,
                  challenges: ability.challenges.map((ch) =>
                      ch.challenge_id === challenge_id
                          ? { ...ch, isCompleted }
                          : ch
                  ),
              });
            }
            return { ...challenge, isCompleted }; // Update the completion status
          }
          return challenge;
        });
        return { ...ability, challenges: updatedChallenges };
      })
    );
  };

  const updateChallenge = (challenge_id, updatedData) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        const updatedChallenges = ability.challenges.map((challenge) => {
          if (challenge.challenge_id === challenge_id) {
            let pointDifference = 0;

            // If the challenge is already completed, adjust points based on the updated points
            if (updatedData.points !== undefined && challenge.isCompleted) {
              pointDifference = updatedData.points - challenge.points;
            }

            // Update the challenge's points and adjust current_points if it's completed
            if (pointDifference !== 0) {
              ability.current_points += pointDifference;
            }

              service.updateAbility({
                ability_id: ability.ability_id,
                name: ability.name,
                current_points: ability.current_points,
                challenges: ability.challenges.map((ch) =>
                    ch.challenge_id === challenge_id
                        ? { ...ch, ...updatedData }
                        : ch
                ),
            });

            return { ...challenge, ...updatedData }; // Update the challenge data
          }
          return challenge;
        });
        return { ...ability, challenges: updatedChallenges };
      })
    );
  };

  const deleteChallenge = (challenge_id) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        const updatedChallenges = ability.challenges.filter(
          (challenge) => challenge.challenge_id !== challenge_id
        );
          service.updateAbility({
            ability_id: ability.ability_id,
            name: ability.name,
            current_points: ability.current_points,
            challenges: updatedChallenges,
        });

        return { ...ability, challenges: updatedChallenges };
      })
    );
  }

  const addChallenge = async (abilityName) => {
    try {
      // Prompt for the challenge name
      let name = prompt("Enter the name of the new challenge:");
      if (!name || name.trim() === "") {
        alert("Challenge name cannot be empty. Please try again.");
        return; // Exit if the user cancels or enters an invalid name
      }
      name = name.trim(); // Clean up any extra spaces
  
      // Prompt for the challenge points
      let pointsInput = prompt("Enter the points for the new challenge:");
      let points = parseInt(pointsInput);
      if (isNaN(points) || points <= 0) {
        alert("Invalid points. Please enter a positive number.");
        return; // Exit if the user cancels or enters an invalid number
      }
  
      const newChallenge = {
        challenge_id: Math.floor(Math.random() * 1000), // Generate a unique ID
        name: name,
        isCompleted: false,
        points: Number(points),
      };
  
      // Find the matching ability and add the challenge via the service
      const updatedStatus = await Promise.all(
        status.map(async (ability) => {
          if (ability.name === abilityName) {
            const updatedChallenges = [...ability.challenges, newChallenge];
            
            // Update the ability in the service
            await service.updateAbility({
              ability_id: ability.ability_id, // Ensure ability ID is part of your data model
              name: ability.name,
              current_points: ability.current_points, // No change in points initially
              challenges: updatedChallenges,
            });
  
            // Return the updated ability locally
            return { ...ability, challenges: updatedChallenges };
          }
          return ability; // Return unchanged abilities
        })
      );
  
      // Update local state after successfully updating the service
      setStatus(updatedStatus);
  
      alert(`New challenge "${name}" with ${points} points added successfully!`);
    } catch (error) {
      console.error("An error occurred while adding the challenge:", error);
      alert("Something went wrong while adding the challenge. Please try again.");
    }
  };


  







  // habitwindow code part-----------------------------------------------------
  const [templates, setTemplates] = useState([]);
  
  const [selectedTemplateID, setselectedTemplateID] = useState('')
  const [DailyProgresses, setDailyProgresses] = useState([]);
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  
  const template = templates.find((template) => template.template_id === selectedTemplateID)|| {};


  useEffect(() => {
    const template = templates.find((template) => template.template_id === selectedTemplateID);
    
    if (template) {
      setTotalPoints(template.total_points); // Optionally, keep this for controlled state
      setMaxPoints(template.max_points);    // Optionally, keep this for controlled state
    }
  }, [templates, selectedTemplateID]);
  
  


  const updateSelectedTemplate = async (template) => {
    setCurrentTemplate(template);
    
    const updatedTemplate = await service.updateTemplate({
      template_id: template.template_id,
      user_id: template.user_id,
      max_points: template.max_points,
      total_points: template.total_points,
      template_name: template.template_name,
      click_points: template.click_points,
      habits: template.habits,
    });
    
    if (updatedTemplate) {
      console.log('Template updated successfully:', updatedTemplate);
    } else {
      console.error('Failed to update template:', template);
    }
  }



  const setCurrentTemplate = (template) => {
    setTemplates((prevTemplates) => {
      const newTemplates = prevTemplates.map((prevTemplate) =>
        prevTemplate.template_id === selectedTemplateID
          ? { ...prevTemplate, ...template }
          : prevTemplate
      );
      return newTemplates;
    });
  };



  const updateHabit = (habitId, updates) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) => {
        if (template.template_id === selectedTemplateID) {
          const updatedHabits = template.habits.map((habit) =>
            habit.id === habitId ? { ...habit, ...updates } : habit
          );
  
          // Recalculate points locally
          const newTotalPoints = updatedHabits.reduce((sum, habit) => sum + habit.current, 0);
          const newMaxPoints = updatedHabits.reduce((sum, habit) => sum + habit.target, 0);
  
          // Update the template with recalculated values
          return {
            ...template,
            habits: updatedHabits,
            total_points: newTotalPoints,
            max_points: newMaxPoints,
          };
        }
        return template;
      })
    );
  };
  

  const saveDailyProgress = async (template) => {
    try {
      const data = await service.createDailyProgress({ template });
  
      if (data) {
        console.log('Daily progress saved successfully...');
  
        if (DailyProgresses.length > 31) {
          // Find the oldest date and delete it
          const oldestDate = DailyProgresses.reduce((prev, current) =>
            new Date(prev.date) < new Date(current.date) ? prev : current
          ).date;
          await service.deleteDailyProgress(oldestDate);
        }
  
        // Check if the date already exists in daily progress and update it, or add a new one
        const updatedDailyProgresses = DailyProgresses.some((dp) => dp.date === data.date)
          ? DailyProgresses.map((dp) => (dp.date === data.date ? data : dp))
          : [...DailyProgresses, data];
  
        setDailyProgresses(updatedDailyProgresses);
      } else {
        console.error('Failed to save daily progress...');
      }
    } catch (error) {
      console.error('An error occurred while saving daily progress:', error);
    }
  };
  


  const fetchDailyProgress = async () => {
    const data = await service.getDailyProgresses();
    if (data) {
      setDailyProgresses(data.documents);
      console.log('Daily progress fetched successfully:', data);
    } else {
      console.error('Failed to fetch daily progress...');
    }
  };



  // reportwindow code part-----------------------------------------------------
  const exampleData = [
    {
      date: '2025-02-01',
      template_id: 111,
      total_points: 13,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 4, message: 'Missed one glass.' },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3 },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
    {
      date: '2025-02-02',
      template_id: 112,
      total_points: 14,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 2, message: 'Only ate one orange today.' },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 7 },
      ],
    },
    {
      date: '2025-02-03',
      template_id: 113,
      total_points: 12,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 3 },
        { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3, message: 'Had a mango and a kiwi.' },
        { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
  ];

  

  return (
    <div className="">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage == 'dashboard' && <Dashboard setStatus={setStatus} deleteChallenge={deleteChallenge} status={status} updateChallenge={updateChallenge} changeCompletedChallenges={changeCompletedChallenges} addChallenge={addChallenge} />}
      {currentPage == 'habitwindow' && <HabitWindow 
      templates={templates}
      selectedTemplateID={selectedTemplateID}
      setselectedTemplateID={setselectedTemplateID}
      totalPoints={totalPoints}
      maxPoints={maxPoints}
      template={template}
      DailyProgresses={DailyProgresses}
      updateSelectedTemplate={updateSelectedTemplate}
      updateHabit={updateHabit}
      saveDailyProgress={saveDailyProgress} />}
      
      {currentPage == 'reportwindow' && <ReportWindow 
      DailyProgresses={DailyProgresses}
      />}
    </div>
  );
}
