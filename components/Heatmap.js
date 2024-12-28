import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Heatmap = ({ reportData }) => {
  const [dates, setDates] = useState([]);
  const [showCurrentMonth, setShowCurrentMonth] = useState(false); // State to toggle between date ranges
  const { habitTrends } = reportData;

  const getLast31Days = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 31; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates.reverse();
  };

  const getDatesOfCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)

    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of current month

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day+1);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  // Update dates dynamically based on the toggle state
  useEffect(() => {
    const newDates = showCurrentMonth ? getDatesOfCurrentMonth() : getLast31Days();
    setDates(newDates);
  }, [showCurrentMonth]);

  const habits = Object.keys(habitTrends);

  const habitDataMap = habits.reduce((map, habit) => {
    map[habit] = {};
    habitTrends[habit].dailyProgress.forEach(({ date, target, current }) => {
      const formattedDate = new Date(date).toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      map[habit][formattedDate] = Math.round((current / target) * 100) || 0; // Calculate percentage
    });
    return map;
  }, {});

  const handleToggle = () => {
    setShowCurrentMonth((prevState) => !prevState); // Toggle the state
  };

  return (
    <div className="p-6 bg-black shadow-md rounded-lg border border-borderColor overflow-x-auto">
      <div className="top flex items-center mb-4 gap-8">
        <h2 className="text-2xl font-bold text-white">Habit Completion Heatmap</h2>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showCurrentMonth}
            onChange={handleToggle}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          <span className="ms-3 text-sm font-medium text-textColor dark:text-gray-300">
            This Month
          </span>
        </label>
      </div>

      {/* Days Row */}
      <div className="flex items-center gap-1 mb-2 pl-36">
        {dates.map((date) => {
          const day = new Date(date).getDate();
          const month = new Date(date).toLocaleString("default", { month: "short" });
          return (
            <div key={date} className="w-9 text-xs text-textColor text-center">
              {day === 1 ? `${day} ${month}` : day}
            </div>
          );
        })}
      </div>

      {/* Habit Rows */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit} className="flex items-center space-x-4">
            <div className="w-32 font-medium text-white truncate">{habit}</div>
            <div className="flex gap-1">
              {dates.map((date) => {
                const completion = habitDataMap[habit][date] || 0;
                let bgColor = "bg-[#161b22]";

                if (completion > 80) bgColor = "bg-[#39d353]";
                else if (completion > 60) bgColor = "bg-[#26a641]";
                else if (completion > 40) bgColor = "bg-[#006d32]";
                else if (completion > 20) bgColor = "bg-[#0e4429]";

                return (
                  <div
                    key={date}
                    className={`w-9 h-9 rounded-md ${bgColor} hover:scale-110 transition-transform`}
                    title={`${habit} on ${date}: ${completion}%`}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2 text-white">Legend</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md bg-[#39d353]"></div>
            <span className="text-xs text-textColor">80-100%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md bg-[#26a641]"></div>
            <span className="text-xs text-textColor">60-80%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md bg-[#1f6b22]"></div>
            <span className="text-xs text-textColor">40-60%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md bg-[#0e4429]"></div>
            <span className="text-xs text-textColor">20-40%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-md bg-gray-800"></div>
            <span className="text-xs text-textColor">0-20%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Heatmap.propTypes = {
  reportData: PropTypes.shape({
    habitTrends: PropTypes.objectOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        dailyProgress: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string.isRequired,
            target: PropTypes.number.isRequired,
            current: PropTypes.number.isRequired,
            message: PropTypes.string,
          })
        ).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Heatmap;
