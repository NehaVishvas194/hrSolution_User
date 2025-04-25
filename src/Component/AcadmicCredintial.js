import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/2.png";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import Swal from 'sweetalert2'
const AcadmicCredintial = () => {
  const [academicData, setAcademicData] = useState("");
  const [name, setName] = useState('')
  const [Phone, setPhone] = useState('')
  const [Email, setEmail] = useState('')
  const [Subject, setSubject] = useState('')
  const [Message, setMessage] = useState('')
  const [blogErr, setBlogErr] = useState(false);

  const handlsubmit = (e) => {
    e.preventDefault()
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

    if (!Phone|| !/^\d{10}$/.test(Phone))  {
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
    axios.post(`${baseUrl}create_contactUS`, {
      name: name,
      email: Email,
      phone_no: Phone,
      message: Message,
      subject: Subject
    }).then((response) => {
      console.log(response)
      Swal.fire({
        title: "Data saved successfully!",
        text: "You clicked the button!",
        icon: "success"
      });
      setBlogErr(false);
      setName('')
      setEmail('')

      setPhone('')
      setMessage('')
      setSubject('')
    }).catch((error) => {
      console.log(error)
    })
    console.log({
      name,
      Email,
      Phone,
      Message,
      Subject

    })
  }
  const handleAcademic = () => {
    axios
      .get(`${baseUrl}get_acadmic_credentials_verifier`)
      .then((response) => {
        console.log(response.data);
        setAcademicData(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleAcademic();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <div className="acadmic-wrapper">
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>{academicData.Heading}</h2>
              <p className="mt-2">
                {academicData.Description1}{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="allJobSec">
        <div className="container">
          <div className="row">
            <div className="justify-content-center mt-4">
              <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 ">
                <h3 style={{ textAlign: "center" }}>{academicData.Heading}</h3>
                <p style={{ textAlign: "center", color: "#DCAF2F" }} dangerouslySetInnerHTML={renderHTML(academicData.Description)}></p>
                <p  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mapSec">
          <div className="row">
            <div className="col-lg-6 col-md-6 wow slideInLeft col-sm-12">
              <div className="bannnerleftContent ">
                <h1 className="bannerh1">Why Choose Us?</h1>
                <h5 className="bannerH5">Accuracy:</h5>
                <p className="bannerpara">
                  We provide precise and thorough verification, leaving no room
                  for doubt.
                </p>

                <h5 className="bannerH5">Trust:</h5>
                <p className="bannerpara">
                  Build confidence with stakeholders by guaranteeing the
                  authenticity of academic credentials.
                </p>

                <h5 className="bannerH5">Speed:</h5>
                <p className="bannerpara">
                  Our streamlined process delivers fast and reliable results.
                </p>
                <p className="bannerpara">
                  Empower your hiring process, educational partnerships, and
                  professional evaluations with our trusted verification
                  service. Ensure integrity and excellence with Academic
                  Credential Verifier – where trust meets education.
                </p>

                {/* <div className="mapIconParent">
                  <div className="mapIcon">
                    <LocalPhoneIcon />
                  </div>
                  <div className="maptext">
                    <h5>Call us</h5>
                    <p>Phone : +23272065065 +23288353535</p>
                  </div>
                </div> */}
                {/* <div className="mapIconParent">
                  <div className="mapIcon">
                    <EmailIcon />
                  </div>
                  <div className="maptext">
                    <h5>Email us</h5>
                    <p>info@smartstart.sl</p>
                  </div>
                </div> */}
                {/* <div className="mapIconParent">
                  <div className="mapIcon">
                    <RoomIcon />
                  </div>
                  <div className="maptext">
                    <h5>Head Office</h5>
                    <p>
                      Head Office:1 Jangah Close, Main Peninsular Road, Baw Baw
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="contactFormdata">
                <h5>To inquire, please send us a message</h5>
                <form className="row g-3 pt-3" onSubmit={handlsubmit} >
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
                        if (e.key.match(/[0-9]/)) {
                          e.preventDefault();
                        }
                      }}

                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !name
                        ? "*Please Enter Your  Name"
                        : ""}
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
                      {blogErr && !Phone
                        ? "*Please Enter Your Phone No"
                        : ""}
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
                      {blogErr && !Email
                        ? "*Please Enter Your Email"
                        : ""}
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
                      {blogErr && !Subject
                        ? "*Please Enter Your Subject"
                        : ""}
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
                      {blogErr && !Message
                        ? "*Please Enter Your Message"
                        : ""}
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
    </div>
  );
};

export default AcadmicCredintial;
