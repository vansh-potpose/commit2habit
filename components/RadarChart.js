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
  return data.map(ability => ({
    abilityName: ability.name,
    totalPoints: ability.current_points,
  }));
};

const RadarChartFromAbilities = ({ data }) => {
  const processedData = processAbilities(data);

  const labels = processedData.map(item => item.abilityName);
  const totalPoints = processedData.map(item => item.totalPoints);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Points',
        data: totalPoints,
        backgroundColor: 'rgba(88, 166, 255, 0.3)', // Link color with transparency
        borderColor: 'rgba(88, 166, 255, 1)', // Link color
        pointBackgroundColor: '#58a6ff', // Link color
        pointBorderColor: '#c9d1d9', // Foreground color
        pointHoverBackgroundColor: '#c9d1d9', // Foreground color
        pointHoverBorderColor: '#58a6ff', // Link color
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
        backgroundColor: '#21262d', // Button color
        titleColor: '#c9d1d9', // Foreground color
        bodyColor: '#c9d1d9', // Foreground color
        borderColor: '#30363d', // Border color
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: '#30363d', // Border color
        },
        grid: {
          color: '#30363d', // Border color
        },
        ticks: {
          display: true,
          color: '#8b949e', // Secondary text color
          backdropColor: '#0d1117', // Background color
        },
        pointLabels: {
          color: '#c9d1d9', // Foreground color
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-[500px] h-[450px]  rounded-lg ">
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChartFromAbilities;
