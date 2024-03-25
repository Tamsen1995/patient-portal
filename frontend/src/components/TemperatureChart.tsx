import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface TemperatureChartProps {
  data: { date: Date; temperature: number }[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  return (
    <div className="mb-8">
      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default TemperatureChart;
