import React from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const PieChartComponent = ({ data }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const quarterlyData = data.map((item) => item["Consumption (kWh)"]);

    const chart = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            data: quarterlyData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AA6384"],
          },
        ],
      },
      options: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length === 0) return;
          const index = elements[0].index;
          alert(
            `Quarter: Q${index + 1}, Consumption: ${quarterlyData[index]} kWh`
          );
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const total = quarterlyData.reduce(
                  (acc, value) => acc + value,
                  0
                );
                const value = quarterlyData[context.dataIndex];
                const percentage = ((value / total) * 100).toFixed(2);
                return `Q${
                  context.dataIndex + 1
                }: ${value} kWh (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default PieChartComponent;
