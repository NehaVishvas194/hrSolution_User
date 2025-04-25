import React from "react";
import one from "../Image/01.webp";
import two from "../Image/02.webp";
import three from "../Image/03.webp";
import four from "../Image/04.webp";
import five from "../Image/05.webp";
import six from "../Image/06.webp";
import { baseUrl } from "../Api/BaseUrl";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import image from "../../src/Api/BaseUrl";

export default function RecentJobs() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

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

  useEffect(() => {
    handleResentJob();
  }, []);

  const addJobsData = (JOBid) => {
    console.log(JOBid);
    navigate("/JobDetailpage", { state: JOBid });
  };

  const showAllJob = () => {
    navigate("/showjobs");
  };

  return (
    <section className="pt-80">
      <div className="container">
        <div className="row wow fadeInDown">
          <div className="col-lg-12 col-md-12 ">
            <div className="section-title text-center">
              <h2>Job Listings for Talents Like You</h2>
              <p>
                Join a growing network of professionals exploring the most
                current job openings. Let us help you find your next big move.
              </p>
            </div>
          </div>
          {/* <div className="col-lg-6 col-md-6">
            <div className="section-bt">
              <button
                onClick={showAllJob}
                className="b-btn job_area_btn"
                href="job-grid"
              >
                Browse All Jobs <i className="fi fi-sr-arrow-right" />
              </button>
            </div>
          </div> */}
        </div>

        <div className="row pt-50 wow fadeInDown">
          {rows.slice(0, 5).map((info) => {
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
              <div className="col-lg-6 mb-4" key={info?.jobId}>
                <div className="job-wrapper mb-30">
                  <div className="">
                    <div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-30">
                        <div className="job-tag">
                          <span className="tag-normal">{info?.job_type}</span>
                          {/* <span className="tag-urgent">{info.sub_job_title?info.sub_job_title:"urgent"}</span> */}
                        </div>
                        <div className="posted_time">
                          <span>
                            <i className="fi fi-rr-calendar" />
                            {moment(info.endDate).format("LL")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="job-instructor-profile mb-30">
                    <div
                      className="job-instructor-img f-left  px-2"
                      style={{ width: "15%", height: "auto" }}
                    >
                      <img
                        src={
                          info.job_image
                            ? " https://sisccltd.com/hrsolutions/" +
                              info.job_image
                            : one
                        }
                        alt="Job"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="job-instructor-title">
                      <h5>{info?.job_title}</h5>

                      <a className="company_name">
                        <i className="fi fi-rs-award" />
                        {info?.company_name}
                      </a>
                      <span>
                        <i
                          className="fi fi-rr-marker"
                          style={{ cursor: "default" }}
                        />
                        {/* {info?.location?.join(",")} */}
                      </span>
                    </div>
                  </div>
                  <div className="job-content">
                    <div className="experience_sallary d-flex flex-wrap">
                      <span>
                        <i className="fi fi-rs-briefcase" />
                        Experience : {info?.Experience}
                      </span>
                    </div>

                    <div className="skills_tags mt-30 mb-30">
                      {info?.key_qualification?.map((info) => (
                        <p>{info}</p>
                      ))}
                    </div>
                    <div className="job-salary dead_line">
                      <span>
                        <i className="fi fi-rs-clock-three" />
                        {message}
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
        </div>
      </div>
    </section>
  );
}
