import axios from "axios";
import { useState,useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../style/Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer,TileLayer,FeatureGroup,Rectangle} from "react-leaflet";
import ShipMarker from "../../components/marker/ShipMarker";
import { URL_API, URL_SOCKET } from "../../helper/URL";
import SockJsClient from "react-stomp";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

let zoom = 11;
let position = [63.4989, 10.39094];
const redOptions = { color: "rgb(69, 72, 103)" };
const rectangle = [[63.3989, 10.09094],[63.5989, 10.67047],];

function zoomShip(map, x, y) {
  zoom = 20;
  position = [x, y];
  map.setView(position, zoom);
}

function Map() {
  const [map, setMap] = useState(null);
  let onConnected = () => {
    console.log("Connected WS Map!!");
  };
  const [ships, setShips] = useState([]);

  let onMessageReceived = (msg) => {
    setShips(msg);
  };
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
  }, []);
  return (
    <div>
      <Navbar />
      <div id="map" className="map-container">
        <MapContainer center={position} zoom={zoom} ref={setMap} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ships.map((ship) => (
            <ShipMarker xcoordinate={ship.currentPoint.xcoordinate} ycoordinate={ship.currentPoint.ycoordinate} props={ship} tracked={false} popupVisable={true} />
          ))};
          <FeatureGroup pathOptions={redOptions}>
            <Rectangle bounds={rectangle} />
          </FeatureGroup>
        </MapContainer>
        <div className="ship-table-container">
          <div id="tracked-ships-caption">Ships online</div>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th> Ship name </th>
                <th> Ship mmsi </th>
                <th> Ship X coordinate </th>
                <th> Ship Y coordinate </th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {ships.map((ship) => (
                <tr key={ship.name}>
                  <td>
                    <a href="#map" style={{ color: "rgb(132, 138, 190" }} 
                    onClick={() => zoomShip( map, ship.currentPoint.xcoordinate, ship.currentPoint.ycoordinate )} >
                      <span className="ship-link">{ship.name}</span>
                    </a>
                  </td>
                  <td>{ship.mmsi}</td>
                  <td>{ship.currentPoint.xcoordinate}</td>
                  <td>{ship.currentPoint.ycoordinate}</td>
                  <td>{ship.active ? (<FaRegCheckCircle color="green" size={20} /> ) : (<FaRegTimesCircle color="red" size={20} /> )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SockJsClient url={URL_SOCKET} topics={["/topic/ships"]} onConnect={onConnected} onDisconnect={console.log("Disconnected!")} onMessage={(msg) => onMessageReceived(msg)}/>
    </div>
  );
}

export default Map;
