
import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

import { URL_API } from "../../helper/URL";

function Ships() {
  const [ships, setShips] = useState([]);
  const FetchShip = async () => {
    try {
      const { data } = await axios.get(URL_API + "/ships");
      setShips(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    FetchShip();

  }, [ships]);

  return (
    <div>
      <Navbar />

      <div id="precontainer">
        <div id="container">
          <div id="caption">Ships</div>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th> Ship name </th>
                <th> Ship mmsi </th>
                <th> In area </th>
                <th> Active </th>
                <th> Type </th>
              </tr>
            </thead>
            <tbody>
              {ships.map((ship) => (
                <tr key={ship.name}>
                  <td> {ship.name}</td>
                  <td>{ship.mmsi}</td>
                  <td>
                    {ship.inArea === true ? (
                      <FaRegCheckCircle color="green" size={20} />) :
                       (<FaRegTimesCircle color="red" size={20} />)}
                  </td>
                  <td>
                    {ship.active === true ? ( <FaRegCheckCircle color="green" size={20} />) : 
                    ( <FaRegTimesCircle color="red" size={20} /> )}
                  </td>
                  <td>{ship.type.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ships;
