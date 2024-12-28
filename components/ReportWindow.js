import React from 'react'
import LineChart from './LineChart'
import Heatmap from './Heatmap'
import Habit from './Habit';
import HabitReport from './HabitReport';

const ReportWindow = ({ DailyProgresses }) => {

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

  // Example usage:
  const exampleData = [
    {
      date: '2025-02-01',
      template_id: 111,
      total_points: 13,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 4, message: 'Missed one glass.' },
        { name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3 },
        { name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
    {
      date: '2025-02-02',
      template_id: 112,
      total_points: 14,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
        { name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 2, message: 'Only ate one orange today.' },
        { name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 7 },
      ],
    },
    {
      date: '2025-02-03',
      template_id: 113,
      total_points: 12,
      template_name: 'Health Tracker',
      max_points: 15,
      habits: [
        { name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 3 },
        { name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3, message: 'Had a mango and a kiwi.' },
        { name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
      ],
    },
  ];

  const transformedData = transformDataByHabitNames(DailyProgresses);

  
  const output = {
    "report": {
      "overallProgress": {
        "trend": "Overall progress shows a slight downward trend over the period. The total points earned have decreased by 13 points from the highest day (2024-12-24) to the lowest day (2024-12-22).",
        "highlights": {
          "bestDay": "2024-12-24 with a total score of 26 out of 26.",
          "lowestDay": "2024-12-22 with a total score of 16 out of 26."
        },
        "note": "There is a notable fluctuation in the overall progress, indicating that the user's performance has been inconsistent over the period."
      },
      "habits": [
        {
          "name": "Drink Water",
          "description": "Consume 8 glasses of water.",
          "performance": {
            "consistency": "The user has been inconsistent in drinking water, with a significant drop in performance on 2024-12-22.",
            "completionStats": {
              "fullyCompleted": 1,
              "partiallyCompleted": 3,
              "notCompleted": 1
            },
            "bestDay": "2024-12-24 with a score of 10 out of 10.",
            "lowestDay": "2024-12-22 with a score of 0 out of 10."
          },
          "observations": "The user has struggled to maintain the habit of drinking water, especially on 2024-12-22.",
          "recommendations": [
            "Create a reminder to drink water throughout the day, especially during college hours."
          ]
        },
        {
          "name": "Eat Fruits",
          "description": "Have at least 2 servings of fruits.",
          "performance": {
            "consistency": "The user has been consistent in eating fruits, with a perfect score on most days.",
            "completionStats": {
              "fullyCompleted": 4,
              "partiallyCompleted": 1,
              "notCompleted": 0
            },
            "bestDay": "2024-12-25 with a score of 3 out of 3.",
            "lowestDay": "2024-12-26 with a score of 2 out of 3."
          },
          "observations": "The user has maintained a good habit of eating fruits, with a minor slip-up on 2024-12-26.",
          "recommendations": [
            "Continue to prioritize eating fruits as part of daily meals."
          ]
        },
        {
          "name": "Sleep 8 Hours",
          "description": "Get a full night's rest.",
          "performance": {
            "consistency": "The user has been consistent in sleeping for 8 hours, with a perfect score on most days.",
            "completionStats": {
              "fullyCompleted": 4,
              "partiallyCompleted": 0,
              "notCompleted": 1
            },
            "bestDay": "2024-12-25 with a score of 13 out of 13.",
            "lowestDay": "2024-12-26 with a score of 3 out of 13."
          },
          "observations": "The user has maintained a good habit of sleeping for 8 hours, with a minor slip-up on 2024-12-26.",
          "recommendations": [
            "Establish a consistent sleep schedule to avoid disruptions."
          ]
        }
      ],
      "summary": {
        "observations": [
          "The user's performance has been inconsistent over the period, with notable fluctuations in overall progress.",
          "The user has maintained good habits in eating fruits and sleeping for 8 hours, but struggles with drinking water."
        ],
        "recommendations": [
          "Create reminders and establish consistent schedules to improve overall performance.",
          "Prioritize self-care activities, such as drinking water and sleeping, to maintain overall well-being."
        ]
      }
    }
  }

  const overall = output.report.overallProgress
  const habitReport = output.report.habits
  const summary = output.report.summary

  return (
    <div className='mb-1'>

      <div className='px-5'>

        <div className=' w-full h-fit py-10 '>
          <LineChart exampleData={DailyProgresses} days={31} height="70px" />
        </div>
        <div className=' w-full h-fit py-7 '>
          <Heatmap reportData={transformedData} />
        </div>
        <div className="reasons">
          <h1 className="text-2xl font-bold">Report of habits</h1>
          <div className="bg-black border border-borderColor p-4 rounded-md">
            <div className='overallprogress border-b mt-2 pb-4 mb-6'>
              <h1 className='text-2xl font-bold mb-3'>Overall Progress</h1>
              <div className='p-3 space-y-2'>

                <p className=''>{overall.trend} </p>
                <h2 className='font-semibold text-lg'>Highlights :</h2>
                <div className='ml-3'>

                  <p className='font-semibold'>Best day : <span className='text-textColor font-normal'>{overall.highlights.bestDay} </span></p>
                  <p className='font-semibold'>Lowest day : <span className='text-textColor font-normal'>{overall.highlights.lowestDay} </span></p>
                </div>
                <p className='font-semibold text-lg'>note :  <span className='text-textColor text-base font-normal'>{overall.note} </span></p>
              </div>
            </div>

            <div className="habits-report mb-6 border-b pb-4">
              <h1 className='text-2xl font-bold mb-3'>Habits analysis </h1>
              <div className='p-3 flex flex-col gap-4'>
                {habitReport.map((habit) => (
                  <HabitReport habit={habit} />
                ))}
              </div>
            </div>

            <div className="summary-section">
              <h1 className="text-2xl font-bold text-white mb-4">Summary</h1>

              <div className="mb-6 ml-4">
                <h2 className="text-xl font-semibold text-gray-300 mb-2">Observations:</h2>
                <ol className="list-decimal list-inside pl-6 text-gray-400 space-y-2">
                  {summary.observations.map((item, index) => (
                    <li key={index} className="text-base">{item}</li>
                  ))}
                </ol>
              </div>

              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-300 mb-2">Recommendations:</h2>
                <ol className="list-decimal list-inside pl-6 text-gray-400 space-y-2">
                  {summary.recommendations.map((item, index) => (
                    <li key={index} className="text-base">{item}</li>
                  ))}
                </ol>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default ReportWindow
