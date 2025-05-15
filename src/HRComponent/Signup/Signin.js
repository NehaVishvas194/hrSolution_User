import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "../../DashboardHR/Pages/Profile/ForgetPassword";
import { baseUrl } from "../../Api/BaseUrl";
import { MyContext } from "../../MyContext";
import logo from "../../Image/white-logo.png"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Signin(props) {
  const { text, setText } = useContext(MyContext)
   const [hide, setHide] = useState(false);
      const toggle = () => {
          setHide((prev) => !prev);
      };
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState("typing");
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitAllData = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}Emp_login`, {
        email: inputData.email,
        password: inputData.password,
      })
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "successfully SignUP!", "success");
        if (response.data.data.email) {
          const getEmail = response.data.data.email;
          const empId = response.data.data._id;
          const name = response.data.data.name;
          const profileImage = response.data.data.profileImage;
          const package_key = response.data.data.package_key
          const package_activate_date = response.data.data.package_activate_date
          setText(response.data.data.profileImage)
          localStorage.setItem("Email", getEmail);
          localStorage.setItem("empId", empId);
          localStorage.setItem("name", name);
          localStorage.setItem("profileImage", profileImage);
          localStorage.setItem("package_key", package_key);
          localStorage.setItem("package_activate_date", package_activate_date);
          console.log(empId);

          Swal.fire(
            "Client  login successfully!",
            "You clicked the button!",
            "success"
          );
          navigate("/admin");
        }

        // Reset the form fields and error state after successful submission

        setInputData({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setDisable("typing"); // Resetting the disable state
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <section className="section-paddings">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="auth-form">
                <div className="text-center mb-3">
                  <img src={logo} style={{ "height": "auto", width: "150px", "margin": "0 auto" }} />
                </div>
                <h4 className="text-center mb-4 text-white">
                  Sign in your account
                </h4>
                <>
                  {/* Hello world */}
                  <form>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label
                            htmlFor="email"
                            className="mb-1 text-white"
                          >
                            <strong>
                              Email
                              <span
                                style={{ color: "red", margin: "0px" }}
                              >
                                *
                              </span>
                            </strong>
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="info@camer.com"
                            name="email"
                            value={inputData.email}
                            onChange={submitInputdata}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group" style={{ position: "relative" }}>
                          <label htmlFor="password" className="mb-1 text-white">
                            <strong>
                              Password
                              <span style={{ color: "red", margin: "0px" }}>*</span>
                            </strong>
                          </label>
                          <input
                            type={!hide ? "password" : "text"}
                            {...props}
                            required
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={inputData.password}
                            onChange={submitInputdata}
                            style={{ paddingRight: "40px" }} // Add space for the icon
                          />
                          <span
                            className="icon"
                            onClick={toggle}
                            style={{
                              position: "absolute",
                              top: "69%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "#rgb(23 14 14)",
                            }}
                          >
                            {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Link to="/ForgetPassword">
                          {" "}
                          <a
                            className="text-white"
                            href="/ForgetPasword"
                          >
                            Forgot Password?
                          </a>
                        </Link>
                      </div>

                      <div className="text-center mt-4">
                        <button
                          className="b-btn"
                          onClick={submitAllData}
                          disabled={
                            inputData.email.length === 0 ||
                            inputData.password.length === 0 ||
                            disable === "submitted"
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    <div className="new-account mt-3">
                      <p className="text-white">
                        Do not have an account? {" "}
                        <Link to="/Signup">   <a className="text-white" href="/Signup">
                          Sign up
                        </a></Link>
                      </p>
                    </div>
                  </form>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
