import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import bgimg from "../Image/3.jpg";
import candidatesimg from "../Image/candidate-1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const SuccessfulCandidates = () => {
  const bannercss = { backgroundImage: `url(${bgimg})` };
  const [data, setData] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .get(`${baseUrl}get_successfull_candidate`)
      .then((response) => {
        console.log(response.data.Details);
        setData(response.data.Details);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <Header />
      <section>
        <div className="Page_title" style={bannercss}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Successful Candidates</h2>
                <p className="fs-6" style={{ color: "white" }}>
                  The Right Fit for the Role: Celebrating Our Successful
                  Candidates!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Select_candidates">
        <div className="container">
          <div className="row">
            {data && data.length > 0 ? (
              data.map((info) => (
                <div className="col-md-6" key={info.id || info.user_Email}>
                  <div className="Select_candidates_inner">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="candidates_img">
                        <img
                          src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                          alt=""
                        />
                        <h4 className="name">{info.first_Name}</h4>
                      </div>
                      <div>
                        <ul className="candidate-info ps-3">
                          <li className="designation">{info.job_Heading}</li>
                          <li>
                            <i className="icon fi fi-rr-marker"></i>
                            {info.city}
                          </li>
                          <li className="ps-0 pb-2 w-100">
                            <i className="fi fi-rr-envelope align-middle pe-2"></i>{" "}
                            {info.user_Email}
                          </li>
                        </ul>
                        <ul className="post-tags mb-0">
                          <li>
                            <a href=" ">{info.gender}</a>
                          </li>
                          <li>
                            <a href=" ">{info.Highest_Education}</a>
                          </li>
                          <li>
                            <a href=" ">{info.job_Heading}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-100 py-4">No candidates found...</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SuccessfulCandidates;
