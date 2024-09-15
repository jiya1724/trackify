import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const DailyEmployeesChart = () => {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // Example labels
    datasets: [
      {
        label: "Daily Employees",
        data: [90, 60, 70, 65, 80, 55, 0], // Example data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Employees: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-bg p-6 border border-solid border-lightGrey rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">Daily Employees</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyEmployeesChart;
