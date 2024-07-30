import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartData, ChartTypeRegistry } from 'chart.js';
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';

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
    'rgb(25, 14, 126)',
    'rgb(56, 46, 148)',
    'rgb(111, 101, 199)',
    'rgb(185, 177, 250)',
    'rgb(230, 227, 255)',
  ],
  hoverOffset = 4,
  width = 400,
  height = 400,
}) => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart<'pie', number[], unknown> | null>(null);

  useEffect(() => {
    if (chartContainer.current) {
      const chartData: ChartData<'pie', number[], unknown> = {
        labels: labels,
        datasets: [
          {
            label: '',
            data: data,
            backgroundColor: backgroundColor,
            hoverOffset: hoverOffset,
          },
        ],
      };

      const config: ChartConfiguration<'pie', number[], unknown> = {
        type: 'pie',
        data: chartData,
        options: {},
      };

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart<'pie', number[], unknown>(ctx, config);
      }
    }
  }, [labels, data, backgroundColor, hoverOffset]);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden" style={{ width, height }}>
      <canvas className="p-1 ml-5 mr-5" ref={chartContainer} />
    </div>
  );
};

export default PieChart;
