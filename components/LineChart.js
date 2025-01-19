'use client';
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);
import ProgressModal from './ProgressModal';

const LineChart = ({ width = '100%', height = '320px', exampleData, days }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // State to hold selected data for the modal

  const handleOpenModal = (data) => {
    setModalData(data); // Set the selected data
    setModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };

  const handleBackFromModal = () => {
    setModalOpen(false); // Close the modal when the back icon is clicked
  };

  useEffect(() => {
    if (!exampleData || !Array.isArray(exampleData)) {
      console.error('exampleData is not valid or missing.');
      return;
    }

    // Filter data for the last {days} days
    const today = new Date();
    const filteredData = exampleData.filter((item) => {
      const itemDate = new Date(item.date);
      return (today - itemDate) / (1000 * 60 * 60 * 24) <= days+1;
    });


    const labels = filteredData.map((item) => item.date.split('T')[0]); // Extracting dates
    const percentages = filteredData.map((item) => (item.total_points / item.max_points) * 100); // Calculating percentages

    const ctx = document.getElementById('lineChart').getContext('2d');

    // Destroy the previous chart instance to avoid overlap issues
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

    // Creating the chart instance
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
            whiteSpace: 'pre-wrap',
            callbacks: {
              label: function (context) {
                const index = context.dataIndex;
                const { habits } = filteredData[index];
                const failedHabits = habits.filter((h) => h.current !== h.target);
                return failedHabits
                  .map((h) => `${h.name}: ${h.current}/${h.target}`)
                  .join('\n\n') || 'All habits met targets!';
              },
            },
          },
        },
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const index = elements[0].index;
            const selectedData = filteredData[index]; // Get the selected data from filteredData
            handleOpenModal(selectedData); // Open modal with selected data
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
  }, [exampleData, days]); // Adding exampleData and days as dependencies

  return (
    <div className=" bg-transparent w-full rounded-lg border border-borderColor p-2">
      <h2 className="text-lg w-fit text-white mx-auto">Performance Line Chart</h2>
      <canvas
        id="lineChart"
        style={{ width, height }}
        className="mx-auto "
      ></canvas>

      {/* Modal */}
      {modalData && (
        <ProgressModal
          isOpen={isModalOpen}
          template={modalData}
          onClose={handleCloseModal}
          onBack={handleBackFromModal}
          totalPoints={modalData.total_points} // Pass the data to the modal
          maxPoints={modalData.max_points} // Pass th e data to the modal
          label={`Progress for ${modalData.date.split('T')[0]}`} // Pass the date as label
        />
      )}
    </div>
  );
};

export default LineChart;
