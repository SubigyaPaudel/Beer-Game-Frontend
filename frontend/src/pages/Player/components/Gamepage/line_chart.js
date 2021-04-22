import { Line } from "react-chartjs-2";
import { useState } from "react";

const LineChart = ({data}) => {
    const dim = data[0].data.length;
  return (
    <>
      <Line
        data={{
          labels: Array.from(Array(dim + 1).keys()).slice(1),
          datasets:data
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
};

export default LineChart;
