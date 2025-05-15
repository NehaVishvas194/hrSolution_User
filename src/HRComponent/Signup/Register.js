import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EastIcon from "@mui/icons-material/East";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/BaseUrl";
import logo from "../../Image/white-logo.png";
import { useLocation } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ariaLabel = { "aria-label": "description" };
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const company = [
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
];

export default function Register(props) {
  //  const location = useLocation();
  //  console.log(location.state.id)
  const [hide, setHide] = useState(false);
  const toggle = () => {
    setHide((prev) => !prev);
  };
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [jobTitles, setJobTitles] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [fileLogoError, setfileLogoError] = useState("");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    company_name: "",
    Number_of_emp: "",
  });

  const [disable, setDisable] = useState("typing");
  const [facilitiesName, setFacilitiesName] = React.useState([]);
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setFacilitiesName(typeof value === "string" ? value.split(",") : value);
  };
  const [companyName, setCompanyName] = React.useState([]);
  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;

    setCompanyName(typeof value === "string" ? value.split(",") : value);
  };
  
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

  const submitInputdata = (e) => {
    const { name, value, files } = e.target;
    // Email validation
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
    if (
      (name === "phone_no" &&
        (value.length > 10 || !/^\d{0,10}$/.test(value))) || // Restrict to 10 digits for phone_no
      (name === "Number_of_emp" && value !== "" && !/^\d+$/.test(value)) // Numeric only for Number_of_emp
    ) {
      return;
    }

    setInputData({ ...inputData, [name]: value });
  };

  // const imageFunction = (event) => {
  //   setSelectedImage(event.target.files[0]);
  // };
  const imageFunction = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const submitAllData = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputData.email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", inputData.name);
      formData.append("email", inputData.email);
      formData.append("password", inputData.password);
      formData.append("phone_no", inputData.phone_no);
      formData.append("company_name", inputData.company_name);
      formData.append("Number_of_emp", inputData.Number_of_emp);
      formData.append("company_industry", facilitiesName); // it's selected from dropdown
      formData.append("company_HQ", companyName); // it's selected from dropdown
      formData.append("profileImage", selectedImage); // your image file

      setDisable("submitted"); // disable button while submitting

      const response = await axios.post(`${baseUrl}clientSignup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have been registered successfully!",
        });

        // Clear the form fields
        setInputData({
          name: "",
          email: "",
          password: "",
          phone_no: "",
          company_name: "",
          Number_of_emp: "",
        });
        setFacilitiesName("");
        setCompanyName("");
        setSelectedImage(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setDisable("typing"); // Enable button again after attempt
    }
  };

  return (
    <section className="section-paddings">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-7 col-md-10 col-12">
            <div className="authincation-content">
              <div className="auth-form">
                <div className="text-center mb-3">
                  <img
                    src={logo}
                    style={{ height: "auto", width: "150px", margin: "0 auto" }}
                  />
                </div>
                <h4 className="text-center mb-3 text-white">
                  Sign up your account
                </h4>
                <form>
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <div className="form-group">
                        <div className="container">
                          <div className="avatar-upload">
                            <div className="avatar-edit">
                              <input
                                type="file"
                                id="imageUpload"
                                accept=".png, .jpg, .jpeg"
                                name="image"
                                onChange={imageFunction}
                                className="file-input"
                                // style={{ display: "none" }}
                              />
                              <label htmlFor="imageUpload" />
                            </div>
                            <div className="avatar-preview">
                              {selectedImage ? (
                                <img
                                  alt="not found"
                                  className="rounded-circle"
                                  src={URL.createObjectURL(selectedImage)}
                                />
                              ) : (
                                <label htmlFor="profile-image-upload">
                                  <img
                                    alt="not found"
                                    className="rounded-circle"
                                    src="https://cdn.pixabay.com/photo/2017/06/12/00/29/building-2393978_640.png"
                                  />
                                </label>
                              )}
                            </div>
                          </div>
                          <p className="Logo_para">Upload Company Logo</p>
                        </div>
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="fullname" className="mb-1 text-white">
                          <strong>
                            Full Name
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <input
                          type="text"
                          id="fullname"
                          className="form-control"
                          placeholder="Full Name"
                          name="name"
                          value={inputData.name}
                          onChange={submitInputdata}
                          onKeyPress={(e) => {
                            if (e.key.match(/[0-9]/)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="phoneno" className="mb-1 text-white">
                          <strong>
                            Phone no
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <input
                          type="text"
                          id="phoneno"
                          className="form-control"
                          placeholder="Phone no"
                          name="phone_no"
                          value={inputData.phone_no}
                          onChange={submitInputdata}
                          pattern="[0-9]{10}"
                        />
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="email" className="mb-1 text-white">
                          <strong>
                            Email
                            <span style={{ color: "red", margin: "0px" }}>
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
                        {emailError && (
                          <p style={{ color: "#040101" }}>{emailError}</p>
                        )}{" "}
                        {/* Error message */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div
                        className="form-group"
                        style={{ position: "relative" }}
                      >
                        <label htmlFor="password" className="mb-1 text-white">
                          <strong>
                            Password
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
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

                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label
                          htmlFor="companyname"
                          className="mb-1 text-white"
                        >
                          <strong>
                            Company name
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <div className="col-12 d-flex justify-content-center">
                          <Input
                            className=" w-100 Input_class"
                            id="companyname"
                            label="Company name"
                            style={{ backgroundColor: "white", height: "45px" }}
                            rows={4.5}
                            type="text"
                            name="company_name"
                            value={inputData.company_name}
                            onChange={submitInputdata}
                            size="normal"
                            inputProps={ariaLabel}
                            placeholder="Company name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label
                          htmlFor="numberofemp"
                          className="mb-1 text-white"
                        >
                          <strong>
                            Number of emp
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <div className="col-12 d-flex justify-content-center">
                          <Input
                            className="  w-100 Input_class"
                            id="numberofemp"
                            label="Number of emp"
                            style={{ backgroundColor: "white", height: "45px" }}
                            rows={4.5}
                            type="text"
                            name="Number_of_emp"
                            value={inputData.Number_of_emp}
                            onChange={submitInputdata}
                            size="normal"
                            inputProps={ariaLabel}
                            placeholder="Number of emp"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label
                          htmlFor="companyindustry"
                          className="mb-1 text-white"
                        >
                          <strong>
                            Company industry
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <div className="col-12 d-flex justify-content-center">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 200, // Set the maximum height of the dropdown
                                    overflowY: "auto", // Enable scrolling for long lists
                                  },
                                },
                              }}
                              value={facilitiesName}
                              // label={
                              //   !facilitiesName.length ? "Company Industry" : ""
                              // }
                              onChange={handleChange2}
                              style={{
                                backgroundColor: "white",
                                height: "45px",
                              }}
                            >
                              {jobTitles.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className=" col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <label htmlFor="companyhq" className="mb-1 text-white">
                          <strong>
                            Company HQ
                            <span style={{ color: "red", margin: "0px" }}>
                              *
                            </span>
                          </strong>
                        </label>
                        <div className="col-12 d-flex justify-content-center">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              autoWidth={true}
                              value={companyName}
                              // label={!companyName.length ? "companyName" : ""}
                              onChange={handleChange3}
                              style={{
                                backgroundColor: "white",
                                height: "45px",
                              }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    maxHeight: 200, // Set the maximum height of the dropdown
                                    overflowY: "auto", // Enable scrolling for long lists
                                  },
                                },
                              }}
                            >
                              {company.map((name) => (
                                <MenuItem key={name} value={name}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="b-btn"
                        onClick={(e) => submitAllData(e)}
                        disabled={
                          inputData.name.length === 0 ||
                          inputData.email.length === 0 ||
                          inputData.phone_no.length === 0 ||
                          inputData.password.length === 0 ||
                          inputData.company_name.length === 0 ||
                          inputData.Number_of_emp.length === 0 ||
                          companyName.length === 0 ||
                          facilitiesName.length === 0 ||
                          // selectedImage === null ||
                          disable === "submitted"
                        }
                      >
                        Submit
                        <EastIcon style={{ height: "15px" }} />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="new-account mt-3">
                  <p className="text-white">
                    Already have an account?{" "}
                    <Link to="/Signin" className="text-white">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
