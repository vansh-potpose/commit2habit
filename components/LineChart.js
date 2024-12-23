import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

const LineChart = ({ width = '100%', height = '320px' }) => {
  useEffect(() => {
    const exampleData = Array.from({ length: 30 }, (_, index) => {
      const startDate = new Date('2025-02-01');
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);
      const formattedDate = currentDate.toISOString().split('T')[0];
      const maxPoints = 5;
      const current = Math.floor(Math.random() * (maxPoints + 1));

      return {
        date: formattedDate,
        template_id: 100 + index + 1,
        total_points: current,
        template_name: 'Simple Habit Tracker',
        max_points: maxPoints,
        habits: [
          {
            id: 1,
            name: 'Drink Water',
            description: 'Consume 8 glasses of water.',
            target: maxPoints,
            current,
            message: current < maxPoints ? `Missed ${maxPoints - current} glasses.` : 'Target achieved!',
          },
        ],
      };
    });

    const labels = exampleData.map((item) => item.date);
    const percentages = exampleData.map((item) => (item.total_points / item.max_points) * 100);

    const ctx = document.getElementById('lineChart').getContext('2d');

    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    const gradientZonePlugin = {
      id: 'gradientZone',
      beforeDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        ctx.save();

        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, '#c000ff');
        gradient.addColorStop(1, 'rgba(192, 0, 255, 0)');

        ctx.fillStyle = gradient;

        const yPosition = scales.y.getPixelForValue(75);
        ctx.fillRect(chartArea.left, yPosition, chartArea.width, chartArea.bottom - yPosition);

        ctx.restore();
      },
    };

    Chart.register(gradientZonePlugin);

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
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#ddd',
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
              color: '#fff',
            },
            grid: {
              color: '#444',
            },
            ticks: {
              color: '#ccc',
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
              color: '#444',
            },
            ticks: {
              color: '#ccc',
            },
          },
        },
      },
      plugins: [gradientZonePlugin],
    });
  }, []);

  return (
    <div className="bg-transparent w-full rounded-lg border border-borderColor p-2">
      <h2 className="text-lg w-fit text-white mx-auto">Performance Line Chart</h2>
      <canvas
        id="lineChart"
        style={{ width, height }}
        className="mx-auto"
      ></canvas>
    </div>
  );
};

export default LineChart;
