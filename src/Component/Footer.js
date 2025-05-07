import React, { useEffect, useState } from "react";
import imgFooter from "../Image/footer-bg.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import whatsappIcon from "../Image/whtsp.png";

import { useTranslation } from "react-i18next";
import logo from "../Image/footerLogo.png";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [dataa, setDataa] = useState({});
  const [favjob, setFavjob] = useState([]);
  const [content, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getfavjob();
    getcontent();
  }, []);

  const getfavjob = () => {
    axios
      .get(`${baseUrl}get_All_favourite_jobs`)
      .then((response) => {
        setFavjob(response.data.all_fav);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getData = () => {
    axios
      .get(`${baseUrl}dashboard_counts`)
      .then((response) => {
        setDataa(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlenavigateactivecount = () => {
    navigate("/Vacancy");
  };

  const handlenavigateacclients123 = () => {
    navigate("/ContentAs");
  };
  
  // const handlenavigateacclients123 = () => {
  //   if (localStorage.getItem("empId")) {
  //     navigate("/GetAll_candidates");
  //   } else {
  //     navigate("/ContentAs");
  //   }
  //   navigate("/ContentAs");
  // };

  const getcontent = () => {
    axios
      .get(`${baseUrl}get_cms_footer_content`)
      .then((response) => {
        setContent(response.data.Details);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const addJobsData = (jobId) => {
    console.log(jobId);
    navigate("/QuiceJob", { state: { jobId } });
  };
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <>
      <footer>
        <div className="footer__area">
          <div
            className="footer__bg"
            style={{ backgroundImage: `url(${imgFooter})` }}
          />
          <div className="footer__top black-bg pt-80 pb-30 pb-50">
            <div className="container">
              <div className="row AddFooterClass justify-content-between">
                <div className="col-xl-4 col-lg-5 col-md-12">
                  <div className="footer__widget">
                    <div className="footer__widget-title mb-20">
                      <div className="logo">
                        <a href=" ">
                          <Link to="/">
                            <img src={logo} alt="Footer Logo" />
                          </Link>
                        </a>
                      </div>
                    </div>
                    <div className="footer__widget-content">
                      {content &&
                        content.length > 0 &&
                        content.map((item, index) => (
                          <p
                            className="mt-2"
                            style={{ fontSize: "14px" }}
                            key={index}
                            dangerouslySetInnerHTML={renderHTML(
                              item?.Description
                            )}
                          ></p>
                        ))}

                      <div className="footer__info d-sm-flex justify-content-between pr-40">
                        <div className="footer__info-item d-flex align-items-start mb-30">
                          <div className="icon mr-15">
                            <i className="fi fi-rr-gift" />
                          </div>
                          <div className="text">
                            <h4>
                              <span
                                className="counter"
                                onClick={handlenavigateactivecount}
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <span>{dataa?.active_jobs_count}</span>
                                  <span>+</span>
                                </div>
                              </span>
                            </h4>
                            <span
                              onClick={handlenavigateactivecount}
                              style={{ cursor: "pointer" }}
                            >
                              Available Jobs
                            </span>
                          </div>
                        </div>

                        <div className="footer__info-item d-flex align-items-start mb-30">
                          <div className="icon mr-15">
                            <i className="fi fi-rr-gift" />
                          </div>
                          <div className="text">
                            <h4>
                              <span
                                className="counter"
                                style={{ cursor: "pointer" }}
                              >
                                <div>
                                  <span onClick={handlenavigateacclients123}>
                                    {dataa?.all_clients_count}
                                  </span>
                                  <span>+</span>
                                </div>
                              </span>
                            </h4>
                            <span
                              onClick={handlenavigateacclients123}
                              style={{ cursor: "pointer" }}
                            >
                              Candidates Database
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="footer__widget pl-10">
                        <div className="footer__widget-title mb-20">
                          <h3>Learn & Grow</h3>
                        </div>
                        <div className="footer__widget-content">
                          <div className="footer__link">
                            <ul>
                              <li>
                                <NavLink to={"/onlinecourse"}>
                                  Online Courses
                                </NavLink>
                              </li>
                              {/* <Link to='/onlinecourse'>
                                <li>
                                  <NavLink to={'/onlinecourse'}>Smart Start Career Accelerator Packages</NavLink>

                                </li>
                              </Link> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="footer__widget pl-10">
                        <div className="footer__widget-title mb-20">
                          <h3>Information and Other Resources</h3>
                        </div>
                        <div className="footer__widget-content">
                          <div className="footer__link">
                            <ul>
                              <li>
                                <NavLink to={"/basiclabourtool"}>
                                  Basic Labour Tools
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to={"/CareerAdvice"}>
                                  Career Advice
                                </NavLink>
                              </li>
                              <Link to="/TermCondition">
                                <li>
                                  <NavLink to={"/TermCondition"}>
                                    Terms & Conditions
                                  </NavLink>
                                </li>
                              </Link>
                              <Link to="/PrivacyPolicy">
                                <li>
                                  <NavLink to={"/PrivacyPolicy"}>
                                    Privacy Policy
                                  </NavLink>
                                </li>
                              </Link>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="footer__widget pl-20">
                        <div className="footer__widget-title mb-20">
                          <h3>Job Seekers</h3>
                        </div>
                        <div className="footer__widget-content">
                          <div className="footer__link">
                            <ul>
                              <li>
                                <Link to={"/Vacancy"}>Vacancies</Link>
                              </li>
                              <li>
                                <Link to={"/UploadResume"}>Upload Your CV</Link>
                              </li>
                              <li>
                                <Link to={"/SuccessfulCandidates"}>
                                  Successful Candidates
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="footer__widget pl-10">
                        <div className="footer__widget-title mb-20">
                          <h3>Employers</h3>
                        </div>
                        <div className="footer__widget-content">
                          <div className="footer__link">
                            <ul>
                              <Link to="/Services">
                                <li>
                                  <a href="">Our Services</a>
                                </li>
                              </Link>
                              <li>
                                <Link to={"/SignUp"}>Post a Job</Link>
                              </li>
                              <li>
                                <Link to={"/SignUp"}>Sign up </Link>
                              </li>
                              <li>
                                <Link to={"/Signin"}>Sign in</Link>
                              </li>
                              {/* <li> <Link to="/Certificate">Psychometric test</Link>  </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-xl-5 col-lg-7">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      

                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                     
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-xl-3 col-lg-5 col-md-6">
                  
                </div> */}
              </div>
              <div className="footer__copyright black-bg">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xl-6 col-lg-6 col-md-7">
                      <div className="footer__copyright-text">
                        <p className="mb-0">
                          © Copyright 2024{" "}
                          <Link to="/">
                            <a href=" ">HR Solutions</a>
                          </Link>{" "}
                          All Rights Reserved.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-5">
                      <div className="footer__social theme-social f-right">
                        <ul className="mb-0">
                          <li>
                            <a
                              href="https://www.facebook.com/smartstart.sl?mibextid=LQQJ4d"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://x.com/SmartstartSL"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.linkedin.com/company/smart-start-sl-ltd/"
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i class="fab fa-linkedin"></i>
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.instagram.com/smartstart182?igsh=MXV3NG1sMmoycHd1YQ=="
                              rel="noreferrer"
                              target="_blank"
                            >
                              <i class="fab fa-instagram"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
