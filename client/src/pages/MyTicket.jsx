import { Table, Container, Button, Modal, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { RoomsContext } from "../context/roomsContext";
import React, { useContext, useState, useEffect } from "react";
import { Navbars } from "../components";
import dotOutLine from "../assets/dotOutLine.svg";
import dotFill from "../assets/dotFill.svg";
import lineBooking from "../assets/lineBooking.svg";
import Logo from "../assets/Logo.svg";
import { API } from "../lib/_api";
import { useQuery } from "react-query";
import Moment from "react-moment";
import jwt from "jwt-decode";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export function MyBooking() {
  const navigate = useNavigate();
  const { room } = useParams();
  const getToken = localStorage.getItem("token");
  const decode = jwt(getToken);
  let { data: property, refetch } = useQuery("propertyCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get(`/property/` + room, config);
    return response.data.data;
  });
  console.log("ini property", property);
  let { data: tenant } = useQuery("userCache", async () => {
    const response = await API.get(`/user/` + decode.id);
    return response.data.data;
  });
  console.log(tenant);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getData = JSON.parse(localStorage.getItem("Date"));
  // const getProfile = JSON.parse(localStorage.getItem("UserSignUp"));
  // console.log(getProfile);

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/createtransaction", {
        checkin: getData.check_in,
        checkout: getData.check_out,
        property_id: property.id,
        user_id: tenant.id,
        total: property.price,
        status: "Pending",
        // attachment: "image.png",
      });

      const tokenBaru = response.data.data.token;
      console.log("habis add transaction tokennnnnn : ", response.data.data.token);

      // const token = response.data.data.token;
      console.log("ini tokennnnn", response);
      console.log("ini tokennnnnbaru", tokenBaru);

      window.snap.pay(tokenBaru, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-KIN72obBiBI22Ax0";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // -----------------------------------------------------

  return (
    <Container>
      <Navbars />
      <Row style={{ marginTop: "15rem" }}>
        <div
          style={{
            marginTop: 30,
            boxShadow: "0px 0px 1px",
            borderRadius: 10,
            padding: "0px 30px 0px 30px",
          }}
        >
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div className="p-4">
              <img src={Logo} width={110} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2 className="p-3">Booking</h2>
              <Moment format="DD MMMM YYYY">
                <h5>{getData.check_in}</h5>
              </Moment>
            </div>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <div>
              <h3 className="md-5">{property?.name}</h3>
              <Col md={8}>
                <p>
                  {property?.address},{property?.city.name}
                </p>
                <div
                  className=" align-middle"
                  style={{
                    height: "2rem",
                    backgroundColor: "rgba(255, 153, 0, 0.1)",
                    width: "15rem",
                  }}
                >
                  <p className="text-center" style={{ fontSize: "1.2rem", color: "#FF9900" }}>
                    Waiting Payment
                  </p>
                </div>
              </Col>
              <img src="/img/prove.svg" alt="" />
            </div>
            <div style={{ marginRight: -80, marginTop: 10 }}>
              <img src="/img/prove.svg" alt="" />
            </div>
            <div>
              <Col st md={15}>
                <div className="d-flex gap-3">
                  <div className="d-grid gap-1 " style={{ marginTop: "-2rem" }}>
                    <img
                      className="d-flex justify-content-center"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        color: "black",
                      }}
                      src={dotOutLine}
                      alt="dot"
                    />

                    <img
                      className="bg-primary"
                      src={lineBooking}
                      alt="line"
                      style={{ marginInline: ".8rem", height: "7rem" }}
                    />
                    <img
                      className="d-flex justify-content-center"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        color: "black",
                      }}
                      src={dotFill}
                      alt="dot"
                    />
                  </div>
                  <div>
                    <h5>Check-In</h5>
                    <Moment format="DD MMMM YYYY">{getData?.check_in}</Moment>

                    <h5>Check-Out</h5>
                    <Moment format="D MMMM YYYY">{getData?.check_out}</Moment>
                  </div>
                </div>
              </Col>
            </div>
            <div>
              <div>
                <h5>Amenities</h5>

                {property?.amenities.map((amenity, k) => (
                  <span
                    key={k}
                    style={{
                      padding: "4px",
                      width: "5.5rem",
                      backgroundColor: "white",
                      top: "35px",
                      left: "20px",
                      marginLeft: "5px",
                      borderRadius: "5px",
                      color: "grey",
                    }}
                    variant="primary"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
              <div>
                <h5>Type of Rent</h5>
                <p style={{ color: "grey" }}>{property?.type_rent}</p>
              </div>
            </div>
            <div>
              <div
                className="d-flex border border-4 border-dark"
                style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <img
                  src={require("../assets/nota.png")}
                  alt=""
                  style={{ width: 150, height: "auto" }}
                />
              </div>
              <h7 className="text-secondary">Uploaded payment proof</h7>
            </div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td style={{ color: "grey" }}>{tenant?.fullname}</td>
                <td style={{ color: "grey" }}>{tenant?.gender}</td>
                <td style={{ color: "grey" }}>{tenant?.phone}</td>
                <td style={{ fontWeight: "bold" }}>Long Time rent</td>
                <td>:</td>
                <td style={{ fontWeight: "bold" }}>1 Year</td>
              </tr>
              <tr>
                <td colSpan={5} style={{ fontWeight: "bold" }}>
                  Total
                </td>
                <td>:</td>
                <td style={{ fontWeight: "bold", color: "red" }}> Rp.{property.price}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            style={{ width: 200, marginTop: "2rem" }}
            onClick={() => handleTransaction.mutate()}
          >
            PAY
          </Button>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Body>
              Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam Untuk melihat pesanan{" "}
              <a href={`/bookingPending/`}>Klik Disini</a> Terimakasih
            </Modal.Body>
          </Modal>
        </div>
      </Row>
    </Container>
  );
}
export default MyBooking;
