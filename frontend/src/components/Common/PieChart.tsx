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

const PieChart: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<"pie", number[], unknown> | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const data: ChartData<"pie", number[], unknown> = {
        labels: ["연애운", "금전운", "취업운", "가족운", "직장운"],

        // 라벨도 바꿔줘야 할듯
        // 여기 data prop나 store에서 가져와야 할듯
        datasets: [
          {
            label: "",
            data: [300, 200, 100, 50, 30],
            backgroundColor: [
              "rgb(25, 14, 126)",
              "rgb(56, 46, 148)",
              "rgb(111, 101, 199)",
              "rgb(185, 177, 250)",
              "rgb(230, 227, 255)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const config: ChartConfiguration<"pie", number[], unknown> = {
        type: "pie",
        data: data,
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
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <canvas className="p-1 ml-5 mr-5" ref={chartContainer} />
    </div>
  );
};

export default PieChart;
