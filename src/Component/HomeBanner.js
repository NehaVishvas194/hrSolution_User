import React from "react";
import dotted from "../Image/dotted.png";
import hero from "../Image/hero-profile-img..png";
import heroMan from "../Image/happylady2.png";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { height } from "@mui/system";
import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../Api/BaseUrl";
import FindJobPage from "./FindJobPage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const countries = [
  "Western Area Urban ",
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
];

export default function HomeBanner() {
  const navigate = useNavigate();
  const [jobTitles, setJobTitles] = useState([]);
  const [Location, setLocation] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedJobLocation, setSelectedJobLocation] = useState("");
  const [data, setData] = useState([]);

  const getdata = () => {
    axios
      .get(`${baseUrl}get_successfull_candidate`)
      .then((res) => {
        setData(res.data.Details.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchJobTitles = () => {
    axios
      .get(`${baseUrl}all_main_jobTitle`)
      .then((res) => {
        if (res.data.success) {
          setJobTitles(res.data.details.map((job) => job.Main_jobTitle));
          setLocation(countries);
        }
      })
      .catch((err) => console.error("Error fetching job titles", err));
  };

  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(value || "");
  };

  const handleJobLocationChange = (event, value) => {
    setSelectedJobLocation(value || "");
  };

  const handleGetsearchData = () => {
    if (!selectedJobTitle && !selectedJobLocation) return;

    axios
      .post(`${baseUrl}searchJob`, {
        job_title: selectedJobTitle.trim(),
        location: selectedJobLocation.trim(),
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/FindJobPage", {
            state: {
              data: response.data,
              title: selectedJobTitle,
              location: selectedJobLocation,
            },
          });
          // navigate("/FindJobPage", {
          //   state: {
          //     data: response.data,
          //     title: selectedJobTitle,
          //     location: selectedJobLocation,
          //   },
          // });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message || "Search failed",
        });
      });
  };

  useEffect(() => {
    getdata();
    fetchJobTitles();
  }, []);

  const scrollToCandidatesSay = () => {
    const el = document.getElementById("candidates-say");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="homeBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 wow slideInLeft">
              <div className="contentHomeBanner d-flex align-items-center h-100">
                <div>
                  <h2>
                    <span>Discover</span> Countless Dream Job Opportunities –
                    Advance Your Career With Us Today
                    <div className="hero-dot-shape">
                      {" "}
                      <img src={dotted} alt="" />
                    </div>
                  </h2>
                  <div className="job-hero-form newclassbanner-1">
                    <div>
                      <div className="nice-select" role="button" tabIndex={0}>
                        <TextField
                          fullWidth
                          placeholder="Job title"
                          value={selectedJobTitle}
                          onChange={(e) =>
                            handleJobTitleChange(null, e.target.value)
                          }
                          variant="standard"
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "100%",
                            },
                            "& .MuiInputBase-input": {
                              padding: "8px",
                            },
                            "&:hover .MuiInputBase-root::before, &:hover .MuiInputBase-root::after":
                              {
                                borderBottom: "none",
                              },
                            "& .MuiInputBase-root::before, & .MuiInputBase-root::after":
                              {
                                borderBottom: "none",
                              },
                          }}
                          // renderInput={(params) => (
                          //   <TextField
                          //     {...params}
                          //     placeholder="Job title"
                          //     size="small"
                          //     variant="standard"
                          //     sx={{
                          //       "& .MuiInputBase-root": {
                          //         height: "100%",
                          //       },
                          //       "&:hover .MuiInputBase-root::before, &:hover .MuiInputBase-root::after":
                          //         {
                          //           borderBottom: "none",
                          //         },
                          //       "& .MuiInputBase-root::before, & .MuiInputBase-root::after":
                          //         {
                          //           borderBottom: "none",
                          //         },
                          //     }}
                          //   />
                          // )}
                        />
                      </div>
                      <div className="job-input">
                        <Autocomplete
                          className="MuiAutocomplete-input"
                          disablePortal
                          id="combo-box-demo"
                          options={Location}
                          value={selectedJobLocation}
                          onChange={handleJobLocationChange}
                          sx={{
                            width: 200,
                            "& .MuiOutlinedInput-root": {
                              height: "100%",
                              border: "none",
                              "&:hover": {
                                border: "none",
                              },
                              "&.Mui-focused": {
                                border: "none",
                              },
                            },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Locations"
                              size="small"
                              variant="standard"
                              sx={{
                                "& .MuiInputBase-root": {
                                  height: "100%",
                                },
                                "&:hover .MuiInputBase-root::before, &:hover .MuiInputBase-root::after":
                                  {
                                    borderBottom: "none",
                                  },
                                "& .MuiInputBase-root::before, & .MuiInputBase-root::after":
                                  {
                                    borderBottom: "none",
                                  },
                              }}
                            />
                          )}
                        />
                      </div>
                      <button
                        className="find_button"
                        onClick={handleGetsearchData}
                        disabled={
                          selectedJobTitle === "" && selectedJobLocation === ""
                        }
                      >
                        Find Jobs{" "}
                        <i className="fi fi-sr-arrow-right align-middle" />
                      </button>
                    </div>
                  </div>
                  <div className="job-hero-form newclassbanner">
                    <div className="newbanner-Alien">
                      <div
                        className="nice-select2"
                        role="button"
                        tabIndex={0}
                      >
                        <TextField
                          fullWidth
                          placeholder="Job title"
                          value={selectedJobTitle}
                          onChange={(e) =>
                            handleJobTitleChange(null, e.target.value)
                          }
                          variant="standard"
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "100%",
                            },
                            "&:hover .MuiInputBase-root::before, &:hover .MuiInputBase-root::after":
                              {
                                borderBottom: "none",
                              },
                            "& .MuiInputBase-root::before, & .MuiInputBase-root::after":
                              {
                                borderBottom: "none",
                              },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Job title"
                              size="small"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                      <div
                        className="job-input nice-select2 job-hero-form"
                        role="button"
                        tabIndex={0}
                      >
                        <Autocomplete
                          className="MuiAutocomplete-input"
                          disablePortal
                          id="combo-box-demo"
                          options={Location}
                          value={selectedJobLocation}
                          onChange={handleJobLocationChange}
                          sx={{ width: 200, border: 0, marginTop: 0 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Locations"
                              size="small"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                      <button
                        className="find_button-new"
                        onClick={handleGetsearchData}
                      >
                        Find Jobs{" "}
                        <i className="fi fi-sr-arrow-right align-middle" />
                      </button>
                    </div>
                  </div>
                  <div className="hero-profile mt-45 mb-25">
                    <Link to="/SuccessfulCandidates">
                      <h3>Successful Candidates</h3>
                      <a className="more_jobs_btn" href=" ">
                        <img src={hero} alt="" />
                        <span>
                          <i className="fi fi-rr-plus-small" />
                        </span>
                      </a>
                    </Link>
                    <h3
                      onClick={scrollToCandidatesSay}
                      style={{ cursor: "pointer" }}
                    >
                      {data}+ Jobs Done
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow slideInRight">
              <div className="bannerImg">
                <img src={heroMan} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-shape d-none d-lg-block">
          <span className="circle" />
          <span className="circle circle-yellow" />
          <span className="shape-plus">+</span>
        </div>
      </section>
    </>
  );
}
