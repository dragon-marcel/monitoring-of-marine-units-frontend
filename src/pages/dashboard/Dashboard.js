import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../../components/navbar/Navbar";
import LineChartShip from "../../components/chart/LineChartShip";
import DoughnutChartShip from "../../components/chart/DoughnutChart";
import AmountChart from "../../components/chart/AmountChart";
import {URL_API} from '../../helper/URL';
import axios from 'axios';
import { useState, useEffect } from "react";

function DashBoard() {
  let username = localStorage.getItem('user');

  const [amountDataInArea, setAmountDataInArea] = useState({});
  const [haveDataAmountInArea, setHaveDataAmountInArea] = useState(false);
  
  const [amountDataOutArea, setAmountDataOutArea] = useState({});
  const [haveDataAmountOutArea, setHaveDataAmountOutArea] = useState(false);
  
  const [amountDataTracked, setAmountDataTracked] = useState({});
  const [haveDataTracked, setHaveDataTracked] = useState(false);

  const [amountDataMovable, setAmountDataMovable] = useState({});
  const [haveDataMovable, setHaveDataMovable] = useState(false);
  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(URL_API+ `/chart/amount/inarea`);
          setAmountDataInArea(data)
          setHaveDataAmountInArea(true)
        } catch (error) {
          setHaveDataAmountInArea(false)
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      const fetchDataOutArea = async () => {
        try {
          const { data } = await axios.get(URL_API+ `/chart/amount/outarea`);
          setAmountDataOutArea(data)
          setHaveDataAmountOutArea(true)
        } catch (error) {
          setHaveDataAmountOutArea(false)
        }
      };
      fetchDataOutArea();
    }, []);
    
    useEffect(() => {
      const fetchDataTracked = async () => {
        try {
          const { data } = await axios.get(URL_API+`/chart/amount/tracked/${username}`);
          setAmountDataTracked(data)
          setHaveDataTracked(true)
        } catch (error) {
          setHaveDataTracked(false)
        }
      };
      fetchDataTracked();
    }, []);

    useEffect(() => {
      const fetchDataMovable = async () => {
        try {
          const { data } = await axios.get(URL_API+`/chart/amount/movable`);
          setAmountDataMovable(data)
          setHaveDataMovable(true)
        } catch (error) {
          setHaveDataMovable(false)
        }
      };
      fetchDataMovable();
    }, []);

  return (
    <div>
      <Navbar />
      <div id="headline">DashBoard </div>
      <br></br>
      <div class="px-5">
        <div class="row">
          <AmountChart title="Amount of ship in area" haveData = {haveDataAmountInArea} amount={amountDataInArea}/>
          <AmountChart title="Amount of ship out area" haveData = {haveDataAmountOutArea} amount={amountDataOutArea}/>
          <AmountChart title="Amount of ship movable" haveData = {haveDataMovable} amount={amountDataMovable}/>
          <AmountChart title="Amount of tracked ship" haveData = {haveDataTracked} amount={amountDataTracked}/>
        </div>
        <div class="row">
          <LineChartShip />
          <DoughnutChartShip />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
