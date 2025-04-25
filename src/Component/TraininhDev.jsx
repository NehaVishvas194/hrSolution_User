import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/3.png";
// import iconTrain from "../Image/goals.webp";
import img1 from "../Image/learing1.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";

const TraininhDev = () => {
  const navigate = useNavigate();
  const ContactUs = () => {
    navigate("/ContentAs");
  };

  const [traning, setTraning] = useState([]);

  const handleGetTraning = () => {
    axios
      .get(`${baseUrl}get_training_development_Details`)
      .then((response) => {
        setTraning(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetTraning();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <div>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              {traning.map((curElm, index) => (
                <div key={index}>
                  <h2>{curElm.Heading}</h2>
                  <p className="mt-2">
                    {curElm.Description1}{" "}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-50 pb-50">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="image3"> <img src={img1} alt="trainingImage" /></div>
            </div>
            <div className="col-lg-6">
              {traning.map((curElm, index) => (
                <div key={index}>
                  <h2 className="mb-4">{curElm.Heading}</h2>
                  <div className="heading3" dangerouslySetInnerHTML={renderHTML(curElm.Description)}></div>
                </div>
              ))}
              <button
                onClick={ContactUs}
                className="b-btn job_area_btn mt-2"
                href="job-grid"
              >
                Contact Us <i className="fi fi-sr-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TraininhDev;