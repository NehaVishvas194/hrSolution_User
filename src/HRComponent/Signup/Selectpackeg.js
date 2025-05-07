import React, { useState, useEffect } from "react";
import "./Selectpackeg.css";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { baseUrl } from "../../Api/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Selectpackeg() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location?.state?.inputData);
  const [currentRadioValue, setCurrentRadioValue] = useState(null);
  const [currentmonth, setCurrentmonth] = useState(null);
  const [sessionID, setSessionID] = useState("");
  const [pack, setPack] = useState([]);

  const fetchpackage = () => {
    axios
      .get(`${baseUrl}getActivePackages`)
      .then((response) => {
        console.log(response);
        setPack(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    fetchpackage();
  }, []);

  const handleRadioChange = (e) => {
    setCurrentRadioValue(e.target.value);
    console.log("Selected Package:", e.target.value);
  };
  const handleRadioMonths = (e) => {
    setCurrentmonth(e.target.value);
    console.log("Selected Package:", e.target.value);
  };

  // const dataObject = {
  //     name: location?.state?.inputData?.name,
  //     email: location?.state?.inputData?.email,
  //     password: location?.state?.inputData?.password,
  //     phone_no: location?.state?.inputData?.phone_no,
  //     profileImage: location?.state?.selectedImage,
  //     company_industry: location?.state?.industry,
  //     company_name: location?.state?.inputData?.company_name,
  //     Number_of_emp: location?.state?.inputData?.Number_of_emp,
  //     company_HQ: location?.state?.companyName,
  //     package_id: currentRadioValue,
  //     payment_status: 1,
  //     session_id: sessionID
  // }

  const handleSignup = async () => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("name", location?.state?.inputData?.name || "");
      formData.append("email", location?.state?.inputData?.email || "");
      formData.append("password", location?.state?.inputData?.password || "");
      formData.append("phone_no", location?.state?.inputData?.phone_no || "");
      formData.append("profileImage", location?.state?.selectedImage || null);
      formData.append("company_industry", location?.state?.industry || "");
      formData.append(
        "company_name",
        location?.state?.inputData?.company_name || ""
      );
      formData.append(
        "Number_of_emp",
        location?.state?.inputData?.Number_of_emp || ""
      );
      formData.append("company_HQ", location?.state?.companyName || "");

      // Add package and session information
      const packageID = currentmonth || currentRadioValue;
      formData.append("package_id", packageID);

      // Send the signup request
      const response = await axios.post(`${baseUrl}employeeSignup`, formData);
      console.log("Signup response:", response.data);

      if (response.status === 200) {
        console.log("Successfully Signed Up!");
        Swal.fire("Success", "Successfully Signed Up!", "success");
        navigate("/Signin");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire(
        "Error",
        `${error?.response?.data?.message || "Signup failed"}`,
        "error"
      );
    }
  };

  const handleSignupYear = async () => {
    console.log("Starting signup process...");

    try {
      const formData = new FormData();
      formData.append("name", location?.state?.inputData?.name || "");
      formData.append("email", location?.state?.inputData?.email || "");
      formData.append("password", location?.state?.inputData?.password || "");
      formData.append("phone_no", location?.state?.inputData?.phone_no || "");
      formData.append("profileImage", location?.state?.selectedImage || null);
      formData.append("company_industry", location?.state?.industry || "");
      formData.append(
        "company_name",
        location?.state?.inputData?.company_name || ""
      );
      formData.append(
        "Number_of_emp",
        location?.state?.inputData?.Number_of_emp || ""
      );
      formData.append("company_HQ", location?.state?.companyName || "");

      const packageID = currentmonth || currentRadioValue;
      console.log("Package ID:", packageID);
      formData.append("package_id", packageID);

      const signupResponse = await axios.post(
        `${baseUrl}employeeSignup`,
        formData
      );
      console.log("Signup response:", signupResponse.data);
      localStorage.setItem("clientId", signupResponse.data.clientId);
      if (signupResponse.status === 200) {
        console.log("Signup successful. Initiating payment...");

        const total_amount = 1;
        const cancelUrl =
          "http://itdevelopmentservices.com/hrsolution/cancel-package/";
        const receiptUrl =
          "https://itdevelopmentservices.com/hrsolution/Success-Paymet";

        try {
          const paymentResponse = await axios.get(
            `${baseUrl}create_checkOut_session_for_package?cancelUrl=${cancelUrl}&receiptUrl=${receiptUrl}&client_id=${localStorage.getItem(
              "clientId"
            )}&package_id=${currentRadioValue}`
          );
          console.log("Payment API response:", paymentResponse.data);

          if (paymentResponse.status === 200) {
            const { session_id, checkoutUrl } = paymentResponse.data;

            console.log("Redirecting to payment gateway...");
            localStorage.setItem("session_id", session_id);
            setSessionID(session_id);

            window.location = checkoutUrl;
          }
        } catch (error) {
          console.error("Payment API error:", error);
          Swal.fire(
            "Error",
            `${error?.response?.data?.message || "Payment initiation failed"}`,
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire(
        "Error",
        `${error?.response?.data?.message || "Signup failed"}`,
        "error"
      );
    }
  };
  // Function to handle signup after successful payment
  return (
    <>
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul
                className="nav nav-tabs navBtnMain mt-5"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Yearly Packages
                  </button>
                </li>
                {/* {" "} <span style={{"font-size":"36px","margin":"-7px 8px"}}>/</span> */}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    Weekly Packages
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex={0}
            >
              {" "}
              <div className="col-lg-8 offset-lg-2" id="price">
                {/* {/ <h5 className="special-heading text-center">Choose</h5> /} */}
                <h1 className="text-center mt-5">Yearly Packages</h1>
                <p className="text-center big mt-3">
                  Get ready for more potential, more opportunity and more of
                  everything you expect from internet service provider
                </p>
              </div>
              <div className="packList row mt-4">
                {Array.isArray(pack.yearly_packages) &&
                pack.yearly_packages.length > 0 ? (
                  pack.yearly_packages.map((info, index) => {
                    if (!info.package_name || !info.price) {
                      console.error("Invalid package data:", info);
                      return null; // Skip invalid entries
                    }
                    return (
                      <div className="col-md-4" key={index}>
                        <div className="packContainer">
                          <input
                            type="radio"
                            id={`personal-${index}`}
                            className="packRadio"
                            name="pack"
                            onChange={handleRadioChange}
                            value={info.package_id}
                          />
                          <label className="pack" htmlFor={`personal-${index}`}>
                            <div className="header">
                              <h2>{info.package_name}</h2>
                            </div>
                            <div className="price">
                              <p>{info.price}</p>
                            </div>
                            <div className="features">
                              <ul>
                                {/* Dynamically render features */}
                                {info.features &&
                                typeof info.features === "string" ? (
                                  info.features
                                    .split(",")
                                    .map((feature, i) => (
                                      <li key={i}>{feature.trim()}</li>
                                    ))
                                ) : (
                                  <li>No features available</li>
                                )}
                              </ul>
                            </div>
                          </label>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No yearly packages found.</p>
                )}
              </div>
              <div className="text-center my-5">
                <button
                  className="b-btn"
                  disabled={currentRadioValue === null}
                  onClick={(e) => handleSignupYear(e)}
                >
                  Next
                  <EastIcon style={{ height: "15px" }} />
                </button>
              </div>
            </div>
            <div
              className="tab-pane fade mt-5 mb-5"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex={0}
            >
              <div className="col-lg-8 offset-lg-2" id="price">
                {/* {/ <h5 className="special-heading text-center">Choose</h5> /} */}
                <h1 className="text-center"> Weekly Packages</h1>
                <p className="text-center big mt-3 mb-0 ">
                  Get ready for more potential, more opportunity and more of
                  everything you expect from internet provider
                </p>
              </div>
              <div className="packList row mt-4">
                {Array.isArray(pack.weekly_packages) &&
                pack.weekly_packages.length > 0 ? (
                  pack.weekly_packages.map((info, index) => {
                    if (!info.package_name || !info.price) {
                      console.error("Invalid package data:", info);
                      return null; // Skip invalid entries
                    }

                    return (
                      <div className="col-md-3 my-3" key={index}>
                        <div className="packContainer">
                          <input
                            type="radio"
                            id={`personal2-${index}`}
                            className="packRadio"
                            name="pack2"
                            onChange={handleRadioMonths}
                            value={info.package_id}
                          />
                          <label
                            className="pack"
                            htmlFor={`personal2-${index}`}
                          >
                            <div className="header">
                              <h2>{info.package_name}</h2>
                            </div>
                            <div className="price">
                              <p>{info.price}</p>
                              <strong className="durationWeek">Features</strong>
                              <h5>{info.features}</h5>
                              <strong className="durationWeek">Duration</strong>
                              <h5>{info.duration}</h5>
                              <strong className="durationWeek">
                                GST Included
                              </strong>
                              <h6 className="mb-0">{info.price_with_gst}</h6>
                            </div>
                            {/* <div className="features">
                                                            <p className="mb-0">
                                                                {typeof info.features === 'string'
                                                                    ? info.features
                                                                    : "No features available"}
                                                            </p>
                                                        </div> */}
                          </label>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>No yearly packages found.</p>
                )}
              </div>

              <div className="text-center mt-5">
                <button
                  className="b-btn"
                  disabled={currentmonth === null}
                  onClick={(e) => handleSignup(e)}
                >
                  Next
                  <EastIcon style={{ height: "15px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
