import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { URL_API,URL_AVATAR } from "../../helper/URL";
import { Link } from "react-router-dom";
import { FaRegCheckCircle, FaRegTimesCircle, FaEdit } from "react-icons/fa";
import "../../style/Page.css"
import "../../style/Table.css"

function UserList() {
  const [userlist, setUserList] = useState({ list: [] });

  const FetchData = async () => {
    const { data } = await axios.get(URL_API + "/users");
    setUserList({ list: data });
  };

  useEffect(() => {
    FetchData();
  }, [setUserList]);

  return (
    <div>
      <Navbar />
      <br />
      <div id="precontainer">
        <div id="container">
          <div id="caption">
            Users
            {localStorage.getItem("role") === "ADMIN" ? ( <Link to="/user/add" id="modal-user-btn"> Create user</Link>) :
             ("")}
          </div>
          <hr></hr>
          <table className="table" id="table">
            <thead>
              <tr>
                <th> ID </th>
                <th> Photo </th>
                <th> Username </th>
                <th> Email </th>
                <th> Active </th>
                <th> Role </th>
                {localStorage.getItem("role") === "ADMIN" ? ( <th> Edit </th> ) : ( "" )}
              </tr>
            </thead>
            <tbody>
              {userlist.list &&
                userlist.list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img
                        src={URL_AVATAR + item.avatar + `.png`} class="avatar" width="25px" height="25px" alt="avatar" />
                    </td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      {item.enabled === true ? 
                       ( <FaRegCheckCircle color="green" size={20} />) :
                       ( <FaRegTimesCircle color="red" size={20} />)}
                    </td>
                    <td>{item.role}</td>
                    {localStorage.getItem("role") === "ADMIN" ? (
                    <td><Link to={`user/edit/${item.id}`} style={{ color: "rgb(132, 138, 190)" }}> <FaEdit size={20} />
                        </Link> </td>) : ( "" )}
                  </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
