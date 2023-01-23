import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { URL_API } from "../../helper/URL";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../../style/Modal.css"


function UserAdd() {
  const history = useHistory();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [enabled, setEnable] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const avatar = 1;

  const validate = () => {
    const errors = {};
    const rexgen = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!username) {
      errors.username = "Password is username";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must use more than 8 characters";
    }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!rexgen.test(email)) {
      errors.email = "Invalid email";
    }
    if (role === "") {
      errors.role = "Role is required";
    }
    if (enabled === "") {
      errors.active = "Active is required";
    }
    return errors;
  };

  const handleSubmit = () => {
    setFormErrors(validate());
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      createUser();
    }
  });

  const createUser = async () => {
    const createuserdata = { username, password, email, enabled, role, avatar };
    axios
      .post(URL_API + "/users", createuserdata)
      .then((response) => {
        toast.success("Added new user:" + username);
        history.goBack();
      })

      .catch((error) => {
        const errors = {};
        if ((error.response.status = 409)) {
          errors.username = error.response.data.message;
          setFormErrors(errors);
        } else {
          toast.error(error.response.data.message);
        }
      });
  };
  return (
    <div>
      <Navbar />
      <div id="precontainer">
        <div id="container-ou">
          <div id="caption">Create user </div>
          <hr />
          <form id="form-ou">
            <div className="form-outline mb-3">
              <label htmlFor="username" className="modal-label" id="modal-label-ou"> Username </label>
              <input type="text" id="form-control-modal-ou" name="username" className="form-control" onChange={(e) => setUsername(e.target.value)} />
              <p>{formErrors.username}</p>
            </div>
            <div className="form-outline mb-3">
              <label htmlFor="password" className="modal-label" id="modal-label-ou"> Password </label>
              <input type="password" id="form-control-modal-ou" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
              <p>{formErrors.password}</p>
            </div>
            <div className="form-outline mb-3 "><label htmlFor="email" className="modal-label" id="modal-label-ou"> Email </label>
              <input type="email" id="form-control-modal-ou" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
              <p>{formErrors.email}</p>
            </div>
            <div className="select-container">
              <div className="form-outline mb-3">
                <label htmlFor="text" className="modal-label" id="modal-label"> Active </label>
                <select id="select-control" onChange={(e) => setEnable(e.target.value)}>
                  <option value="">-</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <p>{formErrors.active}</p>
              </div>
              <div className="form-outline mb-3">
                <label htmlFor="text" className="modal-label" id="modal-label"> Role </label>
                <select id="select-control" onChange={(e) => setRole(e.target.value)}>
                  <option value="">-</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
                <p>{formErrors.role}</p>
              </div>
            </div>
            <div className="button-container">
              <button id="modal-user-btn-ou" onClick={(event) => {event.preventDefault();
                                                                  handleSubmit()}}>Add
              </button>
              <button id="modal-user-btn-ou" onClick={(event) => {event.preventDefault();
                                                                  history.goBack(); }}>Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
