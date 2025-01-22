'use client';
import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const processAbilities = (data) => {
  return data.map((ability) => ({
    abilityName: ability.name,
    totalPoints: ability.current_points,
  }));
};

const RadarChartFromAbilities = ({ data }) => {
  const processedData = processAbilities(data);

  const labels = processedData.map((item) => item.abilityName);
  const totalPoints = processedData.map((item) => item.totalPoints);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Points',
        data: totalPoints,
        backgroundColor: 'rgba(88, 166, 255, 0.3)', // Semi-transparent blue
        borderColor: 'rgba(88, 166, 255, 1)', // Solid blue
        pointBackgroundColor: '#58a6ff', // Blue for points
        pointBorderColor: '#c9d1d9', // Foreground color
        pointHoverBackgroundColor: '#c9d1d9', // Hover point background
        pointHoverBorderColor: '#58a6ff', // Hover point border
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#c9d1d9', // Foreground color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#21262d', // Tooltip background
        titleColor: '#c9d1d9', // Tooltip title color
        bodyColor: '#c9d1d9', // Tooltip body text color
        borderColor: '#30363d', // Tooltip border
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#30363d', // Border color for angle lines
        },
        grid: {
          color: '#30363d', // Grid color
        },
        ticks: {
          display: true,
          color: '#8b949e', // Secondary text color
          backdropColor: '#0d1117', // Background color behind ticks
        },
        pointLabels: {
          color: '#c9d1d9', // Labels for each ability
          font: {
            size: 12, // Reduced font size for better fitting
          },
          padding: 15, // Padding between the labels and the chart
          // Use a callback function to truncate the labels if too long
          callback: function (value) {
            if (value.length > 10) { // Limit the length of ability names
              return value.substring(0, 10) + '...'; // Truncate to 10 chars
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="min-w-96 min-h-96 sm:max-w-[500px] m-4 sm:max-h-[450px] flex-1 items-center justify-center bg-black border border-borderColor rounded-lg p-1 shadow-lg">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChartFromAbilities;
