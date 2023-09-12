import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const BarGraph = ({ data }) => {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="Month" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />

      <Bar
        dataKey="Consumption (kWh)"
        fill="#8884d8"
        onClick={(data) => {
          // console.log(data.payload);
          alert(
            `${data.payload.Month}: ${data.payload["Consumption (kWh)"]} kWh`
          );
        }}
      />
    </BarChart>
  );
};

// Custom tooltip to show month & consumption
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p>{`${payload[0].payload.Month}: ${payload[0].value} kWh`}</p>
      </div>
    );
  }

  return null;
};

export default BarGraph;
