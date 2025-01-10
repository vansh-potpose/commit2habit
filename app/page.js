'use client';
import Dashboard from "@/components/Dashboard";
import HabitWindow from "@/components/HabitWindow";
import ReportWindow from "@/components/ReportWindow";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import React, { use, useEffect, useState } from "react";
import service from "./appwrite/services";
import SettingsWindow from "@/components/SettingsWindow";
import auth from "./appwrite/auth";
import { useRouter } from 'next/navigation';



export default function Home() {
  const [currentPage, setCurrentPage] = useState('lodingWindow');
  const [profile_pic,setProfile_pic]=useState("");

  // loading initial data-----------------------------------------------------
  useEffect(() => {

    const fetch = async () => {
      setCurrentPage('lodingWindow');
      await service.getAbilities().then((result) => {
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
      await fetchData();

      await fetchDailyProgress();
      setCurrentPage('dashboard');
    }
    fetch();

  }, []);



  // dashbboard code part-----------------------------------------------------
  const [status, setStatus] = useState([]);






  const changeCompletedChallenges = async (challenge_id, isCompleted) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        let updatedCurrentPoints = ability.current_points; // Track changes to points
        const updatedChallenges = ability.challenges.map((challenge) => {
          if (challenge.challenge_id === challenge_id) {
            // Adjust points only if the completion status is changing
            if (challenge.isCompleted !== isCompleted) {
              const pointChange = isCompleted ? challenge.points : -challenge.points;
              updatedCurrentPoints += pointChange; // Update tracked points
            }
            return { ...challenge, isCompleted }; // Update challenge status
          }
          return challenge;
        });
  
        // Only send updates to the service if there are changes
        if (updatedCurrentPoints !== ability.current_points) {
          service.updateAbility({
            ability_id: ability.ability_id,
            name: ability.name,
            current_points: updatedCurrentPoints,
            challenges: updatedChallenges,
          });
        }
  
        return { ...ability, current_points: updatedCurrentPoints, challenges: updatedChallenges };
      })
    );
  };
  
  const updateChallenge = (challenge_id, updatedData) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        let updatedCurrentPoints = ability.current_points; // Track changes to points
        const updatedChallenges = ability.challenges.map((challenge) => {
          if (challenge.challenge_id === challenge_id) {
            let pointDifference = 0;
  
            // Calculate the point difference if the challenge is completed and points are updated
            if (updatedData.points !== undefined && challenge.isCompleted) {
              pointDifference = updatedData.points - challenge.points;
              updatedCurrentPoints += pointDifference; // Adjust points
            }
  
            return { ...challenge, ...updatedData }; // Update challenge with new data
          }
          return challenge;
        });
  
        // Only send updates to the service if there are changes
        if (updatedCurrentPoints !== ability.current_points || updatedData.points !== undefined) {
          service.updateAbility({
            ability_id: ability.ability_id,
            name: ability.name,
            current_points: updatedCurrentPoints,
            challenges: updatedChallenges,
          });
        }
  
        return { ...ability, current_points: updatedCurrentPoints, challenges: updatedChallenges };
      })
    );
  };
  

  const deleteChallenge = (challenge_id) => {
    setStatus((prevStatus) =>
      prevStatus.map((ability) => {
        const updatedChallenges = ability.challenges.filter(
          (challenge) => challenge.challenge_id !== challenge_id
        );
  
        // Only update the service if the challenges array has changed
        if (updatedChallenges.length !== ability.challenges.length) {
          service.updateAbility({
            ability_id: ability.ability_id,
            name: ability.name,
            current_points: ability.current_points,
            challenges: updatedChallenges,
          });
        }
  
        return { ...ability, challenges: updatedChallenges };
      })
    );
  };
  

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
        challenge_id: Date.now(), // Generate a unique ID for the challenge
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

  const template = templates.find((template) => template.template_id === selectedTemplateID) || {};


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
      console.log('updateSelectedTemplate :: updated template successfully:');
    } else {
      console.error('updateSelectedTemplate :: failed to update template');
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
      // Save the daily progress for the given template
      let data = await service.createDailyProgress({ template });
      console.log('data', data);
      if (data) {
        console.log('Daily progress saved successfully...');

        // Remove the oldest entry if the daily progresses exceed the limit of 31
        if (DailyProgresses.length > 31) {
          const oldestDate = DailyProgresses.reduce((prev, current) =>
            new Date(prev.date) < new Date(current.date) ? prev : current
          ).date;

          await service.deleteDailyProgress(oldestDate);

          // Remove the oldest entry locally
          newDailyProgresses = DailyProgresses.filter((dp) => dp.date !== oldestDate);
          setDailyProgresses(newDailyProgresses);
        }

        // Update the daily progresses with today's data or add a new entry
        const updatedDailyProgresses = DailyProgresses.some((dp) => dp.date === data.date)
          ? DailyProgresses.map((dp) => (dp.date === data.date ? data : dp))
          : [...DailyProgresses, data];

        //sort the daily progresses by date
        updatedDailyProgresses.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        // Update the state with the new daily progresses
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
      console.log('Fetched daily progress successfully...');
    } else {
      console.error('Failed to fetch daily progress...');
    }
  };



  // reportwindow code part-----------------------------------------------------
  const [reportData, setReportData] = useState({});
  function transformDataByHabitNames(data) {
    const trendData = {
      overallProgress: [],
      habitTrends: {},
    };

    data.forEach((entry) => {
      // Add to overall progress
      trendData.overallProgress.push({
        date: entry.date,
        total_points: entry.total_points,
        max_points: entry.max_points,
      });

      // Add to habit trends
      entry.habits.forEach((habit) => {
        if (!trendData.habitTrends[habit.name]) {
          // Initialize habit entry if not already present
          trendData.habitTrends[habit.name] = {
            description: habit.description,
            dailyProgress: [],
          };
        }

        // Add daily progress for the habit
        trendData.habitTrends[habit.name].dailyProgress.push({
          date: entry.date,
          target: habit.target,
          current: habit.current,
          message: habit.message || null,
        });
      });
    });

    return trendData;
  }


  useEffect(() => {
    const GenerateReport = async () => {
      const content = JSON.stringify(transformDataByHabitNames(DailyProgresses));
      try {
        const res = await fetch("/api/groq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: content }),
        });
        const data = await res.json();
        setReportData(JSON.parse(data.content));
      } catch (error) {
        console.error(error);
      }
    };
    GenerateReport();
  }
  , [DailyProgresses]);






  // SettingsWindow code part-----------------------------------------------------
  const ChangeTemplateName = async (template, newName) => {
    await service.updateTemplate({
      template_id: template.template_id,
      template_name: newName,
      user_id: template.user_id,
      max_points: template.max_points,
      total_points: template.total_points,
      click_points: template.click_points,
      habits: template.habits,
    }).then((result) => {
      if (result) {
        console.log('Template name updated successfully');
        setTemplates((prevTemplates) =>
          prevTemplates.map((prevTemplate) =>
            prevTemplate.template_id === template.template_id
              ? { ...prevTemplate, template_name: newName }
              : prevTemplate
          ));
      }
    }
    )
  }


  const ChangeAbilityName = async (ability, newName) => {
    await service.updateAbility({
      ability_id: ability.ability_id,
      name: newName,
      current_points: ability.current_points,
      challenges: ability.challenges,
    }).then((result) => {
      if (result) {
        console.log('Ability name updated successfully');
        setStatus((prevStatus) =>
          prevStatus.map((prevAbility) =>
            prevAbility.ability_id === ability.ability_id
              ? { ...prevAbility, name: newName }
              : prevAbility
          ));
      }
    }
    )
  }

  const createAbility = async (name) => {
    await service.createAbility({
      name: name,
      current_points: 0,
      challenges: [],
    }).then((result) => {
      if (result) {
        console.log('Ability created successfully');
        setStatus((prevStatus) => [...prevStatus, result]);
      }
    }
    )
  }

  const DeleteAbility = async (ability_id) => {
    await service.deleteAbility(ability_id).then((result) => {
      if (result) {
        console.log('Ability deleted successfully');
        setStatus((prevStatus) => prevStatus.filter((prevAbility) => prevAbility.ability_id !== ability_id));
      }
    }
    )
  }






  // Navbar code part-----------------------------------------------------
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await auth.getCurrentUser();
        if (user) {
          setUser(user);
          service.getFilePreview(user.$id).then((result) => {
            if (result) {
              setProfile_pic(result);
            }
          }
          )
        }else{
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
      }
    };

    checkUser();
  }, [router]);

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const UpdateTitle =async (title) => {
    await auth.UpdatePrefs({title: title}).then((result) => {
      if (result) {
        console.log('Title updated successfully');
        setUser(result);
      }
    }
    )
  }

  useEffect(() => {
    async function loadImage() {
        if (user) {
            const previewUrl = await service.getFilePreview(user.$id);
            if (previewUrl) {
                setProfile_pic(previewUrl);
            }
        }
    }
    loadImage();
}, [user]);

