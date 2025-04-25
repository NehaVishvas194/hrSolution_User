import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import logo from '../Image/logo.png';
import qrImg from '../Image/qr.svg';
import star from '../Image/star.png';
import search from '../Image/search.png';
import { baseUrl } from '../Api/BaseUrl';
import moment from 'moment';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';

export default function QuiceJob() {
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const jobId2 = location.state;
  const jobId = location.state?.jobId;
  // const footerId =location.state;
  // console.log("jobId-----",jobId,"footerId==========",typeof(footerId))


  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`${baseUrl}getJob/${jobId}`);
        setInformation(response.data.Details);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const multiStep = (e, id, isPsychometricTest, psychometric_Test) => {
    e.preventDefault();
    if (isPsychometricTest === 1) {
      navigate('/PsychometricTest', { state: { data: psychometric_Test } });
    } else {
      navigate('/multistepform', { state: { data: id } });
    }
  };

  // if (!information) {
  //   return <div>Job information could not be loaded.</div>;
  // }

  return (
    <>
      <Header />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <section className="blogBanner8">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ">
              <h1>Job Details</h1>
              <p>
                At Smart Start SL Ltd., we specialise in advertising job vacancies for a diverse range of organisations. Whether you're looking to start your career or take the next step, we connect talented individuals with rewarding opportunities across various industries. Discover your next role and grow your career with us!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="jobDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {parseInt(information?.template_type) === 2 ? (
                <div className="jobTemplate">
                  {/* Template Type 2 Content */}
                  <div className="container">
                    <div className="row">
                      <div className="parentJobTemp">
                        <div className="leftJob">
                          <div className="logoArea">
                            <img src={logo} alt="Logo" />
                          </div>
                          <div className="qrcode">
                            <img src={qrImg} alt="QR Code" />
                          </div>
                          <p className="qrDown">Scan to download</p>
                          <div className="contactDetailJob">
                            <h5>Contact Us</h5>
                            <p>Phone: {information?.phone_no}</p>
                            <p>Address:  {information?.company_address}</p>
                          </div>
                        </div>
                        <div className="rightJob">
                          <div className="d-flex pt-50">
                            <div>
                              <i className="fi fi-br-circle-user"></i>
                            </div>
                            <div>
                              <h1>
                                <span>Areata</span> Base <br /> {information?.job_title}
                              </h1>
                            </div>
                          </div>
                          <div className="jobDesTemp">
                            <h5>Job Description :</h5>
                            <ul>
                              <li>{information?.job_Description}</li>
                            </ul>
                          </div>
                          <div className="jobDesTemp">
                            <h5>Key Responsibilities :</h5>
                            <ul>
                              <li>{information?.job_Responsibility ? information?.job_Responsibility : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, error sit iure ut deleniti est repellendus maxime quia"}</li>
                            </ul>
                          </div>
                          <div className="jobDesTemp">
                            <h5>Requirements :</h5>
                            <ul>
                              {information?.job_Responsibility ? information?.job_Responsibility : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, error sit iure ut deleniti est repellendus maxime quia"}
                            </ul>
                          </div>
                          <div className="jobDesTemp">
                            <h5>Preferred Qualifications:</h5>
                            <ul>
                              <li>{information?.key_qualification}</li>
                            </ul>
                          </div>
                          <div className="jobDesTemp">
                            <h5>Benefits :</h5>
                            <ul>
                              <li>A UI designer designs the graphical user interface of an app</li>
                              <li>website, or device that a human interacts with.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-50 shortSecJob">
                  {/* Other Template Content */}
                  <div className="container">
                    <div className="row">
                      <div className="shortempSec">
                        <div className="d-flex justify-content-end">
                          <div className="logoSecShort">
                            <img src={logo} alt="Logo" />
                          </div>
                        </div>
                        <div className="weHiring">
                          <h2>we are <br /> <span className="Hiring">Hiring</span></h2>
                          <p className="freshIntern"><span> {information?.job_schedule} -</span> {information?.job_title} </p>
                          <p className="deadline">
                            Deadline <i className="fi fi-bs-angle-small-right"></i>{moment(information?.endDate).format("DD-MM-YYYY")}
                          </p>
                          <div className="qualiSec">
                            <div className="buttonqual">
                              <button>Qualification</button>
                            </div>
                            <div className="bgProven">
                              <div className="proven">
                                <div>
                                  <img src={star} alt="Star" />
                                </div>
                                <div>
                                  <p>{information?.key_qualification ? information?.key_qualification : "Proven working experience in visual graphic design graphics."}</p>
                                </div>
                              </div>
                              <div className="proven">
                                <div>
                                  <img src={star} alt="Star" />
                                </div>
                                <div>
                                  <p>Proven working experience in visual graphic design graphics.</p>
                                </div>
                              </div>
                              <div className="proven">
                                <div>
                                  <img src={star} alt="Star" />
                                </div>
                                <div>
                                  <p>Proven working experience in visual graphic design graphics.</p>
                                </div>
                              </div>
                            </div>
                            <div className="search">
                              <img src={search} alt="Search" />
                            </div>
                          </div>
                        </div>
                        <div className="socialMediaParent">
                          <div className="yellowSocial">
                            <div className="socialChild">
                              <i className="fab fa-facebook-f"></i>
                            </div>
                            <div className="socialChild">
                              <i className="fab fa-twitter"></i>
                            </div>
                            <div className="socialChild">
                              <i className="fab fa-youtube"></i>
                            </div>
                            <div className="socialChild">
                              <i className="fab fa-instagram"></i>
                            </div>
                          </div>
                          <div className="cvSec">
                            <p>Send your CV and portfolio to :</p>
                            <p className="gmailJob"> {information?.employee_email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="sideDetails">
                <div className="applyDetails">
                  <button onClick={(e) => multiStep(e, information?.jobId, information?.isPsychometricTest, information?.psychometric_Test)}>Apply for job</button>
                </div>
                <h4>Job Overview</h4>
                <div className="bgSide">
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-money"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">employee email</p>
                      <p>{information?.employee_email} {information?.phone_no}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-transgender-alt"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Company address</p>
                      <p>{information?.company_address}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-graduation-cap"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Company name</p>
                      <p>{information?.company_name}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-industry"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Industry</p>
                      <p>{information?.company_Industry}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-history"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Experience</p>
                      <p>{information?.Experience}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-university"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Qualification</p>
                      <p className='truncate'>{information?.key_qualification}</p>
                    </div>
                  </div>
                </div>
                <h5>Job Location</h5>
                <div className="mapDetail">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11382320.295574686!2d29.995966!3d45.853565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2sUkraine!5e0!3m2!1sen!2sus!4v1706943512911!5m2!1sen!2sus"
                    height={350}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
