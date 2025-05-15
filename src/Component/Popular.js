import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { baseUrl } from "../Api/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

export default function Popular() {
  const [jobtitle, setJobtitle] = useState([]);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleResentJob = () => {
    axios
      .get(`${baseUrl}getAll_Jobs?job_status=${1}`)
      .then((response) => {
        console.log(response.data.allJobs, "this is the getAll job data");
        setRows(response.data.allJobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handelGetAllJobtitle = () => {
    axios
      .get(`${baseUrl}all_active_jobs_Count_with_title`)
      .then((response) => {
        console.log(response.data.jobTitleCounts);
        setJobtitle(response.data.jobTitleCounts);
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };

  useEffect(() => {
    handelGetAllJobtitle();
    handleResentJob();
  }, []);

  const handleGetsearchData = (jobtitle, jobId) => {
    axios
      .post(`${baseUrl}searchJob`, {
        job_title: jobtitle,
        company_address: "",
      })
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) {
          navigate("/FindJobPage", {
            state: { data: response.data, title: jobtitle, location: "" },
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response?.data?.message || "An error occurred"}`,
        });
      });
  };

  const addJobsData = (JOBid) => {
    console.log(JOBid);
    navigate("/JobDetailpage", { state: JOBid });
  };

  return (
    <>
      <div className="categories-area pt-80 grey-bg pb-50 wow fadeInDown">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
              <div className="section-title text-center ml-50 mr-50 mb-45">
                <h2>Discover your next career move with our job portal!</h2>
                <p>
                  Explore diverse job listings across all industries. Streamline
                  your search and apply with ease. Start your journey today!
                </p>
              </div>
            </div>
          </div>

          {/* <div className="row">
            {rows.slice(0, 9).map((info) => (
              <a onClick={() => addJobsData(info.jobId)}>
                <div
                  className="col-xl-4 col-lg-4 col-md-6 mb-30"
                  key={info?.jobId}
                >
                  <div className="categories-wrapper pos-rel">
                    <div className="categories-icon f-left">
                      <WorkOutlineOutlinedIcon style={{ color: "#bf9b2f" }} />
                    </div>
                    <div className="categories-text">
                      <h4>{info?.job_title}</h4>
                      <span>{info?.status} Available Jobs</span>
                    </div>
                    <div className="cat-button">
                      <a
                        style={{ "text-transform": "uppercase" }}
                        onClick={() => addJobsData(info.jobId)}
                      >
                        <KeyboardDoubleArrowRightIcon className="align-middle pb-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div> */}
          <div className="row">
            {rows.slice(0, 9).map((info) => (
              <div
                className="col-xl-4 col-lg-4 col-md-6 mb-4"
                key={info?.jobId}
              >
                <div
                  className="categories-wrapper pos-rel"
                  onClick={() => addJobsData(info.jobId)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="categories-icon f-left">
                    <WorkOutlineOutlinedIcon style={{ color: "#bf9b2f" }} />
                  </div>
                  <div className="categories-text">
                    <h4>{info?.job_title}</h4>
                    <span>{info?.status} Available Jobs</span>
                  </div>
                  <div className="cat-button">
                    <a
                      style={{ "text-transform": "uppercase" }}
                      onClick={() => addJobsData(info.jobId)}
                    >
                      <KeyboardDoubleArrowRightIcon className="align-middle pb-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}