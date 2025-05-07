import React from "react";
import icone1 from "../Image/icon-1.webp";
import needJob from "../Image/needJob.png";
import icone2 from "../Image/icon-3.webp";
import icone3 from "../Image/icon-2.webp";
import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../Api/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const [heade, setHeade] = useState([]);
  const [job, setJob] = useState([]);
  const [post, setPost] = useState([]);
  const [market, setMarket] = useState([]);
  const navigate = useNavigate();
  const handleHeaderdata = () => {
    axios
      .get(`${baseUrl}cms_getJobs_posted_procedure_section1`)
      .then((res) => {
        // console.log(res.data.Details)
        setHeade(res.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleJobdata = () => {
    axios
      .get(`${baseUrl}cms_get_need_any_job_section`)
      .then((res) => {
        // console.log(res.data.Details)
        setJob(res.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePOstdata = () => {
    axios
      .get(`${baseUrl}get_cms_post_your_job`)
      .then((res) => {
        // console.log(res.data.Details)
        setPost(res.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleMarketData = () => {
    axios
      .get(`${baseUrl}cms_getjob_market_data`)
      .then((res) => {
        // console.log(res.data.Details)
        setMarket(res.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleHeaderdata();
    handleJobdata();
    handlePOstdata();
    handleMarketData();
  }, []);

  const handleclicknavi = () => {
    navigate("/showjobs");
  };
  const handleclickApply = () => {
    navigate("/Signin");
  };
  const handleUploadResume = () => {
    navigate("/UploadResume");
  };
  return (
    <section className="services__area pt-80 pb-50">
      <div className="container">
        <div className="row wow fadeInDown">
          <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
            {heade.map((info) => (
              <div className="section-title text-center mb-45">
                <h2>{info.Heading}</h2>
                <p>{info.Description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow fadeOut AddnewMargin"
            data-wow-delay="100ms"
          >
            {job.map((info) => (
              <div className="services__item grey-bg transition-3 text-center ">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone1} alt="" />
                </div>
                <div className="services__content flex-grow-1">
                  <h2>{info.Heading}</h2>
                  <p> {info.Description} </p>
                </div>
                <div className="position-relative">
                  <p className="b-btn b-btn-green" onClick={handleclicknavi}>
                    Apply Job <i className="fi fi-sr-arrow-right" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow fadeOut AddnewMargin"
            data-wow-delay="500ms"
          >
            {post.map((info) => (
              <div className="services__item grey-bg transition-3 text-center ">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone2} alt="" />
                </div>

                <div className="services__content flex-grow-1">
                  <h2>{info.Heading}</h2>
                  <p> {info.Description} </p>
                </div>
                <div className="position-relative">
                  <p className="b-btn b-btn-green" onClick={handleclickApply}>
                    Post Job <i className="fi fi-sr-arrow-right" />
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow fadeOut AddnewMargin"
            data-wow-delay="1000ms"
          >
            {market.map((info) => (
              <div className="services__item grey-bg transition-3 text-center ">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone3} alt="" />
                </div>
                <div className="services__content flex-grow-1">
                  <h2>{info.Heading}</h2>
                  <p> {info.Description} </p>
                </div>
                <div className="position-relative">
                  <p className="b-btn b-btn-green" onClick={handleUploadResume}>
                    Upload CV <i className="fi fi-sr-arrow-right" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
