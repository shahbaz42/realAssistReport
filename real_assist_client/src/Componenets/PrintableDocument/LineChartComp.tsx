import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ILineChartData } from "../../types";

export default function LineChartComp({ data }: { data: ILineChartData[] }) {
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
      <Line
        type="monotone"
        dataKey="Yesterday"
        stroke="#2da26e"
        strokeWidth={3}
      />
    </LineChart>
  );
}
