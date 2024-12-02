'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend, Title);

const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    const labels = data.map(point => new Date(point.date)); 
    const values = data.map(point => point.value);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Data Points',
          data: values,
          borderColor: 'rgba(40, 167, 69, 1)',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          tension: 0.1,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: 'rgba(40, 167, 69, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    });
  }, [data]);

  const handlePointClick = (event, elements) => {
    const chartInstance = event.chartInstance;
    if (elements.length) {
      const index = elements[0].index;
      const selectedData = data[index];
      alert(`You clicked on ${selectedData.label}: ${selectedData.value}`);
    }
  };

  return (
    <div className="w-full flex justify-center p-1 bg-background border border-borderColor rounded-md h-auto ">
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
            y: {
              ticks: {
                color: 'rgba(255, 255, 255, 0.8)',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'rgba(255, 255, 255, 0.8)',
              },
            },
            tooltip: {
              backgroundColor: 'rgba(40, 167, 69, 1)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              borderWidth: 1,
            },
          },
          onClick: handlePointClick,
        }}
      />
    </div>
  );
};

export default LineChart;