const uploadProfilePic = async (file) => {
  try {
    // Delete the existing file associated with the user
    const deleteResult = await service.deleteFile(user.$id);
    if (deleteResult) {
      console.log("Profile pic deleted successfully");
    }

    // Upload the new file
    const uploadResult = await service.uploadFile(file);
    if (uploadResult) {
      console.log("Profile pic uploaded successfully");

      // Retrieve and update the profile picture preview
      const previewUrl = await service.getFilePreview(user.$id);
      if (previewUrl) {
        setProfile_pic(previewUrl);
        console.log("Profile pic updated successfully");
      }
    }
  } catch (error) {
    console.error("Error uploading profile pic:", error);
  }
};







    

  




  return (
    <div className="">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />
      {currentPage == 'dashboard' && <Dashboard
        user={user}
        setStatus={setStatus}
        deleteChallenge={deleteChallenge}
        status={status}
        updateChallenge={updateChallenge}
        changeCompletedChallenges={changeCompletedChallenges}
        addChallenge={addChallenge}
        profile_pic={profile_pic} />}

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
        reportData={reportData}
        transformDataByHabitNames={transformDataByHabitNames}
      />}
      {currentPage == 'settingswindow' && <SettingsWindow
        templates={templates}
        status={status}
        ChangeTemplateName={ChangeTemplateName}
        ChangeAbilityName={ChangeAbilityName}
        createAbility={createAbility}
        DeleteAbility={DeleteAbility}
        logout={logout}
        UpdateTitle={UpdateTitle}
        uplodadProfilePic={uplodadProfilePic}
        profile_pic={profile_pic}
      />}
      {currentPage == 'lodingWindow' && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image src="/lodingScreen-unscreen.gif" width={300} height={100} />
      </div>}
    </div>
  );
}
