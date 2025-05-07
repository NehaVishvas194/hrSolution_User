import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import Swal from "sweetalert2";
const FindJobPage = () => {
  const [jobTitles, setJobTitles] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, title, location } = state || {};
  console.log(data.Details, title, location);
  const JobTital = title;
  const Joblocation = location;

  const details = data?.Details;
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const [jobtype, setJobType] = useState("");
  const [jobschedule, setjobschedule] = useState("");
  const [companyIndustry, setcompanyIndustry] = useState("");
  const [Experiences, setExperiences] = useState("");
  const [filterdata, setFilterdata] = useState([]);
  const Job_type = [
    "Full-Time",
    "Part-Time",
    "Temporary",
    "Contract",
    "Internship",
    "Commission",
    "Fresher",
  ];
  const Job_schedule = [
    "Day Shift",
    "Morning Shift",
    "Rotational Shift",
    "Night Shift",
    "Monday to Friday",
    "Evening Shift",
    "Fresher",
    "US Shift",
    "Others",
  ];
  const company_Industry = [
    "Aerospace & Defense",
    "Agriculture",
    "Information Technology",
    "Non-profit & NGO",
    "Real Estate",
    "Restaurant & Food Services",
    "Marketing",
    "Finance",
    "UK Shift",
    "Others",
  ];
  const Experience = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];

  const fetchJobTitles = () => {
    axios
      .get(`${baseUrl}alljobTitle`)
      .then((response) => {
        if (response.data.success) {
          setJobTitles(response.data.details.map((job) => job.jobTitle));
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);
  const handleJobTypeChange = (event, value) => {
    setJobType(value);
  };
  const handlejobscheduleChange = (event, value) => {
    setjobschedule(value);
  };
  const handlecompanyIndustryChange = (event, value) => {
    setcompanyIndustry(value);
  };
  const handleExperiencesChange = (event, value) => {
    setExperiences(value);
  };
  const handleFilterApiData = () => {
    const filters = {
      job_type: jobtype,
      job_schedule: jobschedule,
      Experience: Experiences,
      company_Industry: companyIndustry,
    };

    const isFilterApplied = Object.values(filters).some((x) => x); // Check if any filter is applied

    if (isFilterApplied) {
      axios
        .post(
          `${baseUrl}filterJob?job_type=${jobtype || ""}&job_schedule=${
            jobschedule || ""
          }&Experience=${Experiences || ""}&company_Industry=${
            companyIndustry || ""
          }`,
          {
            job_title: JobTital,
            company_address: Joblocation,
          }
        )
        .then((response) => {
          if (response.data && response.data.Details) {
            setFilterdata(response.data.Details);
          } else {
            setFilterdata([]); // Clear if API returns no data or error
          }
        })
        .catch((error) => {
          setFilterdata([]);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
              error.response?.data?.message ||
              "An error occurred during filtering.", // Improved error message
          });
        });
    } else {
      setFilterdata(details); // Show all jobs if no filter is applied
    }
  };

  useEffect(() => {
    handleFilterApiData();
  }, [jobtype, jobschedule, Experiences, companyIndustry]); // Correct dependency array
  console.log(jobtype, jobschedule, Experiences, companyIndustry);

  const multiStep = (e, id, isPsychometricTest, psychometric_Test) => {
    e.preventDefault(); // Ensure that preventDefault is invoked as a function
    console.log(id, isPsychometricTest, psychometric_Test);
    navigate("/multistepform", { state: { data: id } });
    // if (isPsychometricTest === 0) {
    //     navigate("/PsychometricTest", { state: { data: psychometric_Test } });
    // } else {
    //     navigate("/multistepform", { state: { data:id} });
    // }
  };
  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <>
      <Header />
      <div>
        <section className="withoutbanner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-md-12">
                <div className="parentTopButtons">
                  {/* <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={jobtype}
                                                onChange={handleJobTypeChange}
                                                options={Job_type}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Job type" />}
                                            />
                                        </div>
                                    </div> */}
                  {/* <div className='childButtonTop'>
                                        <div class="dropdown">
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                value={jobschedule}
                                                onChange={handlejobscheduleChange}
                                                options={Job_schedule}
                                                sx={{ width: 300 }}
                                                renderInput={(params) => <TextField {...params} label="Job schedule" />}
                                            />
                                        </div>
                                    </div> */}
                  <div className="childButtonTop mb-4">
                    <div class="dropdown">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={companyIndustry}
                        onChange={handlecompanyIndustryChange}
                        options={jobTitles}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Company Industry" />
                        )}
                      />
                    </div>
                  </div>
                  <div className="childButtonTop mb-4">
                    <div class="dropdown">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={Experience}
                        value={Experiences}
                        onChange={handleExperiencesChange}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Year" />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="FilterateJob mt-30 mb-30">
          <div className="container">
            <div className="row pt-30">
              <div className="col-lg-6">
                <p className="uploadCvJob">
                  {" "}
                  <Link to="/UploadResume">Upload Your CV</Link>{" "}
                  <strong>and find your next job on Smart Start!</strong>
                </p>
                <hr />
                {/* <small className='smallText'>work from home jobs</small> */}
              </div>
            </div>

            {/* tab  */}
            {filterdata.length > 0 ? (
              <>
                <div className="align-items-start">
                  <div className="row h-100">
                    <div className="col-lg-6" style={{ minHeight: "300vh" }}>
                      <div
                        className="nav flex-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        {filterdata &&
                          filterdata.length > 0 &&
                          filterdata?.map((info, index) => (
                            <button
                              onClick={() => handleTabClick(index)}
                              className="nav-link p-0"
                              id={`v-pills-${index}-tab`}
                              data-bs-toggle="pill"
                              data-bs-target={`#v-pills-${index}`}
                              type="button"
                              role="tab"
                              aria-controls={`v-pills-${index}`}
                              aria-selected={activeTab === index}
                            >
                              <div className="CardAssigmentmAIN mt-4">
                                <div>
                                  <div className="parentAssign">
                                    <h4>{info.job_title}</h4>
                                  </div>
                                  <h6>{info?.sub_job_title}</h6>
                                  <p
                                    style={{
                                      "font-size": "18px",
                                      color: "#020950",
                                      "font-weight": "600",
                                      "text-transform": "capitalize",
                                    }}
                                  >
                                    {info?.company_name}
                                  </p>
                                  <Link
                                    style={{
                                      "font-size": "18px",
                                      color: "#020950",
                                      "font-weight": "600",
                                      "text-transform": "capitalize",
                                    }}
                                  >
                                    {info?.location?.join(" , ")}{" "}
                                  </Link>
                                  {/* <div className='salaryButton'>
                                                                <span>
                                                                    {info?.salary_pay.map((pay, index) => (
                                                                        <React.Fragment key={index}>
                                                                            SLL {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </span>
                                                                <span>{info?.job_type} <small><sup></sup></small></span>
                                                                <span>{info?.job_schedule}  <small><sup></sup></small> </span>
                                                            </div> */}
                                  <p className="easyApply">
                                    <i class="fi fi-sr-paper-plane-top"></i>Easy
                                    Apply
                                  </p>

                                  <ul className="listFindPage">
                                    <h5
                                      className="mt-4"
                                      style={{ color: "#000" }}
                                    >
                                      Job Description
                                    </h5>
                                    {info?.job_Description
                                      ?.split("•")
                                      .map((item, e) => (
                                        <li key={e}>{item.trim()}</li>
                                      ))}
                                  </ul>
                                  <ul className="listFindPage">
                                    <h5
                                      className="mt-4"
                                      style={{ color: "#000" }}
                                    >
                                      Job Responsibility
                                    </h5>
                                    <li
                                      dangerouslySetInnerHTML={renderHTML(
                                        info?.job_Responsibility
                                      )}
                                    ></li>
                                  </ul>
                                </div>
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                    <div
                      className="col-lg-6"
                      style={{
                        position: "sticky",
                        top: "100px",
                        height: "87vh",
                      }}
                    >
                      <div className="tab-content" id="v-pills-tabContent">
                        {filterdata &&
                          filterdata.length > 0 &&
                          filterdata?.map((info, index) => (
                            <div
                              key={index}
                              className={`tab-pane fade ${
                                activeTab === index ? "show active" : ""
                              }`}
                              id={`v-pills-${index}`}
                              role="tabpanel"
                              aria-labelledby={`v-pills-${index}-tab`}
                            >
                              <div className="CardAssigmentDetail mt-4">
                                <div className="shadowDetailFind">
                                  <div className="parentAssign">
                                    <h4>{info.job_title}</h4>
                                  </div>
                                  <p>
                                    <strong>Company:- </strong>
                                    {info.company_name}
                                  </p>
                                  <p>
                                    <strong>Location:- </strong>
                                    {/* {info.company_name} , */}
                                    {info?.location?.join(",")}
                                  </p>
                                  <p>
                                    <strong>Email:- </strong>
                                    {info.employee_email}
                                  </p>
                                  <p>
                                    <strong>Phone:- </strong>
                                    {info.phone_no}
                                  </p>

                                  <div className="findApplyBtn">
                                    <button
                                      onClick={(e) =>
                                        multiStep(
                                          e,
                                          info.jobId,
                                          info.isPsychometricTest,
                                          info.psychometric_Test
                                        )
                                      }
                                    >
                                      Apply Now
                                    </button>

                                    {/* <button><i class="fi fi-rr-bookmark"></i></button>
                                                                <button><i class="fi fi-rr-ban"></i></button> */}
                                  </div>
                                </div>
                                <div className="jobDetailSec">
                                  <h5>Job details</h5>
                                  {/* <div className="Jobdetails"> */}
                                  {/* <div className='walletFinfDetail'>
                                                                    <i class="fi fi-rr-money-bills-simple"></i>
                                                                </div> */}
                                  {/* <div className='walletFindText'>
                                                                    <h6>Pay</h6>
                                                                    <span>
                                                                        {info.salary_pay.map((pay, index) => (
                                                                            <React.Fragment key={index}>
                                                                                SLL {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </span>
                                                                </div> */}
                                  {/* </div> */}
                                  <div className="Jobdetails">
                                    <div className="walletFinfDetail">
                                      <i class="fi fi-rr-box-open"></i>
                                    </div>
                                    <div className="walletFindText">
                                      <h6>Skills</h6>
                                      <span>
                                        <ul>
                                          {info?.skills
                                            ?.split("•")
                                            .map((item, index) => (
                                              <li
                                                key={index}
                                                style={{ listStyle: "inside" }}
                                              >
                                                {item.trim()}
                                              </li>
                                            ))}
                                        </ul>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="Jobdetails">
                                    <div className="walletFinfDetail">
                                      <i class="fi fi-rr-clock-five"></i>
                                    </div>
                                    <div className="walletFindText">
                                      <h6>Experience</h6>
                                      <span>{info.Experience} </span>
                                    </div>
                                  </div>
                                  <div className="Jobdetails">
                                    <div className="walletFinfDetail">
                                      <GroupAddIcon
                                        style={{ color: "#bf9b2f" }}
                                      />
                                    </div>
                                    <div className="walletFindText">
                                      <h6>Number of Employee Needed</h6>
                                      <span>{info.Number_of_emp_needed} </span>
                                    </div>
                                  </div>
                                  <div className="Jobdetails">
                                    <div className="walletFinfDetail">
                                      <i class="fa-solid fa-graduation-cap"></i>
                                    </div>
                                    <div className="walletFindText">
                                      <h6>Qualification</h6>
                                      <div className="salaryButton">
                                        {info.qualification}
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                  <div className="locationDetail">
                                    <h5>Location</h5>
                                    <div className="Jobdetails">
                                      <div className="walletFinfDetail">
                                        <i class="fi fi-rs-marker"></i>
                                      </div>
                                      <div className="walletFindText">
                                        <h6>{info?.location?.join(",")}</h6>
                                      </div>
                                    </div>
                                  </div>
                                  <hr />
                                  {/* <div className='benefitFind'>
                                                                <h5>Benefit</h5>
                                                                <ul>
                                                                    <li>
                                                                        Cell phone reimbursement
                                                                    </li>
                                                                    <li>
                                                                        Flexible schedule
                                                                    </li>
                                                                    <li>
                                                                        Paid sick time
                                                                    </li>
                                                                    <li>
                                                                        Work from home
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                                  <hr />
                                  <div className="FullJobDes">
                                    <h5>Full job description</h5>
                                    <ul>
                                      {/* <li>Experience-{info.Experience}Experience</li>
                                                                    <li>company Industry-{info.company_Industry}</li>
                                                                    <li>key qualification-{info.key_qualification}</li> */}
                                      {info?.job_Description
                                        ?.split("•")
                                        .map((item, index) => (
                                          <li key={index}>{item.trim()}</li>
                                        ))}
                                      {/* <li>{info?.job_Description}</li> */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                          tabIndex={0}
                        ></div>
                        <div
                          class="tab-pane fade"
                          id="v-pills-messages"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                            tabIndex={0}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="align-items-start">
                  <div className="row h-100">
                    <div className="col-lg-6" style={{ minHeight: "300vh" }}>
                      <div
                        className="nav flex-column nav-pills me-3"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="vertical"
                      >
                        {details.map((info, index) => (
                          <button
                            onClick={() => handleTabClick(index)}
                            className="nav-link p-0"
                            id={`v-pills-${index}-tab`}
                            data-bs-toggle="pill"
                            data-bs-target={`#v-pills-${index}`}
                            type="button"
                            role="tab"
                            aria-controls={`v-pills-${index}`}
                            aria-selected={activeTab === index}
                          >
                            <div className="CardAssigmentmAIN mt-4">
                              <div>
                                <div className="parentAssign">
                                  <h4>{info.job_title}</h4>
                                </div>
                                <p
                                  style={{
                                    "font-size": "18px",
                                    color: "#020950",
                                    "font-weight": "600",
                                    "text-transform": "capitalize",
                                    cursor: "default",
                                  }}
                                >
                                  {info?.company_name}{" "}
                                </p>
                                <p
                                  style={{
                                    "font-size": "18px",
                                    color: "#020950",
                                    "font-weight": "600",
                                    "text-transform": "capitalize",
                                    cursor: "default",
                                  }}
                                >
                                  {info?.location?.join(",")}
                                </p>
                                {/* <div className='salaryButton'>
                                                                <span>
                                                                    {info?.salary_pay?.map((pay, index) => (
                                                                        <React.Fragment key={index}>
                                                                            SLL{pay.Minimum_pay} - {pay.Maximum_pay}
                                                                        </React.Fragment>
                                                                    ))}
                                                                </span>
                                                                <span>{info?.job_type} <small><sup></sup></small></span>
                                                                <span>{info?.job_schedule}  <small><sup></sup></small> </span>
                                                            </div> */}
                                <p className="easyApply">
                                  <i class="fi fi-sr-paper-plane-top"></i>Easy
                                  Apply
                                </p>
                                <ul className="listFindPage">
                                  {/* <li
                                    dangerouslySetInnerHTML={renderHTML(
                                      info?.job_Description
                                    )}
                                  ></li> */}
                                  {info?.job_Description
                                    ?.split("•")
                                    .map((item, e) => (
                                      <li key={e}>{item.trim()}</li>
                                    ))}

                                  {/* <li
                                    dangerouslySetInnerHTML={renderHTML(
                                      info?.job_Responsibility
                                    )}
                                  ></li> */}
                                </ul>
                                <ul className="listFindPage">
                                  <h5
                                    className="mt-4"
                                    style={{ color: "#000" }}
                                  >
                                    Job Responsibility
                                  </h5>
                                  <li
                                    dangerouslySetInnerHTML={renderHTML(
                                      info?.job_Responsibility
                                    )}
                                  ></li>
                                </ul>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div
                      className="col-lg-6"
                      style={{
                        position: "sticky",
                        top: "100px",
                        height: "87vh",
                      }}
                    >
                      <div className="tab-content" id="v-pills-tabContent">
                        {details.map((info, index) => (
                          <div
                            key={index}
                            className={`tab-pane fade ${
                              activeTab === index ? "show active" : ""
                            }`}
                            id={`v-pills-${index}`}
                            role="tabpanel"
                            aria-labelledby={`v-pills-${index}-tab`}
                          >
                            <div className="CardAssigmentDetail mt-4">
                              <div className="shadowDetailFind">
                                <div className="parentAssign">
                                  <h4>{info.job_title}</h4>
                                </div>
                                <p>
                                  <strong>Company:- </strong>
                                  {info.company_name}
                                </p>
                                <p>
                                  <strong>Location:- </strong>
                                  {/* {info.company_name} , */}
                                  {info?.location?.join(",")}
                                </p>
                                <p>
                                  <strong>Email:- </strong>
                                  {info.employee_email}
                                </p>
                                <p>
                                  <strong>Phone:- </strong>
                                  {info.phone_no}
                                </p>
                                <div className="findApplyBtn">
                                  <button
                                    onClick={(e) =>
                                      multiStep(
                                        e,
                                        info.jobId,
                                        info.isPsychometricTest,
                                        info.psychometric_Test
                                      )
                                    }
                                  >
                                    Apply Now
                                  </button>
                                  {/* <button><i class="fi fi-rr-bookmark"></i></button>
                                                                <button><i class="fi fi-rr-ban"></i></button> */}
                                </div>
                              </div>
                              <div className="jobDetailSec">
                                <h5>Job details</h5>
                                {/* <div className="Jobdetails"> */}
                                {/* <div className='walletFinfDetail'>
                                                                    <i class="fi fi-rr-money-bills-simple"></i>
                                                                </div> */}
                                {/* <div className='walletFindText'>
                                                                    <h6>Pay</h6>
                                                                    <span>
                                                                        {info.salary_pay.map((pay, index) => (
                                                                            <React.Fragment key={index}>
                                                                                SLL {pay.Minimum_pay} - {pay.Maximum_pay}
                                                                            </React.Fragment>
                                                                        ))}
                                                                    </span>
                                                                </div> */}
                                {/* </div> */}
                                <div className="Jobdetails">
                                  <div className="walletFinfDetail">
                                    <i class="fi fi-rr-box-open"></i>
                                  </div>
                                  <div className="walletFindText">
                                    <h6>Skills</h6>

                                    <span>
                                      <ul>
                                        {info?.skills
                                          ?.split("•")
                                          .map((item, index) => (
                                            <li
                                              key={index}
                                              style={{ listStyle: "inside" }}
                                            >
                                              {item.trim()}
                                            </li>
                                          ))}
                                      </ul>
                                    </span>
                                  </div>
                                </div>
                                <div className="Jobdetails">
                                  <div className="walletFinfDetail">
                                    <i class="fi fi-rr-clock-five"></i>
                                  </div>
                                  <div className="walletFindText">
                                    <h6>Experience</h6>
                                    <span>{info.Experience} </span>
                                  </div>
                                </div>
                                <div className="Jobdetails">
                                  <div className="walletFinfDetail">
                                    <GroupAddIcon
                                      style={{ color: "#bf9b2f" }}
                                    />
                                  </div>
                                  <div className="walletFindText">
                                    <h6>Number of Employee Needed</h6>
                                    <span>{info.Number_of_emp_needed} </span>
                                  </div>
                                </div>
                                <div className="Jobdetails">
                                  <div className="walletFinfDetail">
                                    <i class="fa-solid fa-graduation-cap"></i>
                                  </div>
                                  <div className="walletFindText">
                                    <h6>Qualification</h6>
                                    <div className="salaryButton">
                                      {info.qualification}
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className="locationDetail">
                                  <h5>Location</h5>
                                  <div className="Jobdetails">
                                    <div className="walletFinfDetail">
                                      <i class="fi fi-rs-marker"></i>
                                    </div>
                                    <div className="walletFindText">
                                      <h6>{info?.location?.join(",")}</h6>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                {/* <div className='benefitFind'>
                                                                <h5>Benefit</h5>
                                                                <ul>
                                                                    <li>
                                                                        Cell phone reimbursement
                                                                    </li>
                                                                    <li>
                                                                        Flexible schedule
                                                                    </li>
                                                                    <li>
                                                                        Paid sick time
                                                                    </li>
                                                                    <li>
                                                                        Work from home
                                                                    </li>
                                                                </ul>
                                                            </div> */}
                                <hr />
                                <div className="FullJobDes">
                                  <h5>Full job description</h5>
                                  <ul>
                                    {/* <li>Experience-{info.Experience}Experience</li>
                                                                    <li>company Industry-{info.company_Industry}</li>
                                                                    <li>key qualification-{info.key_qualification}</li> */}
                                    {info?.job_Description
                                      ?.split("•")
                                      .map((item, index) => (
                                        <li key={index}>{item.trim()}</li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div
                          className="tab-pane fade"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                          tabIndex={0}
                        ></div>
                        <div
                          class="tab-pane fade"
                          id="v-pills-messages"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-home"
                            role="tabpanel"
                            aria-labelledby="v-pills-home-tab"
                            tabIndex={0}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* tab end */}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FindJobPage;
