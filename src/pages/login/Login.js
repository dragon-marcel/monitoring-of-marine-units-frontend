import '../../style/Page.css';
import { FaShip } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import axios from 'axios';
import { setAuthToken } from "../../helper/AuthToken"
import { useState } from 'react';
import {URL_API} from '../../helper/URL';
import { toast } from 'react-toastify';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = () => {

    const loginPayload = { username, password }

    axios.post(URL_API+"/auth", loginPayload)
      .then(response => {

        const token = response.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", response.data.username)
        localStorage.setItem("role", response.data.role)
        localStorage.setItem("id", response.data.id)
        localStorage.setItem("avatar", response.data.avatar)

        setAuthToken(token);

        if (response.status >=200 || response.status <= 299) {
          toast.success("Loggin in "+username);

          window.location.href = '/homepage'
        }

      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.status);
        } 

        if (err.response.status < 200 || err.response.status > 299) { 
          toast.error("Invalid username or password")
        
        }
    })
};

  return (
    <html>
      <body>
        <div className="navbar-login">
          <IconContext.Provider value={{ className: "react-icons-login" }}>
            <div id="left-nav-item-login" className="nav-item"><FaShip /> Monitoring of marine units</div>
          </IconContext.Provider>
        </div>       
         <div className="login-container">
          <form onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }} className="form-login" id="form-login">
            <p id="caption-login"> Login </p>
            <div className="form-outline mb-3">
              <label htmlFor="username" className="form-label-login" id="form-label-login">Username</label>
              <input type="text" id="form-control-login" name="username" className="form-control" required value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-outline mb-3 ">
              <label htmlFor="password" className="form-label-login" id="form-label-login">Password</label>
              <input type="password" id="form-control-login" name="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-outline mb-2">              
              <input type="submit" className="shadow btn btn-dark btn-block mb-4" value="SIGN IN" id="btn-primary-login" />
            </div>
          </form>
        </div>
      </body>
    </html>
  );
}
export default Login