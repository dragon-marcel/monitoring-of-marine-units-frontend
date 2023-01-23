import { FaShip } from "react-icons/fa";
import { IconContext } from "react-icons";
import { setAuthToken } from "../../helper/AuthToken";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {URL_AVATAR } from "../../helper/URL";
import "../../style/Navbar.css";

function Navbar() {
  const history = useHistory();
  const activeStyle = { color: "#fbfbfb" };
  const logOut = () => {

      localStorage.removeItem("token");
      localStorage.removeItem("avatar");
      localStorage.removeItem("user");
      setAuthToken(null);
      history.push("/login");
      toast.success("Safely logged out");
    
  };
  
  return (
    <div>
      <header className="header">
        <IconContext.Provider value={{ className: "nav-icon" }}>
          <div id="left-nav-item" className="nav-item" onClick={() => {window.location.href = "/homepage"}}>
            <FaShip /> Monitoring of marine units
          </div>
        </IconContext.Provider>
        <ul className="nav-main-links">
          <li>
            <NavLink to="/homepage" activeStyle={activeStyle} activeClassName="active-link">
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeStyle={activeStyle} activeClassName="active-link">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" activeStyle={activeStyle} activeClassName="active-link">
              Map
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracked-ships" activeStyle={activeStyle} activeClassName="active-link" >
              Tracked ships
            </NavLink>
          </li>
          <li>
            <NavLink to="/ships"  activeStyle={activeStyle} activeClassName="active-link">
              Ships
            </NavLink>
          </li>
          <li>
            <NavLink to="/type" activeStyle={activeStyle} activeClassName="active-link">
              Type
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeStyle={activeStyle} activeClassName="active-link">
              Users
            </NavLink>
          </li>
          <li>
            <Link onClick={() => logOut()}>
              Logout
            </Link>
          </li>
        </ul>
      </header>
      <div className="nav-login-info">
        <div className="nav-login-caption">
          Username: <label  style={{color:"white"}}>{localStorage.getItem("user")}</label> &nbsp;
          Role: <label style={{color:"white"}}>{localStorage.getItem("role")}</label> &nbsp;
          <Link to={`/user/edit/${localStorage.getItem("id")}`} style={{ color: "rgb(132, 138, 190)" }}>
          <img src={URL_AVATAR + localStorage.getItem("avatar") +`.png`} alt="avatar"
              class="avatar" width="25px" height="25px"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
