
import Routers from './route/Routes'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import SockJsClient from 'react-stomp';
import { setAuthToken } from './helper/AuthToken'
import {URL_SOCKET } from "./helper/URL";
function App() {

  const token = localStorage.getItem("token");

  let onConnected = () => {
    console.log("Connected!!")
  }
  let onMessageReceived = (msg) => {
    if(token != null)
      toast.warning(msg);
  }

  if (token) {
    setAuthToken(token);
  }

  return (
    <div className="App">
        <SockJsClient
        url={URL_SOCKET}
        topics={['/topic/info']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}/>
      <ToastContainer position="bottom-right" pauseOnHover="true"/>
      <Routers />
    </div>
  );
}

export default App;
