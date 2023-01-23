import axios from "axios";
import { URL_API } from "../../helper/URL";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const options = {
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
function LineChartShip() {
  const [chartData, setChartData] = useState(null);
  const [haveData, setHaveData] = useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(URL_API + `/chart/line`);
      const dataChart = {
        labels: data.map((x) => x.label),
        datasets: [
          {
            label: "ship",
            data: data.map((x) => x.amount),
            borderColor: "rgb(102, 0, 204)",
            backgroundColor: "rgba(102, 0, 204, 0.5)",
          },
        ],
      };
      setChartData(dataChart);
      setHaveData(true); // here, and importantly after the above setChartData call
    } catch (error) {
      setHaveData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div class="col-sm-8">
      <div class="card mb-3">
        <div class="card-header">Ship in area per hour</div>
        <div class="card-body">
          <div class="p-3 justify-content-center">
            <div class="d-flex justify-content-center">
              {!haveData ? (<Spinner animation="border" />) :
               ( <Line data={chartData} options={options} /> )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineChartShip;
