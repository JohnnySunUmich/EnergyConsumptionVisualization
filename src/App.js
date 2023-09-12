import React from "react";
import "./App.css";
import PieChartComponent from "./components/PieChartComponent";
import BarGraphComponent from "./components/BarGraphComponent";
import LineGraphComponent from "./components/LineGraphComponent";
import TreeMapComponent from "./components/TreeMapComponent";
// import * as XLSX from "xlsx";
import pieChartData from "./data/pieData.json";
import barGraphData from "./data/barData.json";
import lineGraphData from "./data/lineData.json";
import treeMapData from "./data/treeData.json";

function App() {
  // const fetchData = () => {
  //   fetch("/data.xlsx")
  //     .then((response) => response.arrayBuffer())
  //     .then((arrayBuffer) => {
  //       const data = new Uint8Array(arrayBuffer);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const firstSheetName = workbook.SheetNames[3];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //       console.log(jsonData);
  //       // Set JSON data to state or pass it to other components
  //     })
  //     .catch((error) => console.error("Error reading XLSX file:", error));
  // };

  // fetchData();

  return (
    <div className="App">
      <div className="chart-section">
        <h1>Quarterly Electricity Consumption Pie Chart</h1>
        <div className="pie-chart-container">
          <PieChartComponent data={pieChartData} />
        </div>
      </div>
      <div className="chart-section">
        <h1>Monthly Electricity Consumption Bar Graph</h1>
        <div className="bar-graph-container">
          <BarGraphComponent data={barGraphData} width={800} />
        </div>
      </div>
      <div className="chart-section">
        <h1>State-wise Electricity Consumption Line Graph</h1>
        <LineGraphComponent data={lineGraphData} />
      </div>
      <div className="chart-section">
        <h1>Region-wise Outage Time Tree Map</h1>
        <div className="tree-map-container">
          <TreeMapComponent data={treeMapData} />
        </div>
      </div>
    </div>
  );
}

export default App;
