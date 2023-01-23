import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { URL_API, URL_AVATAR } from "../../helper/URL";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import "../../style/Page.css";
import "../../style/Modal.css";

function UserEdit() {
  const Images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,];

  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const id_user = localStorage.getItem("id");
  const history = useHistory();
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [enabled, setEnable] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const errors = [];
  function setAvatarNumer(nr) {
    setAvatar(nr);
    handleClose();
  }
  useEffect(() => {
    async function GetUserbyId() {
      try {
        const { data } = await axios.get(URL_API + `/users/${id}`);
        setUsername(data.username);
        setEmail(data.email);
        setEnable(data.enabled);
        setRole(data.role);
        setAvatar(data.avatar);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    GetUserbyId();
  },[])

  const validate = () => {
    const errors = {};
    const rexgen = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!username) {
      errors.username = "Password is username";
    }
    if (!email) {
      errors.email = "Email is required!";
    } else if (!rexgen.test(email)) {
      errors.email = "Invalid email";
    }
    if (role === "" && isAdmin) {
      errors.role = "Role is required";
    }
    if (enabled === "" && isAdmin) {
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
      editUser();
    }
  });
  const editUser = async () => {
    const edituser = { id, username, email, enabled, role, avatar };

    axios
      .put(URL_API + `/users/${id}`, edituser)
      .then((response) => {
        if (id_user === id) localStorage.setItem("avatar", avatar);

        toast.success("Edited user:" + username);
        history.goBack();
      })

      .catch((error) => {
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
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header id="modal-header">
          <Modal.Title>Choose avatar</Modal.Title>
          <button id="x-button" onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body>
          <div class="d-flex align-content-around flex-wrap">
            {Images.map((nr_avatar) => {
              return (
                <img onClick={() => { setAvatarNumer(nr_avatar)}} src={URL_AVATAR + nr_avatar + `.png`} alt = "avatar" class="avatar" width="100px" height="100px"/>);})}
          </div>
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <button id="modal-open-user-btn" onClick={handleClose}> Cancel </button>
        </Modal.Footer>
      </Modal>
      <div id="precontainer">
        <div id="container-ou">
          <div id="caption">Edit user</div>
          <hr />
          <form id="form-ou">
            <div className="avatar-container">
              <img onClick={() => { handleShow(); }} src={URL_AVATAR + avatar + `.png`} alt="avatar" class="avatar" width="100px" height="100px"  />
            </div>
            <div className="form-outline mb-3">
              <label htmlFor="username" className="modal-label" id="modal-label-ou" > Username </label>
              <input type="text" id="form-control-modal-ou" name="username" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} required  />
              <p>{formErrors.username}</p>
            </div>
            <div className="form-outline mb-3 ">
              <label htmlFor="email" className="modal-label" id="modal-label-ou" > Email</label>
              <input type="email" id="form-control-modal-ou" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required />
              <p>{formErrors.email}</p>
            </div>
            {isAdmin ? (
              <div className="select-container">
                <div className="form-outline mb-3">
                  <label htmlFor="text" className="modal-label" id="modal-label" > Active </label>
                  <select id="select-control" value={enabled} onChange={(e) => setEnable(e.target.value)}>
                    <option value="">-</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <p>{formErrors.active}</p>
                </div>
                <div className="form-outline mb-3">
                  <label htmlFor="text" className="modal-label" id="modal-label" > Role </label>
                  <select id="select-control"  onChange={(e) => setRole(e.target.value)} value={role} required >
                    <option value="">-</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                  </select>
                  <p>{formErrors.role}</p>
                </div>
              </div>) : ( "" )}
            <div className="button-container">
              <button id="modal-user-btn-ou" onClick={(event) => { event.preventDefault();
                                                                   handleSubmit(); }} > Edit
              </button>
              <button id="modal-user-btn-ou" onClick={(event) => { event.preventDefault();
                                                                  history.goBack(); }}> Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
