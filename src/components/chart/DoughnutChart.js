import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { URL_API } from "../../helper/URL";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChartShip() {
  const [chartData, setChartData] = useState({});
  const [haveData, setHaveData] = useState(false);
  const backgroundColor = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
    "rgb(255, 99, 132)",
    "rgb(154, 162, 235)",
    "rgb(10, 100, 86)",
    "rgb(10, 500, 50)",
    "rgb(54, 5, 235)",
    "rgb(100, 9, 86)",
    "rgb(30, 150, 120)",
    "rgb(64, 20, 235)",
    "rgb(50, 100, 150)",
  ];

  const fetchData = async () => {
    try {
      const { data } = await axios.get(URL_API + `/chart/type`);
      const dataChart = {
        labels: data.map((x) => x.label),
        datasets: [
          {
            data: data.map((x) => x.amount),
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1,
          },
        ],
      };
      setChartData(dataChart);
      setHaveData(true);
    } catch (error) {
      setHaveData(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div class="col-sm-4">
      <div class="card   mb-3">
        <div class="card-header">Type of ship</div>
        <div class="card-body">
          <div class="p-3 justify-content-center">
            <div class="d-flex justify-content-center">
              {!haveData ? ( <Spinner animation="border" />) :
               ( <Doughnut data={chartData} options={options} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChartShip;
