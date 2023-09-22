export const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
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
