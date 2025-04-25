import React, { useEffect, useState } from "react";
// import "./JobDescription.css";
import ReactStars from "react-rating-stars-component";
import { useLocation } from "react-router-dom";
// import Rating from "@mui/material/Rating";
import moment from "moment";

export default function CandidateDetail() {
    const location = useLocation();
    console.log(location.state.response);


    const selectedUser = location.state.response.filter((item) => {
        return item._id === location.state.id;
    });


    const getData = selectedUser[0];

    console.log(getData);

  


    return (
        <>
            {/*Detail of clicked job [English]*/}
            <h2 className="ps-4">Male</h2>
            <div className="container emp-profile"  >
                <form method="post">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-head">
                                <h5>
                                    {/* {getData.first_name} {getData.last_name}{" "} */}
                                </h5>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >
                                            Job Details
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row ps-3">
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Job Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.jobId ? <p>{getData.jobId}</p> : <p>_</p>}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Job title</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.job_title ? (
                                                <p>{getData.job_title}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>First Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.first_Name ? (
                                                <p>{getData.first_Name}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Last Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.last_Name ? (
                                                <p>{getData.last_Name}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Gender</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.gender ? (
                                                <p>{getData.gender}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Highest Education</label>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            {getData.Highest_Education ? (
                                                <p>{getData.Highest_Education}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Total Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.Total_experience ? <p>{getData.Total_experience}</p> : <p>_</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>City</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.city ? (
                                                <p>{getData.city}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone No</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.phone_no ? (
                                                <p>{getData.phone_no}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Job Expired Date
                                            </label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.job_expired_Date
                                                ? (
                                                    <p>{moment(getData.job_expired_Date).subtract( 10, 'days').calendar()}</p>
                                                ) : (
                                                    <p>_</p>
                                                )}
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Candidate rating</label>
                                        </div>
                                        <div className="col-md-6">
                                        <ReactStars
                                        count={5}
                                       
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        value={getData.candidate_rating}
                                    />
                                             
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone No</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.phone_no ? (
                                                <p>{getData.phone_no}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Status</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.status == "0" ? (
                                                <p
                                                    className="mb-2 mr-2 badge"
                                                    style={{
                                                        color: "#ffffff",
                                                        backgroundColor: "#29cc97",
                                                        position: "static",

                                                    }}
                                                >
                                                    InActive
                                                </p>
                                            ) : (
                                                <p
                                                    className="mb-2 mr-2 badge "
                                                    style={{
                                                        color: "#ffffff",
                                                        backgroundColor: "red",
                                                        position: "static",
                                                    }}
                                                >
                                                    Active
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        </>
    )
}
