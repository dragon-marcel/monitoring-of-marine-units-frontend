import axios from 'axios';
import  { useState,useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../../style/Map.css";
import "../../style/Modal.css"
import { MapContainer, TileLayer, FeatureGroup, Rectangle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ShipMarker from "../../components/marker/ShipMarker";
import { URL_API,URL_SOCKET } from "../../helper/URL";
import SockJsClient from "react-stomp";
import { Modal } from "react-bootstrap";
import { FaHistory, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

let zoom = 11;
let position = [63.4989, 10.39094];

function zoomShip(map, x, y) {
  zoom = 20;
  position = [x, y];
  map.setView(position, zoom);
}
function Map() {
  let username = localStorage.getItem("user");
  const [ships, setShips] = useState([]);
  const [shipModal, setShipModal] = useState([]);
  const [trackModal, setTrackModal] = useState([]);
  const [trackedLenght, setTrackedLenght] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [positionMapModal, setPositionMapModal] = useState([0, 0]);
  const redOptions = { color: "rgb(69, 72, 103)" };
  const rectangle = [ [63.3989, 10.09094], [63.5989, 10.67047]];
  const [map, setMap] = useState(null);


  const FetchShip = async () => {

    try {
      const { data } = await axios.get(URL_API+`/ships/${username}`);
      setShips(data);
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    FetchShip();
  }, []);
  
  let onConnected = () => {
    console.log("Connected WS tracked!!");
  };

  function showVal(val) {
    setTrackModal(shipModal.track[val]);
  };

  let onMessageReceived = (msg) => {
    setShips(msg);
  };
  
  const handleShow = (ship) => {
    setShipModal(ship);
    setTrackModal(ship.track[0]);
    setTrackedLenght(ship.track.length - 1);
    setPositionMapModal([
      ship.currentPoint.xcoordinate,
      ship.currentPoint.ycoordinate,
    ]);
    setShow(true);
  };

  function splitDateTime(datetime) {
    if (datetime !== undefined) {
      let dateTime = datetime.split("T");
      const date = dateTime[0];
      const time = dateTime[1].substring(0, 8);
      return (
        <div>
          {date} {time}
        </div>
      );
    }
  }
  return (
    <div>
      <Navbar />
      <div id="map" className="map-container">
        <MapContainer center={position} zoom={zoom} ref={setMap} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
         
          {ships.map((ship) => (
            <ShipMarker xcoordinate={ship.currentPoint.xcoordinate} ycoordinate={ship.currentPoint.ycoordinate} props={ship} tracked={true} popupVisable={true} />
              ))};
          <FeatureGroup pathOptions={redOptions}>
            <Rectangle bounds={rectangle} />
          </FeatureGroup>
        </MapContainer>

        <div className="ship-table-container">
          <div id="tracked-ships-caption">Tracked ships</div>
          <hr></hr>
          <table className="table" id="ship-table">
            <thead>
              <tr>
                <th> Ship name </th>
                <th> Ship mmsi </th>
                <th> Ship X coordinate </th>
                <th> Ship Y coordinate </th>
                <th> Active</th>
                <th> History</th>
              </tr>
            </thead>
            <tbody>
              {ships.map((ship) => (
                <tr key={ship.name}>
                  <td>
                    <a href="#map" style={{ color: "rgb(132, 138, 190" }} 
                          onClick={() => zoomShip( map,
                          ship.currentPoint.xcoordinate,
                          ship.currentPoint.ycoordinate )} >
                      <span className="ship-link">{ship.name}</span>
                    </a>
                  </td>
                  <td>{ship.mmsi}</td>
                  <td>{ship.currentPoint.xcoordinate}</td>
                  <td>{ship.currentPoint.ycoordinate}</td>
                  <td>{ship.active ? ( <FaRegCheckCircle color="green" size={20} /> ) :
                   (<FaRegTimesCircle color="red" size={20} />)}
                  </td>
                  <td>
                    <FaHistory size={20} onClick={() => { handleShow(ship) }}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SockJsClient
       url={URL_SOCKET}
        topics={[`/topic/ships/tracked/${username}`]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected! treacked")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <Modal show={show} onHide={handleClose} animation={true} size="lg" aria-labelledby="example-modal-sizes-title-lg" >
        <Modal.Header id="modal-header">
          <Modal.Title>History of {shipModal.name}</Modal.Title>
          <button id="x-button" onClick={handleClose}> X </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <MapContainer weight="10px" className="map-history" center={positionMapModal} zoom={11} ref={setMap} scrollWheelZoom={true} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ShipMarker xcoordinate={trackModal.xcoordinate} ycoordinate={trackModal.ycoordinate} props={shipModal} tracked={true} popupVisable={false}/>
              <FeatureGroup pathOptions={redOptions}></FeatureGroup>
            </MapContainer>
            <input type="range" min="0" max={trackedLenght} class="form-range" id="range" onChange={(e) => showVal(e.target.value)} />
            <table className="table">
              <thead>
                <tr>
                  <th>mmsi </th>
                  <th>x coordinate </th>
                  <th>x coordinate </th>
                  <th>time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{shipModal.mmsi}</td>
                  <td>{trackModal.xcoordinate}</td>
                  <td>{trackModal.ycoordinate}</td>
                  <td>{splitDateTime(trackModal.createDateTime)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Map;
