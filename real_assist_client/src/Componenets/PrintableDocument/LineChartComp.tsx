import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";
  
  const data = [
    {
      name: "Page A",
      Yesterday: 4000,
      Today: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      Yesterday: 3000,
      Today: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      Yesterday: 2000,
      Today: 2800,
      amt: 2290,
    },
    {
      name: "Page D",
      Yesterday: 2780,
      Today: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      Yesterday: 1890,
      Today: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      Yesterday: 2390,
      Today: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      Yesterday: 3490,
      Today: 4300,
      amt: 2100,
    },
  ];
  
  export default function LineChartComp() {
    return (
      <LineChart
        width={620}
        height={160}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Today"
          stroke="#1463ff"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Yesterday" stroke="#2da26e" strokeWidth={3} />
      </LineChart>
    );
  }
  