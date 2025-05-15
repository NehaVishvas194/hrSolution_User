import { React, useState, useEffect } from "react";
import Header from "./Header";
import partner from "../Image/WARD-Logo-Horizontal.jpg";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Banner from "../Image/7.png";
import coursesImg from "../Image/cours2.png";
import coursesImg2 from "../Image/online-course.png";
import { Link } from "react-router-dom";
import course1 from "../Image/course1.webp";
import OnlineIcon1 from "../Image/1.webp";
import pech from "../Image/pecb-logo.jpg";
import { baseUrl } from "../Api/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OnlineCourses = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();
  // const openCourse = () => {
  //     navigate('/https://worldacademy.uk/');
  // }
  const [value, setValue] = useState(2);
  const [sec, setSecond] = useState(2);
  const [third, setThird] = useState(2);
  const [online, setOnline] = useState([]);
  const [userMail, setUserMail] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetCmslabourToolDetails = () => {
    axios
      .get(
        `${baseUrl}get_all_courses_details?user_id=${localStorage.getItem(
          "UserId"
        )}`
      )
      .then((response) => {
        console.log(response.data.courses[0].is_user_enroll);
        setOnline(response.data.courses);
        // const StoreUser = online.map(())
        // setUserMail(StoreUser)
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(userMail);
  };

  useEffect(() => {
    handleGetCmslabourToolDetails();
  }, []);

  const renderHTML = (html) => {
    return { __html: html };
  };
  const handleCourshdetail = (e, id, enroll) => {
    navigate("/CourseDetail", {
      state: { data: online, coursId: id, enroll: enroll },
    });
  };

  const cancelUrl = "http://itdevelopmentservices.com/hrsolution/Cancel/";
  const receiptUrl = "http://itdevelopmentservices.com/hrsolution/SuccessPage/";

  const EnrolledIntoCourse = (price) => {
    // alert(price)

    axios
      .get(
        `${baseUrl}create_checkOut_session?total_amount=${price}&cancelUrl=${cancelUrl}&receiptUrl=${receiptUrl}&course_id=${localStorage.getItem(
          "coursID"
        )}&enroll_user_id=${localStorage.getItem("UserId")}`,
        {
          //     total_amount : Number(1200),
          //     cancelUrl : "http://192.168.1.49:4102/cancle" ,
          //    receiptUrl : "http://192.168.1.49:4102/"
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("sessionID", response.data.session_id);
        console.log(response.data.session_id);
        const checkoutUrl = response.data.checkoutUrl;

        console.log(checkoutUrl);
        if (response.status === 200) {
          window.location = checkoutUrl;
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handleCoursLogin = (e, courseID, price) => {
    localStorage.setItem("coursID", courseID);
    console.log(courseID);
    {
      localStorage.getItem("UserId")
        ? EnrolledIntoCourse(price)
        : navigate("/login");
    }
  };
  const hadleViewButton = (e, id) => {
    navigate("/MyCourseDetail", { state: { coursId: id } });
  };

  return (
    <div>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2> Online Courses </h2>
              <p className="mt-2">
                Enhance your skills with our comprehensive online courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="onlineSec pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5">
                            <div className="courseImg">
                                <img src={coursesImg} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-7 d-flex align-items-center col-md-7">
                            <div className='OnlineText'>
                                <h2>{online.Heading}</h2>
                                <p dangerouslySetInnerHTML={renderHTML(online.Description)}></p>
                                 
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

      <section className="onlineSec pt-50 mt-4 pb-3">
        <div className="container">
          <h2 className="lrBorder1" style={{ "font-size": "25px" }}>
            {" "}
            <span></span>Smart Start Career Accelerator<span></span>{" "}
          </h2>
          <div className="row mt-5 ">
            {online.length > 0 &&
              online.map((info) => (
                <div className="col-lg-3  col-md-6 col-sm-12 Course_body mb-4">
                  <div className="card course_inner_card">
                    <div className="card-body course_inne">
                      <img
                        src={`https://sisccltd.com/hrsolutions/${info.image}`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="flex-grow-1">
                        <h5 className="card-title">{info.Heading}</h5>
                        <p>
                          {info.Description.length > 20
                            ? `${info.Description.substring(0, 60)}...`
                            : info.Description}
                        </p>
                      </div>
                      <div className="position-relative d-flex justify-content-center">
                        {info.is_user_enroll === 1 ? (
                          <>
                            <a
                              onClick={(e) =>
                                hadleViewButton(
                                  e,
                                  info._id,
                                  info.is_user_enroll
                                )
                              }
                              className="b-btn"
                            >
                              start course
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              onClick={(e) =>
                                handleCourshdetail(
                                  e,
                                  info._id,
                                  info.is_user_enroll
                                )
                              }
                              className="b-btn me-2"
                            >
                              View more
                            </a>
                            <a
                              onClick={(e) =>
                                handleCoursLogin(e, info._id, info.price)
                              }
                              className="b-btn"
                            >
                              Enroll
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="features-section text-center  pt-30">
        <div className="container features-content">
          <h2 className="mb-5 lrBorder1">
            <span></span>Key Features<span></span>{" "}
          </h2>
          <div className="row">
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">Flexible Learning</h5>
                  <p>
                    Access courses anytime, anywhere, at your own pace, fitting
                    seamlessly into your schedule.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">Expert Instructors</h5>
                  <p>
                    Learn from seasoned professionals with extensive experience
                    in their respective fields, ensuring high-quality, relevant
                    content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">Diverse Topics</h5>
                  <p>
                    Explore a variety of courses covering essential areas such
                    as HR management, leadership, project management, and more.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">Interactive Content</h5>
                  <p>
                    Engage with interactive modules, quizzes, and assignments
                    that reinforce learning and practical application.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">Certification</h5>
                  <p>
                    Earn certificates upon completion, enhancing your
                    credentials and career prospects.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 feature-card">
              <div className="card">
                <div className="card-body">
                  <h5 className="feature-title">International Recognition</h5>
                  <p>
                    Earn globally recognised certificates that boost your
                    expertise and career prospects. Stand out to employers
                    worldwide, unlock new opportunities, and gain the
                    credibility needed to advance in your field.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="onlineSec pb-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-7  col-md-8 d-flex align-items-center">
              <div className="OnlineText">
                <h2>
                  Why Choose Our <span>Online Courses ?</span>
                </h2>
                <p>
                  Our online courses are designed to provide you with the
                  knowledge and skills needed to excel in today's competitive
                  environment. By partnering with international learning
                  institutions, we ensure that you receive globally recognised
                  education that meets the highest standards. Whether you're
                  looking to upskill yourself, train your team, or stay updated
                  with the latest industry trends, our courses offer valuable
                  insights and practical tools to help you succeed.
                </p>
                <p>
                  <strong>Start Learning Today</strong>
                </p>
                <p>
                  Unlock your potential with Smart Start SL Ltd.'s online
                  courses. Browse our course catalog, enroll today, and take the
                  first step towards achieving your professional aspirations.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-4">
              <div className="courseImg">
                <img src={coursesImg2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cardOnlinesec pb-50 pt-30">
        <div className="container">
          <div className="row">
            <h2 className="lrBorder1">
              {" "}
              <span></span> Learning and Development <span></span>
            </h2>
          </div>
          <div className="row pt-50 justify-content-around">
            <div className="col-md-5">
              <div className="cardMainOnline">
                <div className="cardOlineImg">
                  <img src={pech} alt="" />
                </div>
                <div className="cardContentCourse">
                  {/* <div className="parentTitle">
                                        <img src={OnlineIcon1} alt="" />
                                        <p>Nancy Reyes</p>
                                    </div> */}
                  {/* <h4> ISO/IEC 42001 Lead Implementer and Lead Auditor Training Courses</h4> */}
                  <div className="onlineBottom">
                    <div className="bannerBtnHome ">
                      <Link to="https://pecb.com/">
                        <button>
                          {" "}
                          Read More <i class="fi fi-sr-arrow-right"></i>{" "}
                        </button>
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="cardMainOnline">
                <div className="cardOlineImg">
                  <img src={partner} alt="" />
                </div>
                <div className="cardContentCourse">
                  {/* <div className="parentTitle">
                                        <img src={OnlineIcon1} alt="" />
                                        <p>Nancy Reyes</p>
                                    </div> */}
                  {/* <h4>
                                        World Academy For Research and Development
                                    </h4> */}
                  <div className="onlineBottom">
                    <div className="bannerBtnHome ">
                      <Link to="https://www.worldacademy.uk/">
                        <button>
                          {" "}
                          Read More <i class="fi fi-sr-arrow-right"></i>{" "}
                        </button>
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OnlineCourses;
