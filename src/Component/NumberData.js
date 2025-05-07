import React from "react";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NumberData() {
  const [count, setCount] = useState("");
  const navigate = useNavigate();

  const handlCountApi = () => {
    axios
      .get(`${baseUrl}dashboard_counts`)
      .then((response) => {
        // console.log(response.data)
        setCount(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handlCountApi();
  }, []);
  console.log(count.active_jobs_count);

  const handlenavigateacclients123 = () => {
    navigate("/ContentAs");
  };

  // const handlenavigateacclients123 = () => {
  //   if (localStorage.getItem("empId")) {
  //     navigate("/GetAll_candidates");
  //   } else {
  //     navigate("/SignUp");
  //   }
  // };

  return (
    <section id="counter-stats">
      <div className="container">
        <div className="row  wow fadeInDown">
          <div className="col-lg-3 stats col-md-6 col-sm-6">
            <Link to="/showjobs">
              <div className="parentCounter">
                <div>
                  <i class="fi fi-rs-check-circle"></i>
                </div>
                <div>
                  <div className="counting">
                    <CountUp end={count.active_jobs_count} />
                  </div>
                  <h6>Active Jobs</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 stats col-md-6 col-sm-6">
            <div className="parentCounter">
              <div>
                <i className="fi fi-rr-circle-user" />
              </div>
              <div>
                <div className="counting" data-count={280}>
                  <CountUp end={count.allCandidates} />
                </div>
                <h6
                  onClick={handlenavigateacclients123}
                  style={{ cursor: "pointer" }}
                >
                  Available Candidate Profile
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3 stats col-md-6 col-sm-6">
            <Link to="/ContentAs">
              <div className="parentCounter">
                <div>
                  <i className="fi fi-rr-document" />
                </div>
                <div>
                  <div className="counting" data-count={75}>
                    <CountUp end={count.all_femaleCandidates_count} />
                  </div>
                  <h6>Elite Female Talent Pool</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 stats col-md-6 col-sm-6">
            <Link to="/ourClients">
              <div className="parentCounter">
                <div>
                  <i class="fi fi-rr-briefcase"></i>
                </div>
                <div>
                  <div className="counting" data-count={999}>
                    <CountUp end={11} />
                  </div>
                  <h6>Clients Portfolio</h6>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </section>
  );
}
