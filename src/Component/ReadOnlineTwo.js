import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Background from "../Image/aboutOnline.avif";
import CourseImg from "../Image/aboutCourses4.jpg";
import icone1 from "../Image/icon-1.webp";
import needJob from "../Image/needJob.png";
import icone2 from "../Image/icon-3.webp";
import icone3 from "../Image/icon-2.webp";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const ReadOnlineTwo = () => {
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
              <h2>About World Academy</h2>
              <p className="mt-2">Find your all Online Courses Here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Courses Area */}

      <section className="onlineSec pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="courseImg">
                <img src={CourseImg} alt="" />
              </div>
            </div>
            <div className="col-lg-7 d-flex align-items-center">
              <div className="OnlineText">
                <h2>
                  About <span>World Academy</span>{" "}
                </h2>

                <p>
                  World Academy for Research and Development [WARD] started its
                  journey back in 2008. WARD is the name of TRUST in
                  Professional Credentials. WARD plays a vital role as a
                  strategic business partner of any organization to contribute
                  to profitability as well as sustainability in the competitive
                  business world through its support and collaboration
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="section-bt mt-4"
          style={{ textAlign: "center", marginTop: "-60px" }}
        >
          <Link to="https://www.worldacademy.uk/" target="_blank">
            <button className="b-btn job_area_btn" href="job-grid">
              Browse All Courses <i class="fi fi-sr-arrow-right"></i>
            </button>
          </Link>
        </div>
      </section>

      {/* secrets to Life Success Area */}

      <section className="services__area pt-80 pb-50">
        <div className="container">
          <div className="row wow fadeInDown">
            <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
              <div className="section-title text-center mb-45">
                <h2>Learn the secrets to Life Success</h2>
                <p>
                  World Academy - Comprehensive Solutions for Professionals,
                  Corporates and Institutes
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
                  <h2>Want to become Certified Professional !</h2>
                  <p>
                    WARD with accreditation support from Globally recognized
                    Professional Institutes and Accreditation bodies, offers
                    wide range of Certified Professional...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
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
                  <h2>Looking for Post Graduate Diploma!</h2>
                  <p>
                    WARD is committed to quality education for Professionals.
                    The major features of WARD's Post Graduate Diploma Programs
                    are: UK Accredited ProgramGlobal...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
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
                  <h2>Competency based Programs to Accelerate your Career!</h2>
                  <p>
                    A3 formula of WARD: Attend, Acquire & Accelerate. WARD
                    offers Competency based Learning & Development programs to
                    enhance the Competencies for...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
                    target="_blank"
                  >
                    Search for more <i className="fi fi-sr-arrow-right" />
                  </a>
                </div>
              </div>
            </div>

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
                  <h2>Professional Assessment for Recruitment & Succession</h2>
                  <p>
                    WARD in partnering with global organization offers
                    Professional Assessment Services for Recruitment, Talent
                    Development , Performance Management &...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
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
                  <h2>Interested to join Global Professional Community!</h2>
                  <p>
                    Join any Certified Professional Program of WARD and become
                    part of Big Global Professional Community & Accelerate your
                    Career Globally. Globalizat...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
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
                  <h2>Looking for Tools & Formats!</h2>
                  <p>
                    One of the best features of WARD's program: Delegates become
                    equipped with Tools & Formats for standard and smooth
                    operations of their day to day...
                  </p>
                  <a
                    className="b-btn b-btn-green"
                    href="https://www.worldacademy.uk/"
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

      {/* Category Section Start */}

      <div className="categories-area pt-80 grey-bg pb-50 wow fadeInDown">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
              <div className="section-title text-center ml-50 mr-50 mb-45">
                <h2>Explore by Category</h2>
                <p>It's time to amplify your online Career</p>
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
                  <h4> Free Courses </h4>
                  <span> 5 Available </span>
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
                  <h4> Diploma Programs</h4>
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
                  <h4> Freelancer Certification </h4>
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
                  <h4> Short Program </h4>
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
                  <h4> Supply Chain </h4>
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
                  <h4> Human Resourses </h4>
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
                  <h4> Project Management </h4>
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
                  <h4> Accounting </h4>
                  <span> 89 Available </span>
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
                  <h4> Finance </h4>
                  <span> 89 Available </span>
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
                  <h4> Mounitring And Evaluation </h4>
                  <span> 89 Available </span>
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
                  <h4> Health Safty </h4>
                  <span> 89 Available </span>
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
                  <h4> Bussiness Management </h4>
                  <span> 89 Available </span>
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
                  <h4> Post Graduation Certification (PGC) </h4>
                  <span> 0 Available </span>
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
                  <h4> Certified Professional Program </h4>
                  <span> 55 Available </span>
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
                  <h4> Master Class Series </h4>
                  <span> 89 Available </span>
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
                  <h4> Online HR Courses</h4>
                  <span> 89 Available </span>
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
                  <h4> Online Training </h4>
                  <span> 89 Available </span>
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
                  <h4> Professional Diploma </h4>
                  <span> 89 Available </span>
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
                  <h4> Post Gradution Diploma [PGD] </h4>
                  <span> 89 Available </span>
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
                  <h4> Online Live WorkShop </h4>
                  <span> 89 Available </span>
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
                  <h4> Professional Certificate </h4>
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
            <Link to="https://www.worldacademy.uk/" target="_blank">
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

export default ReadOnlineTwo;
