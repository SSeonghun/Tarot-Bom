import React, { useEffect, useRef } from "react";
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartTypeRegistry,
} from "chart.js";
import { PieController, ArcElement, Tooltip, Legend } from "chart.js";

// Pie 차트를 사용하기 위해 Chart.js에서 컨트롤러를 등록합니다.
Chart.register(PieController, ArcElement, Tooltip, Legend);

// props의 타입을 정의합니다.
interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
  hoverOffset?: number;
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  labels,
  data,
  backgroundColor = [
    "#DFF0FF",
    "#FFDFF4",
    "#FDECB0",
    "#C3F8DF",
    "#FEDEBC",
  ],
  hoverOffset = 4,
  width = 400,
  height = 400,
}) => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"pie", number[], unknown> | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const chartData: ChartData<"pie", number[], unknown> = {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: backgroundColor,
            hoverOffset: hoverOffset,
          },
        ],
      };

      const config: ChartConfiguration<"pie", number[], unknown> = {
        type: "pie",
        data: chartData,
        options: {},
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart<"pie", number[], unknown>(
          ctx,
          config
        );
      }
    }
  }, [labels, data, backgroundColor, hoverOffset]);

  return (
    <div className="rounded-lg overflow-hidden mt-10" style={{ width, height }}>
      <canvas className="p-3 ml-5 mr-5" ref={chartContainer} />
    </div>
  );
};

export default PieChart;
