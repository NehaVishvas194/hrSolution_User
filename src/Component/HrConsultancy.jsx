import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/12.png";
import img5 from "../Image/i.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Api/BaseUrl";
const HrConsultancy = () => {
  const [details, setDetails] = useState([]);

  const navigate = useNavigate();
  const ContactUs = () => {
    navigate("/ContentAs");
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}getHr_consultancy_Details`)
      .then((response) => {
        // console.log(response.data.Details)
        setDetails(response.data.Details);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
              {details.map((cur, i) => (
                <div key={i}>
                  <h2>{cur.Heading}</h2>
                  <p className="mt-2">
                    {cur.Description1}{" "}
                  </p>


                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      <section>
        <div className="container my-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-5">
              <div className="image3" style={{ "height": "400px", "width": "100%" }}><img src={img5} /></div>
            </div>
            <div className="col-lg-7">
              {details.map((curElm, index) => (
                <div key={index}>
                  <h2 className="mb-4">{curElm.Heading}</h2>
                  <p className="heading3" dangerouslySetInnerHTML={renderHTML(curElm.Description)}></p>

                </div>
              ))}
              <div className="AddOnButtonDiv">
                <button
                  onClick={ContactUs}
                  className="b-btn job_area_btn"
                  href="job-grid"
                >
                  Contact Us <i className="fi fi-sr-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div >
  );
};

export default HrConsultancy;
