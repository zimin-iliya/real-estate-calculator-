import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

const LineChart = ({ chartData }) => {

  return (
    <div className="chart">
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
