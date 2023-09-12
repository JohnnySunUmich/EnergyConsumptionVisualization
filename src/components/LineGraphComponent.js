import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineGraph = ({ data }) => {
  const [viewport, setViewport] = useState({
    width: 800,
    height: 400,
  });
  const [selectedStates, setSelectedStates] = useState([
    "California",
    "Texas",
    "Florida",
    "New York",
    "Illinois",
    "Pennsylvania",
    "Ohio",
  ]);

  const filteredData = data.filter((d) => selectedStates.includes(d.State));

  return (
    <div>
      <ZoomControls viewport={viewport} setViewport={setViewport} />
      <StatesFilter
        data={data}
        selectedStates={selectedStates}
        setSelectedStates={setSelectedStates}
      />
      <LineChart
        {...viewport}
        data={filteredData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        onClick={(data) => {
          // console.log(data);
          alert(`${data.activeLabel}: ${data.activePayload[0].value} kWh`);
        }}
      >
        <XAxis dataKey="State" />
        <YAxis yAxisId="consumption" />
        <YAxis yAxisId="renewables" orientation="right" />
        <Line
          yAxisId="consumption"
          dataKey="Consumption (kWh)"
          stroke="#8884d8"
        />
        <Line
          yAxisId="renewables"
          dataKey="Renewable Energy %"
          stroke="#82ca9d"
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </LineChart>
    </div>
  );
};

// Zoom control buttons
const ZoomControls = ({ viewport, setViewport }) => {
  const handleZoomIn = () => {
    setViewport({
      ...viewport,
      width: viewport.width * 1.05,
      height: viewport.height * 1.05,
    });
  };

  const handleZoomOut = () => {
    setViewport({
      ...viewport,
      width: viewport.width * 0.95,
      height: viewport.height * 0.95,
    });
  };

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
    </div>
  );
};

// Allow user to toggle states
const StatesFilter = ({ data, selectedStates, setSelectedStates }) => {
  const stateOptions = Array.from(new Set(data.map((d) => d.State)));

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedStates((prev) =>
      prev.includes(value)
        ? prev.filter((state) => state !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="states-filter">
      {stateOptions.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedStates.includes(option)}
            onChange={handleChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// Custom tooltip to show month & consumption
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // console.log(payload[0]);
    return (
      <div className="tooltip">
        <p>State: {payload[0].payload.State}</p>
        <p>Consumption (kWh): {payload[0].value}</p>
        <p>Renewable Energy %: {payload[0].payload["Renewable Energy %"]}</p>
        <p>
          Average Household Size: {payload[0].payload["Average Household Size"]}
        </p>
      </div>
    );
  }
};

export default LineGraph;
