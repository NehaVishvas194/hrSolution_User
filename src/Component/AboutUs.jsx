import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/AboutAs.png";
import img1 from "../Image/blackOne.jpg";
import img2 from "../Image/blackTwo.webp";
import img3 from "../Image/blackThree.jpg";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import { useState } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [row, setRow] = useState([]);
  const [row1, setRow1] = useState([]);
  const [ourMission, setOurMission] = useState([]);
  const [ourCommitment, setOurCommitment] = useState([]);
  const [getStart, setGetStart] = useState([])

  const handeGetdata = () => {
    axios
      .get(`${baseUrl}get_aboutUS_details`)
      .then((response) => {
        // console.log(response.data.Details);
        setRow(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handeGetVision = () => {
    axios
      .get(`${baseUrl}get_ourVission_details`)
      .then((response) => {
        // console.log(response.data.Details,'VISION DATAAAAAAAAAAAAAAAAAAAAA');
        setRow1(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetMission = () => {
    axios
      .get(`${baseUrl}get_ourMission_details`)
      .then((response) => {
        console.log(response.data.Details);
        setOurMission(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetCommitment = () => {
    axios
      .get(
        `${baseUrl}get_ourCommitment_details 
`
      )
      .then((response) => {
        console.log(response.data.Details);
        setOurCommitment(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetStartedTodayDetails = () => {
    axios
      .get(
        `${baseUrl}get_started_todayDetails 
`
      )
      .then((response) => {
        console.log(response.data.Details);
        setGetStart(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handeGetdata();
    handeGetVision();
    handleGetMission();
    handleGetCommitment();
    handleGetStartedTodayDetails()
  }, []);

  return (
    <>
      <div className="aboutWrapper">
        <Header />
        <section
          className="gridBanner"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2>About Us</h2>
                <p className="mt-2">Professionalism Defined!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="about__area">
          <div className="container">
            <div className="row">
              {/* <div className="col-lg-6">
                <div className="aboutimageMain">
                  <div className="d-flex  justify-content-center">
                    <div className="aboutImgFirst">
                      <img src={img1} alt="" />
                    </div>
                    <div className="aboutImgSec">
                      <img src={img3} alt="" />
                    </div>
                  </div>
                  <div className="aboutImgThird">
                  <img src={img2} alt="" />
                  </div>
                </div>
              </div> */}
              <div className="col-lg-12">
                <div className="smartProfesion">

                  {row.map((info, i) => (
                    <div key={i}>
                      <h3 className="lrBorder1 mb-4"><span></span>{info.Heading}<span></span></h3>
                      <p>{info.Description}</p>
                    </div>
                  ))}

                  {/* <div className="parentCheck">
                    <div>
                      <i class="fi fi-sr-check"></i>   
                    </div>
                    <div>
                      <h6>Inspired Design Decisions With Neville Brody</h6>
                    </div>
                  </div> */}
                  {/* <div className="parentCheck">
                    <div>
                      <i class="fi fi-sr-check"></i>
                    </div>
                    <div>
                      <h6>Embrace The Possibilities March Wallpapers</h6>
                    </div>
                  </div> */}
                  {/* <div className="parentCheck">
                    <div>
                      <i class="fi fi-sr-check"></i>
                    </div>
                    <div>
                      <h6>When You Find Good Idea Look For Better One</h6>
                    </div>
                  </div> */}
                  <div
                    className="section-bt mt-4"
                    style={{ textAlign: "center" }}
                  >
                    <Link to='/Vacancy'> <button className="b-btn job_area_btn" href=" ">
                      Browse All Jobs <i class="fi fi-sr-arrow-right"></i>
                    </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="specialFeature">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {getStart.map((info) => (
                  <div className="text-center">
                    <h3 className="getStart">{info.Heading}</h3>
                    <p>
                      {info.Description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4 col-md-4 p-0">
                <div className="flexibleStaffing">
                  <i class="fi fi-rs-star"></i>
                  {row1.map((curelm, e) => (
                    <div key={e}>
                      <h3>{curelm.Heading}</h3>
                      <p>
                        {curelm.Description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 p-0">
                <div className="flexibleStaffing ourMission">
                  <i class="fi fi-rr-chart-network"></i>
                  {ourMission.map((curElm, a) => (
                    <div key={a}>
                      <h3>{curElm.Heading}</h3>
                      <p>{curElm.Description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 p-0">
                <div className="flexibleStaffing">
                  <i class="fi fi-ts-code-commit"></i>
                  {ourCommitment.map((curElm, r) => (
                    <div key={r}>
                      <h3>{curElm.Heading}</h3>
                      <p> {curElm.Description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
