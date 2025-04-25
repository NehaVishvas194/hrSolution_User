import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/aboutOnline.jpg";
import AboutImg from "../Image/aboutCourses1.jpg";
import AboutImg1 from "../Image/aboutCourses2.png";
import AboutImg2 from "../Image/aboutCourses3.jpg";
import icone1 from "../Image/icon-1.webp";
import needJob from "../Image/needJob.png";
import icone2 from "../Image/icon-3.webp";
import icone3 from "../Image/icon-2.webp";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const ReadOnline = () => {
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
              <h2>About PECB</h2>
              <p className="mt-2">Find your all Online Courses Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Courses Area */}

      <section className="about__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="aboutimageMain">
                <div className="d-flex">
                  <div className="aboutImgFirst">
                    <img src={AboutImg} alt="" />
                  </div>
                  <div className="aboutImgSecond">
                    <img src={AboutImg1} alt="" />
                  </div>
                </div>
                <div className="aboutImgThird">
                  <img src={AboutImg2} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="smartProfesion">
                <div>
                  <small
                    style={{
                      fontSize: "2rem",
                      fontFamily: "sans",
                      fontWeight: "900",
                    }}
                  >
                    About Training Courses
                  </small>
                  <p>
                    With PECB training courses, opportunities are only limited
                    by your imagination. Regardless of your field of expertise,
                    PECB offers training courses that speak to your needs and
                    reflect the latest standards, technologies, approaches, most
                    innovative methods, and practical examples.
                  </p>
                </div>
                <div className="section-bt mt-4" style={{ textAlign: "left" }}>
                  <Link to="https://pecb.com/" target="_blank">
                    <button className="b-btn job_area_btn" href="job-grid">
                      Browse All Courses <i class="fi fi-sr-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Section Area */}

      <section className="services__area pt-80 pb-50">
        <div className="container">
          <div className="row wow fadeInDown">
            <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
              <div className="section-title text-center mb-45">
                <h2>Networks</h2>
                <p>
                  PECB supports the growth of your organization in the current
                  market by providing you with professional materials and
                  services you need to succeed in the industry.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xl-4 col-lg-4 col-md-6 wow fadeOut"
              data-wow-delay="100ms"
            >
              <div className="services__item grey-bg transition-3 text-center mb-30">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone1} alt="" />
                </div>
                <div className="services__content">
                  <h2>Partners</h2>
                  <a
                    className="b-btn b-btn-green"
                    href="https://pecb.com/"
                    target="_blank"
                  >
                    Search for more <i className="fi fi-sr-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-6 wow fadeOut"
              data-wow-delay="500ms"
            >
              <div className="services__item grey-bg transition-3 text-center mb-30">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone2} alt="" />
                </div>

                <div className="services__content">
                  <h2>Trainers</h2>
                  <a
                    className="b-btn b-btn-green"
                    href="https://pecb.com/"
                    target="_blank"
                  >
                    Search for more <i className="fi fi-sr-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-4 col-md-6 wow fadeOut"
              data-wow-delay="1000ms"
            >
              <div className="services__item grey-bg transition-3 text-center mb-30">
                <div
                  className="services__shape transition-3"
                  style={{ backgroundImage: `url(${needJob})` }}
                />
                <div className="services__icon mb-25">
                  <img src={icone3} alt="" />
                </div>
                <div className="services__content">
                  <h2>TCP Programs</h2>
                  <a
                    className="b-btn b-btn-green"
                    href="https://pecb.com/"
                    target="_blank"
                  >
                    Search for more <i className="fi fi-sr-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resourses Section Start */}
      <div className="categories-area pt-80 grey-bg pb-50 wow fadeInDown">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
              <div className="section-title text-center ml-50 mr-50 mb-45">
                <h2>Resourses</h2>
                <p>
                  Discover Your Next Career Move with Our Online Course Portal!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i className="fi fi-sr-site-alt" />
                </div> */}
                <div className="categories-text">
                  <h4> Webinars </h4>
                  <span> 52 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-solid fa-book"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Articals</h4>
                  <span> 304 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-regular fa-newspaper"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Whitepapers </h4>
                  <span> 73 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-solid fa-map"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Brochchures </h4>
                  <span> 308 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-regular fa-newspaper"></i>
                </div> */}
                <div className="categories-text">
                  <h4> News Releases </h4>
                  <span> 69 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-solid fa-download"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Downloads </h4>
                  <span> 169 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-solid fa-sparkles"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Apps </h4>
                  <span> 18 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-12 mb-30">
              <div className="categories-wrapper pos-rel ">
                {/* <div className="categories-icon f-left">
                  <i class="fa-solid fa-circle-info"></i>
                </div> */}
                <div className="categories-text">
                  <h4> Info Kits </h4>
                  <span> 89 Available </span>
                </div>
                <div className="cat-button">
                  <a href="/job-grid">
                    <ArrowRightAltIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="section-bt mb-4"
            style={{ textAlign: "right", marginRight: "20px" }}
          >
            <Link to="https://pecb.com/" target="_blank">
              <button className="b-btn job_area_btn" href="job-grid">
                Browse All Courses <i class="fi fi-sr-arrow-right"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ReadOnline;