import React, { useState, useRef } from "react";
import { Button, Card, CardGroup, ListGroup, Container, Modal, Form } from "react-bootstrap";
import { Navbars } from "../components";
import email from "../assets/emailIc.svg";
import lock from "../assets/lockIc.svg";
import tenants from "../assets/tenantIc.svg";
import gender from "../assets/genderIc.svg";
import phone from "../assets/phoneIc.svg";
import address from "../assets/addressIc.svg";
import profile from "../assets/profile.jpg";
import { API } from "../lib/_api";
import { useQuery } from "react-query";
import jwt from "jwt-decode";

export function Profile(props) {
  const hiddenFileInput = useRef(null);
  const getProfile = JSON.parse(localStorage.getItem("UserSignUp"));
  const [image, setImage] = useState("");
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  const [checkIn, setCheckin] = useState({
    check_in: "",
    check_out: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckInOut = (e) => {
    setCheckin({
      ...checkIn,
      [e.target.name]: e.target.value,
    });
  };

  let { data: tenant } = useQuery("profileCache", async () => {
    const responseuser = await API.get(`/user/` + decode.id);
    return responseuser.data.data;
  });
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);

  const handleLocal = () => {
    setShow(true);
    localStorage.setItem("Date", JSON.stringify(checkIn));
  };
  return (
    <>
      <Navbars />
      <CardGroup style={{ marginBlock: "10rem" }}>
        <Container
          className="shadow row row-cols-2 mx-auto"
          style={{
            boxShadow: "0px 0px 4px rgba(5, 5, 5, 0.08)",
            marginTop: "3rem",
            width: "58rem",
            minHeight: "10rem",
            borderRadius: "1x",
            borderWidth: "3px",
            borderColor: "#FFFFFF",
            backgroundColor: "white",
          }}
        >
          <div>
            <Card.Header className="fw-bold fs-3 " style={{ marginBottom: "1rem" }}>
              Personal Info
            </Card.Header>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img src={require("../assets/profileIc.svg")} alt="" style={{ marginTop: "1rem" }} />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.fullname}</div>Full Name
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={email}
                alt=""
                style={{
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto mt-1">
                <div className="fw-bold">{tenant?.email}</div> Email
              </div>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="me-auto">
              <img
                src={lock}
                alt=""
                style={{
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <Button onClick={handleShow} variant="password " className="fw-bold color text-info ">
                Change Password
              </Button>
              <div className="ms-5 mb-3">{tenant?.password}</div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={tenants}
                alt=""
                style={{
                  marginBottom: "1rem",
                  width: "30px",
                  height: "34px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.listAs}</div>
                Status
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={gender}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.gender}</div> Gender
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={phone}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.phone}</div> Mobile Phone{" "}
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <img
                src={address}
                alt=""
                style={{
                  marginBottom: "1rem",
                  marginTop: "1rem",
                  width: "30px",
                  height: "25px",
                  backgroundColor: "white",
                }}
              />
              <div className="ms-2 me-auto">
                <div className="fw-bold">{tenant?.address}</div>
                Address
              </div>
            </ListGroup.Item>
          </div>
          <div>
            <Card
              className="col-md-2 offset-6 mt-3"
              variant="primary"
              style={{ width: "220px", border: "none" }}
            >
              <Card.Img
                src={image === "" ? profile : image}
                style={{ width: "220px", height: "300px" }}
              />
              {/* <Card.Img src={image === null ? profile : image} style={{ width: "220px" }} /> */}
              <label htmlFor="input-pic">
                <Button
                  onClick={handleClick}
                  className="mt-2 fw-bold"
                  variant="primary"
                  style={{ width: "220px" }}
                >
                  Change Photo Profile
                </Button>
                <input
                  onChange={(e) => {
                    setImage(URL.createObjectURL(e.target.files[0]));
                    handleChange();
                  }}
                  id="input-pic"
                  type="file"
                  ref={hiddenFileInput}
                  // style={{ backgroundColor: " black", width: "100px", zIndex: "-5" }}
                  style={{ display: "none" }}
                />
              </label>
            </Card>
          </div>
        </Container>
        <Modal
          //   style={{ backgroundColor: "red" }}
          centered
          show={show}
          onHide={handleClose}
          className="d-flex justifycontent-center w-100"
        >
          <Modal.Header
            className="d-flex align-middle  justify-content-center"
            style={{ border: "none" }}
          >
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
                controlId="exampleForm.ControlInput1"
              >
                {/* <h4 className="text-center">Today is {today}</h4> */}
                <Form.Label htmlFor="old-password" style={{ fontWeight: "bold" }}>
                  Old Password
                </Form.Label>
                <Form.Control
                  onChange={handleCheckInOut}
                  id="old-password"
                  name="old-password"
                  type="password"
                  rows={1}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                style={{ display: "flex", flexDirection: "column" }}
                controlId="exampleForm.ControlInput1"
              >
                {/* <Calendar name="check_out" onChange={handleCheckInOut} /> */}
                <Form.Label htmlFor="new-password" style={{ fontWeight: "bold" }}>
                  New Password
                </Form.Label>
                <Form.Control
                  onChange={handleCheckInOut}
                  id="new-password"
                  name="new-password"
                  type="password"
                  rows={1}
                />
                <Form.Label htmlFor="confirm-password" style={{ fontWeight: "bold" }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  onChange={handleCheckInOut}
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  rows={1}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button
              variant="primary"
              onClick={() => {
                handleLocal();
              }}
              style={{ backgroundColor: "#5A57AB", width: "200px", border: "none" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </CardGroup>
    </>
  );
}
