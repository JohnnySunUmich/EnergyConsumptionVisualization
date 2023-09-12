import { Treemap, Label, Tooltip } from "recharts";

const TreeMapComponent = () => {
  const data = [
    {
      name: "Northeast",
      children: [
        {
          "Total Outage Time (hours)": 2000,
          "Total Customers Affected": 12000,
          "Total Outages": 500,
          "Avg. Outage Duration (hours)": 4,
          "Avg. Customers Affected per Outage": 24,
        },
      ],
    },
    {
      name: "West",
      children: [
        {
          "Total Outage Time (hours)": 1800,
          "Total Customers Affected": 10000,
          "Total Outages": 450,
          "Avg. Outage Duration (hours)": 4,
          "Avg. Customers Affected per Outage": 22,
        },
      ],
    },
    {
      name: "Midwest",
      children: [
        {
          "Total Outage Time (hours)": 1500,
          "Total Customers Affected": 9000,
          "Total Outages": 400,
          "Avg. Outage Duration (hours)": 3.75,
          "Avg. Customers Affected per Outage": 23,
        },
      ],
    },
    {
      name: "South",
      children: [
        {
          "Total Outage Time (hours)": 2200,
          "Total Customers Affected": 14000,
          "Total Outages": 550,
          "Avg. Outage Duration (hours)": 4,
          "Avg. Customers Affected per Outage": 25,
        },
      ],
    },
  ];
  return (
    <Treemap
      width={500}
      height={200}
      data={data}
      dataKey="Total Outage Time (hours)"
      onClick={(data) => {
        console.log(data);
        alert(`${data.root.name}: ${data["Total Outage Time (hours)"]} hours`);
      }}
    >
      <Label valueKey="name" position="insideTop" />
      <Tooltip content={<CustomTooltip />} />
    </Treemap>
  );
};

// Tooltip to show details on hover
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <p>Region: {payload[0].payload.root.name}</p>
        <p>Outage Time: {payload[0].value} hours</p>
        <p>
          Customers Affected: {payload[0].payload["Total Customers Affected"]}
        </p>
      </div>
    );
  }

  return null;
};

export default TreeMapComponent;
