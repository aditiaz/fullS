import React, { useContext, useState } from "react";
import * as Components from "../components";
import bed from "../assets/bed.svg";
import bathub from "../assets/bathub.svg";
import { Button, Col, Modal, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { API } from "../lib/_api";
import { useQuery } from "react-query";

export const DetailProperty = () => {
  const today = moment().format(" Do MMMM YYYY");
  // const { rooms } = useContext(RoomsContext);
  const { room } = useParams();
  // const detailRoom = rooms[room - 1];
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { data: property } = useQuery("propertyCache", async () => {
    const response = await API.get(`/property/` + room);
    return response.data.data;
  });
  // console.log(propety);
  const [checkIn, setCheckin] = useState({
    check_in: "",
    check_out: "",
  });
  // console.log(checkIn);
  const handleCheckInOut = (e) => {
    setCheckin({
      ...checkIn,
      [e.target.name]: e.target.value,
    });
  };
  const handleLocal = () => {
    setShow(true);
    localStorage.setItem("Date", JSON.stringify(checkIn));
  };
  // console.log(detailRoom);
  return (
    <>
      <Components.Navbars />;
      <Col className="my-5" style={{ marginInline: "10rem" }}>
        <Col className="w-100  detailPics">
          {/* <Col className="" style={{ backgroundColor: "green", height: "45rem" }}> */}
          <img
            style={{ width: "100%", height: "35rem", marginTop: "65px" }}
            src={`http://localhost:5000/uploads/${property?.image}`}
            alt="pics"
          />
          {/* </Col> */}
        </Col>
        <Col className="d-flex justify-content-between mt-3 detailPics detailPicsSmall">
          <div>
            <img src={`http://localhost:5000/uploads/${property?.image}`} alt="pics" />
          </div>
          <div>
            <img src={`http://localhost:5000/uploads/${property?.image}`} alt="pics" />
          </div>
          <div>
            <img src={`http://localhost:5000/uploads/${property?.image}`} alt="pics" />
          </div>
        </Col>
        <Col>
          <h1 className=""> {property?.name_property}</h1>
          <div
            className="d-flex mt-3 justify-content-between"
            // style={{ backgroundColor: "salmon" }}
          >
            <div className="p-0 col-8">
              <p style={{ fontSize: "2rem", backgroundColor: "white" }}>
                Rp.{property?.price} / {property?.type_of_rent}
              </p>
              <p className="text-secondary" style={{ fontSize: "1rem", width: "20rem" }}>
                {property?.address},{property?.city}
              </p>
            </div>
            <div
              className="d-flex col-4 justify-content-between"
              //   style={{ backgroundColor: "green" }}
            >
              <div className="text-secondary">
                <h5>Bedrooms</h5>
                <div className="d-flex justify-content-center">
                  <div className="d-flex mt-2 justify-content-around  text-black  w-100">
                    <h3>{property?.bedroom}</h3>
                    <img src={bed} alt="" />
                  </div>
                </div>
              </div>
              <div className="text-secondary">
                <h5>Bathrooms</h5>
                <div className="d-flex justify-content-center">
                  <div className="d-flex mt-2 justify-content-around  text-black  w-100">
                    <h3>{property?.bathroom}</h3>
                    <img src={bathub} alt="" />
                  </div>
                </div>
              </div>
              <div className="text-secondary">
                <h5>Area</h5>
                <div className="d-flex justify-content-center">
                  <div className="d-flex mt-2 justify-content-around  text-black  w-100">
                    <h3 className="fw-bold">1000 ft</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="fw-bold">Description</h1>
          <p className="text-secondary ">{property?.description}</p>
          {localStorage.Roles == "Tenant" ? (
            <>
              <div className="d-flex justify-content-end w-100 my-5">
                <Button
                  className="click fw-bold"
                  style={{ width: "15rem", height: "3.5rem", fontSize: "1.5rem" }}
                  onClick={handleShow}
                >
                  Book Now
                </Button>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header className="d-flex align-middle  justify-content-center">
                  <Modal.Title>How long will you stay ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      style={{ display: "flex", flexDirection: "column" }}
                      controlId="exampleForm.ControlInput1"
                    >
                      <h4 className="text-center">Today is {today}</h4>
                      <Form.Label style={{ fontWeight: "bold" }}>Check-in</Form.Label>
                      <input type="date" name="check_in" onChange={handleCheckInOut} />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      style={{ display: "flex", flexDirection: "column" }}
                      controlId="exampleForm.ControlInput1"
                    >
                      {/* <Calendar name="check_out" onChange={handleCheckInOut} /> */}
                      <Form.Label style={{ fontWeight: "bold" }}>Check-Out</Form.Label>
                      <input
                        type="date"
                        data-provide="datepicker"
                        name="check_out"
                        onChange={handleCheckInOut}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleLocal();
                      navigate(`/booking/${room}`);
                    }}
                    style={{ backgroundColor: "#5A57AB", width: 200 }}
                  >
                    Order
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Col>
    </>
  );
};
