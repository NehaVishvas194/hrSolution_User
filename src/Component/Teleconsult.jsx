import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/6.jpg";
import consult1 from "../Image/HR Teleconsultation.webp";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import { useNavigate } from "react-router-dom";

const Teleconsult = () => {
  const [data, setData] = useState("");

  const handleTeleConsultancy = () => {
    axios
      .get(`${baseUrl}get_hr_teleconsultation_Details`)
      .then((response) => {
        console.log((response.data.Details), 'Tele Consultancy');
        setData(response.data.Details);

        // console.log(typeof(items));

        // if (typeof items === 'object' && !Array.isArray(items)) {
        //     const itemsArray = Object.values(items);
        //     setData(itemsArray);
        //   } else {
        //     setData(items);
        //     // console.log("helloo")
        //   }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleTeleConsultancy();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  const navigate = useNavigate();
  const ContactUs = () => {
    navigate("/ContentAs");
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
              <h2>{data.Heading}</h2>
              <p className="mt-2">
                {data.Description1}{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mt-5 mb-5">
          <div className="card mb-4">
            <div className="row g-0 align-items-center">
              <div className="col-md-4">
                <div className="card-body">
                  <img src={consult1} className="img3" alt="..." />
                </div>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">
                    <p className="heading3" dangerouslySetInnerHTML={renderHTML(data.Description)}></p>
                  </p>
                </div>
                <div className="AddOnButtonDiv contact-btn"> <button
                  onClick={ContactUs}
                  className="b-btn job_area_btn"
                  href="job-grid"
                >
                  Contact Us <i className="fi fi-sr-arrow-right" />
                </button></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Teleconsult;