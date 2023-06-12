import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

type ExamCompletionChartProps = {
  completed: number;
  notCompleted: number;
  university: string;
  size: string
};

const ExamCompletionChart: React.FC<ExamCompletionChartProps> = ({ completed, notCompleted, university, size }) => {
  const data = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        data: [completed, notCompleted],
        backgroundColor: ['#4caf50', '#808080'],
        hoverBackgroundColor: ['#66bb6a', '#a9a9a9']
      }
    ]
  };

  const total = completed + notCompleted;
const completionRate = total > 0 ? ((completed / total) * 100).toFixed(2) : 0;

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: university
    },
    subtitle: {
      display: true,
      text: `Completion rate: ${completionRate}%`,
    },
  },
};

  

  return (
    <div className={`${size} p-3`}>
      <div className="bg-white border rounded shadow p-2">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExamCompletionChart;
