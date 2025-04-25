import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { baseUrl } from "../Api/BaseUrl";
import axios from "axios";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import one from "../Image/01.webp";

const top100Films = [
  "Western Area Urban",
  "Western Area Rural",
  "Bombali",
  "Bonthe",
  "Kailahun",
  "Kambia",
  "Kenema",
  "Koinadugu",
  "Kono",
  "Moyamba",
  "Port Loko",
  "Pujehun",
  "Tonkolili",
  "Bo",
  "Karene",
  "Falaba",
  "Tonkolili , Sierra leone",
  "pvtrio tech",
  "CDRT.ltd",
  "Bombali , Sierra leone",
];

const AllJobs = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filter, setFilter] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleRecentJob = () => {
    axios
      .get(`${baseUrl}getAll_Jobs?job_status=1`)
      .then((response) => {
        setRows(response.data.allJobs);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  };

  const fetchJobTitles = () => {
    axios
      .get(`${baseUrl}all_main_jobTitle`)
      .then((response) => {
        const option = response.data.details.map((job) => job.Main_jobTitle);
        setJobTitles(option);
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };

  useEffect(() => {
    handleRecentJob();
    fetchJobTitles();
  }, []);

  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(value);
  };

  const handleJobLocationChange = (event, value) => {
    setSelectedLocation(value);
  };

  const handleSearchJobData = () => {
    axios
      .post(`${baseUrl}searchJob`, {
        job_title: selectedJobTitle.trim(),
        location: selectedLocation.trim(),
      })
      .then((response) => {
        setFilter(response.data.Details);
        // setSelectedJobTitle(" ")
        // setSelectedLocation(" ")
        // if(response.status === 200){
        //     setSelectedJobTitle("");
        //     setSelectedLocation("");
        // }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response?.data?.message || "Search failed"}}`,
        });
      });
  };

  const displayedRows = (
    selectedJobTitle || selectedLocation ? filter : rows
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const addJobsData = (JOBid) => {
    navigate("/JobDetailpage", { state: JOBid });
  };

  return (
    <div className="jonGridWrapper">
      <Header />
      <section className="gridBanner">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>All Jobs</h2>
              <p className="mt-2">Find your all job from here</p>
            </div>
          </div>
        </div>
      </section>
      <section className="selectFilterSec pt-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <TextField
                id="combo-box-job-title"
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                sx={{ marginTop: 2 }}
                label="Job Title"
                fullWidth
              />
            </div>
            <div className="col-lg-4">
              <Autocomplete
                disablePortal
                id="combo-box-job-location"
                options={top100Films}
                value={selectedLocation}
                onChange={handleJobLocationChange}
                sx={{ marginTop: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Job Location" />
                )}
              />
            </div>
            <div className="col-lg-4 mt-3">
              <div className="FindJob">
                <button
                  className="b-btn job_area_btn"
                  href="job-grid"
                  onClick={handleSearchJobData}
                >
                  Find Jobs Now <i className="fi fi-sr-arrow-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="allJobSec">
        <div className="container">
          {displayedRows.map((info) => {
            const daysLeft = moment(info.endDate).diff(moment(), "days");
            let message;
            if (daysLeft > 0) {
              message = `${daysLeft} ${
                daysLeft === 1 ? "day" : "days"
              } left to apply!`;
            } else if (daysLeft === 0) {
              message = "Last Day to Apply!";
            } else {
              message = "Application closed!";
            }
            return (
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <li className="job-card new featured">
                      <div className="job-card__info">
                        <div className="d-md-flex align-items-center">
                          <div className="img-c">
                            {" "}
                            <img
                              src={
                                info.job_image
                                  ? "https://sisccltd.com/hrsolutions/" +
                                    info.job_image
                                  : one
                              }
                              alt="Job"
                              style={{ maxWidth: "100%", height: "auto" }}
                            />
                          </div>
                          <div>
                            <div className="d-flex align-items-center">
                              <p> {info.company_name}</p>
                              <p className="tag-new">
                                <span>
                                  <i className="fi fi-rr-marker" />
                                  {info.company_address}
                                </span>
                              </p>
                              <p className="tag-featured">
                                {info.Number_of_emp_needed} employees needed
                              </p>
                            </div>
                            <a href="javascript:void(0)">
                              <h6>{info.job_title}</h6>
                            </a>
                            <ul>
                              <li>{message}</li>
                              <li>
                                {" "}
                                <span>
                                  {/* <i className="fi fi-rs-briefcase" /> */}
                                  Experience: {info.Experience}yr
                                </span>
                              </li>
                              {/* <li>USA Only</li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <ul className="job-card__tags">
                        {info.acadmic_qualification.map((info) => (
                          <li>{info}</li>
                        ))}
                      </ul>
                    </li>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className="row">
                        {displayedRows.map((info) => {
                            const daysLeft = moment(info.endDate).diff(moment(), 'days');
                            return (
                                <div className="col-lg-6" key={info.id}>
                                    <div className="job-wrapper mb-30">
                                        <div className="">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-30">
                                                    <div className="job-tag">
                                                        <span className="tag-normal">{info.job_type}</span>
                                                        <span className="tag-urgent">urgent</span>
                                                    </div>
                                                    <div className="posted_time">
                                                        <span>
                                                            <i className="fi fi-rr-calendar" />{moment(info.endDate).format('LL')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-instructor-profile mb-30">
                                            <div className="job-instructor-img f-left  px-2" style={{ "width": "15%", "height": "auto" }}>
                                                <img src={info.job_image ? "https://sisccltd.com/hrsolutions/" + info.job_image : one} alt="Job" style={{ "maxWidth": "100%", "height": "auto" }} />
                                            </div>
                                            <div className="job-instructor-title">
                                                <h4>
                                                    <a style={{ "cursor": "default" }}>{info.job_title}</a>
                                                </h4>
                                                <a className="company_name" style={{ "cursor": "default" }}>
                                                    {info.company_name} <i className="fi fi-rs-award" />
                                                </a>
                                                <span>
                                                    <i className="fi fi-rr-marker" />
                                                    {info.company_address}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="job-content">
                                            <div className="experience_sallary d-flex flex-wrap">
                                                <span>
                                                    <i className="fi fi-rs-briefcase" />
                                                    Experience: {info.Experience}
                                                </span>
                                            </div>
                                            <div className="skills_tags mt-30 mb-30">
                                                {info.key_qualification.map((info) => (
                                                    <p>{info}</p>
                                                ))
                                                }
                                            </div>
                                            <div className="job-salary dead_line">
                                                <span>
                                                    <i className="fi fi-rs-clock-three" />
                                                    {daysLeft} Days Left To Apply
                                                </span>
                                                <a onClick={() => addJobsData(info.jobId)}>
                                                    Job Details <i className="fi fi-sr-arrow-right" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <TablePagination
                            sx={{
                                "& p": {
                                    margin: 0,
                                },
                            }}
                            component="div"
                            count={selectedJobTitle || selectedLocation ? filter.length : rows.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div> */}
          <TablePagination
            sx={{
              "& p": {
                margin: 0,
              },
            }}
            component="div"
            count={
              selectedJobTitle || selectedLocation ? filter.length : rows.length
            }
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AllJobs;
