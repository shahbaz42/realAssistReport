import {
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import  useWindowSize  from "../../hooks/useWindowSize";
import { ILineChartData } from "../../types";

export default function LineChartComp({ data }: { data: ILineChartData[] }) {
  const {width, height}= useWindowSize();

  return (
    <LineChart
      width={Math.min(620, 0.70*width)}
      height={160}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
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
