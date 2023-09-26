import { api, expenseInfoSheet } from "api/Api";
import React from "react";

export const useExpenseData = () => {
  // get expense data
  const [output, setOutput] = React.useState([]);
  React.useEffect(() => {
    fetch(api + expenseInfoSheet)
      .then(response => response.json())
      .then(data => {
        setOutput(data);
        console.log("how much it called");
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return output;
};

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    position: "left",
    labels: {
      boxWidth: 10,
    },
  },
};
