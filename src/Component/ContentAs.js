import React, { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import contactus from "../Image/8.png";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
export default function ContentAS() {
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");
  const [blogErr, setBlogErr] = useState(false);

  const handlsubmit = (e) => {
    e.preventDefault();

    setBlogErr({
      name: false,
      Company: false,
      Phone: false,
      Email: false,
      Subject: false,
      Message: false,
    });
    // Validate the input fields
    if (!name) {
      setBlogErr((prevState) => ({ ...prevState, name: true }));
    }

    if (!Phone || !/^\d{10}$/.test(Phone)) {
      setBlogErr((prevState) => ({ ...prevState, Phone: true }));
    }

    if (!Email) {
      setBlogErr((prevState) => ({ ...prevState, Email: true }));
    }
    if (!Subject) {
      setBlogErr((prevState) => ({ ...prevState, Subject: true }));
    }
    if (!Message) {
      setBlogErr((prevState) => ({ ...prevState, Message: true }));
    }

    // If any field is empty, stop the submission
    if (!name || !Phone || !Email || !Subject || !Message) {
      return;
    }
    axios
      .post(`${baseUrl}create_contactUS`, {
        name: name,
        email: Email,
        phone_no: Phone,
        message: Message,
        subject: Subject,
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: "Data saved successfully!",
          text: "You clicked the button!",
          icon: "success",
        });
        setBlogErr(false);
        setName("");
        setEmail("");

        setPhone("");
        setMessage("");
        setSubject("");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log({
      name,
      Email,
      Phone,
      Message,
      Subject,
    });
  };
  return (
    <>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${contactus})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>Contact Us </h2>
              <p className="mt-2">
                {" "}
                Do not hesitate to contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mapSec bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 wow slideInLeft col-sm-12">
              <div className="bannnerleftContent ">
                <h5 className="bannerH5">GET IN TOUCH</h5>
                <h1 className="bannerh1">
                  Do not hesitate to contact us for more information.
                </h1>
                <p className="bannerpara">
                  Get in touch with us today and let's start transforming your
                  business together.
                </p>
                <div className="mapIconParent">
                  <div className="mapIcon">
                    <LocalPhoneIcon />
                  </div>
                  <div className="maptext">
                    <h5>Call us</h5>
                    <p className="mt-0">
                      Phone : +23272065065 <span> </span>+23288247000
                    </p>
                  </div>
                </div>
                <div className="mapIconParent">
                  <div className="mapIcon">
                    <EmailIcon />
                  </div>
                  <div className="maptext">
                    <h5>Email us</h5>
                    <a href="mailto:info@smartstart.sl">
                      <p>info@smartstart.sl</p>
                    </a>
                  </div>
                </div>
                <div className="mapIconParent">
                  <div className="mapIcon">
                    <RoomIcon />
                  </div>
                  <div className="maptext">
                    <h5>Head Office</h5>
                    <p className="mt-0">
                      Head Office:1 Jangah Close, Main Peninsular Road, Baw Baw
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="contactFormdata">
                <form className="row g-3" onSubmit={handlsubmit}>
                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="inputEmail4" className="form-label">
                      Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      value={name}
                      onKeyPress={(e) => {
                        if (e.key.match(/[^a-zA-Z]/)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !name ? "*Please Enter Your  Name" : ""}
                    </span>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label htmlFor="inputAddress" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Phone"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                        if (value.length <= 10) {
                          setPhone(value);
                        }
                      }}
                      name="Phone"
                      value={Phone}
                    />

                    <span style={{ color: "red" }}>
                      {blogErr && !Phone ? "*Please Enter Your Phone No" : ""}
                    </span>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <label htmlFor="inputAddress2" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      name="Email"
                      value={Email}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !Email ? "*Please Enter Your Email" : ""}
                    </span>
                  </div>
                  <div className="col-md-12 col-sm-12">
                    <label htmlFor="inputCity" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCity"
                      placeholder="Subject"
                      onChange={(e) => setSubject(e.target.value)}
                      name="Subject"
                      value={Subject}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !Subject ? "*Please Enter Your Subject" : ""}
                    </span>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="inputState" className="form-label">
                      Message
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      defaultValue={"                             "}
                      onChange={(e) => setMessage(e.target.value)}
                      name="Message"
                      value={Message}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !Message ? "*Please Enter Your Message" : ""}
                    </span>
                  </div>

                  <div className="col-lg-12">
                    <div className="bannerBtnHome text-center">
                      <button>
                        {" "}
                        Send <i className="fa fa-arrow-right" />{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}