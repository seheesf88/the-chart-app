import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData }) {
  console.log('---', chartData)
  return <Pie data={chartData} style={{width: "100%"}} />;
}

export default PieChart;