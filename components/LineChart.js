import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

const LineChart = () => {
  useEffect(() => {
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
      {
        date: '2025-02-04',
        template_id: 114,
        total_points: 15,
        template_name: 'Health Tracker',
        max_points: 15,
        habits: [
          { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
          { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3 },
          { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 7 },
        ],
      },
      {
        date: '2025-02-05',
        template_id: 115,
        total_points: 11,
        template_name: 'Health Tracker',
        max_points: 15,
        habits: [
          { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 4 },
          { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 2 },
          { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 5, message: 'Couldn’t sleep well.' },
        ],
      },
      {
        date: '2025-02-06',
        template_id: 116,
        total_points: 13,
        template_name: 'Health Tracker',
        max_points: 15,
        habits: [
          { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
          { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 2, message: 'Had only an apple.' },
          { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6 },
        ],
      },
      {
        date: '2025-02-07',
        template_id: 117,
        total_points: 14,
        template_name: 'Health Tracker',
        max_points: 15,
        habits: [
          { id: 4, name: 'Drink Water', description: 'Consume 8 glasses of water.', target: 5, current: 5 },
          { id: 5, name: 'Eat Fruits', description: 'Have at least 2 servings of fruits.', target: 3, current: 3 },
          { id: 6, name: 'Sleep 8 Hours', description: "Get a full night's rest.", target: 7, current: 6, message: 'Woke up early.' },
        ],
      },
    ];
    
    // const exampleData = Array.from({ length: 30 }, (_, index) => {
    //   const startDate = new Date('2025-02-01'); // Start date
    //   const currentDate = new Date(startDate);
    //   currentDate.setDate(startDate.getDate() + index); // Add days to the start date
    
    //   const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    //   const maxPoints = 5; // Maximum points for the habit
    //   const current = Math.floor(Math.random() * (maxPoints + 1)); // Random current points (0 to maxPoints)
    
    //   return {
    //     date: formattedDate,
    //     template_id: 100 + index + 1, // Unique template ID for each day
    //     total_points: current,
    //     template_name: 'Simple Habit Tracker',
    //     max_points: maxPoints,
    //     habits: [
    //       {
    //         id: 1,
    //         name: 'Drink Water',
    //         description: 'Consume 8 glasses of water.',
    //         target: maxPoints,
    //         current,
    //         message: current < maxPoints ? `Missed ${maxPoints - current} glasses.` : 'Target achieved!',
    //       },
    //     ],
    //   };
    // });
    

    const labels = exampleData.map((item) => item.date);
const percentages = exampleData.map((item) => (item.total_points / item.max_points) * 100);

// Get the canvas context
const ctx = document.getElementById('lineChart').getContext('2d');

// Destroy the previous chart instance if it exists
if (window.chartInstance) {
  window.chartInstance.destroy();
}

// Define the plugin for the gradient zone
const gradientZonePlugin = {
  id: 'gradientZone',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales } = chart;
    ctx.save();

    // Create the gradient from purple to transparent
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, '#c000ff'); // Purple at the top
    gradient.addColorStop(1, 'rgba(192, 0, 255, 0)'); // Transparent at the bottom

    // Set the gradient as the fill style
    ctx.fillStyle = gradient;

    // Draw the gradient area based on the percentage
    const yPosition = scales.y.getPixelForValue(75); // Get the y-position for 75%
    ctx.fillRect(chartArea.left, yPosition, chartArea.width, chartArea.bottom - yPosition);

    ctx.restore();
  },
};

// Register the plugin
Chart.register(gradientZonePlugin);


    // Create a new chart
    window.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Performance (%)',
            data: percentages,
            borderColor: '#12cb3f',
            pointBackgroundColor: '#12cb3f',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2,
            fill: true,
            tension: 0.05,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            backgroundColor: '#333', // Dark background for tooltips
            titleColor: '#fff', // Light text color for title
            bodyColor: '#ddd', // Slightly dim body text
            callbacks: {
              label: function (context) {
                const index = context.dataIndex;
                const { habits } = exampleData[index];
                const failedHabits = habits.filter((h) => h.current !== h.target);
                return failedHabits.map((h) => `${h.name}: ${h.current}/${h.target}`).join('\n') || 'All habits met targets!';
              },
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const template = exampleData[index];
            alert(`Template Details:\n${JSON.stringify(template, null, 2)}`);
          }
        },
        scales: {
          y: {
            title: {
              display: false,
              text: 'Percentage (%)',
              color: '#fff', // White text for axis labels
            },
            grid: {
              color: '#444', // Darker grid lines for contrast
            },
            ticks: {
              color: '#ccc', // Light ticks
            },
          },
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'd MMM yyyy',
              displayFormats: {
                day: 'd MMM',
              },
            },
            title: {
              display: false,
              text: 'Date',
              color: '#fff',
            },
            grid: {
              color: '#444', // Darker grid lines
            },
            ticks: {
              color: '#ccc', // Light ticks
            },
          },
        },
      },
      plugins: [gradientZonePlugin], // Add the plugin here
    });
  }, []);

  return (
    <div className="bg-transparent w-full rounded-lg border border-borderColor p-2">
      <h2 className="text-lg w-fit text-white mx-auto">Performance Line Chart</h2>
      <canvas id="lineChart" className="w-full mx-auto h-80"></canvas>
    </div>
  );
};

export default LineChart;