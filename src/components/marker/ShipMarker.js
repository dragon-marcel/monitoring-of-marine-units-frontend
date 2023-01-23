import {useState} from 'react';
import axios from 'axios';
import { Marker, Popup, Polyline } from "react-leaflet";
import { DivIcon } from "leaflet";
import { createMarker } from "../../helper/createMarker.ts"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {URL_API} from '../../helper/URL';
import Spinner from 'react-bootstrap/Spinner';


const notifySuccess = (messege) => {
  toast.success(messege);
}
const notifyError = (messege) => {
  toast.error(messege);
}
let username = localStorage.getItem('user');
async function trackedShip(mmsi){
 await axios.post(URL_API+ `/ships/username/${username}/mmsi/${mmsi}/add`).then((response) => {
  //api/ships/username/admin/mmsi/257057980/add
  notifySuccess("Added ship mmsi:" + mmsi + " to track.");
  console.log('response trak');
}).catch((error) => {
  notifyError(error);
})
}
async function untrakedShip(mmsi){
  await axios.post(URL_API+`/ships/username/${username}/mmsi/${mmsi}/remove`).then((response) => {
    notifySuccess("Delete tracked ship mmsi:" + mmsi);
  }).catch((error) => {
   notifyError(error);
 })
 }


 


const ShipMarker = ({xcoordinate,ycoordinate,props,tracked,popupVisable}) => {
  const popup = popupVisable;
  const position = [xcoordinate,ycoordinate];
  const ship = props;
  const [weather, setWeather] = useState({});
  async function getWeather(lat,lon){
    const { data } = await axios.get(URL_API+ `/weather/lat/${lat}/lon/${lon}`);
      setWeather(data);      
   }
  var track = [];
  let i = 0;
  ship.track.slice().reverse().forEach(t => {
    if (i < 10 || tracked === true) {
      track.push([t.xcoordinate, t.ycoordinate])
      i++;
    }
  });
  return (

    <Marker
      key={ship.mmsi}
      position={position}
      eventHandlers={{
        click: (e) => {
         getWeather(ship.currentPoint.xcoordinate,ship.currentPoint.ycoordinate)
        },
        
      }}
      icon={new DivIcon({ html: createMarker(ship.active), iconSize: [0, 0] })}>
{popup ?
      <Popup >
      <img width={250} height={250} src={`${ship.img}`} alt="ship"/><br/><br/>
        <b>name:</b> {ship.name}<br />
        <b>mmsi:</b> {ship.mmsi}<br />
        <b>type:</b> {ship.type.description}<br />
        <b>distance:</b> {ship.distance !== '' ? Math.round(ship.distance*1000):''} m <br />
        <b>speed:</b> {ship.speed} km/h<br />

        <b>x:</b> {ship.currentPoint.xcoordinate}<br />
        <b>y:</b> {ship.currentPoint.ycoordinate}<br />
        <b>destination:</b> {ship.destination}<br />

       
        {weather.city === undefined ? (<Spinner animation="border" />):   
  (<div> <br /><br />
  Weather: <img src={`http://openweathermap.org/img/wn/${weather.icon}.png`} alt="weather"/><br/>
  <b>city:</b>{weather.city}  <br />
    <b>temp:</b>{weather.temp} ℃ <br />
    <b>speed wind:</b>{weather.wind}  <br />
    <b>description:</b>{weather.description}  <br />
</div>)
}
<br />
        <button  onClick={() => {
          if(tracked){
            untrakedShip(ship.mmsi)
          }else{
            trackedShip(ship.mmsi)}} 
          }
          type="button" class="btn btn-outline-secondary btn-sm" >{tracked === true? 'untrack':'track'}</button>
      </Popup>:''}
      <Polyline pathOptions={{ color: "rgb(112, 117, 160)", opacity: 1.0 }} positions={track} />
    </Marker>
    
  );
};

export default ShipMarker;