import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import bgimg from "../Image/resum.jpg";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import Swal from "sweetalert2";

const UploadResume = () => {
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const initialState = {
    first_Name: "",
    last_Name: "",
    email: "",
    location: "Sierra Leone",
    phone_no: "",
    gender: "",
    job_title: "",
    area_of_qualification: "",
    Highest_Education: "",
    candidate_status: "",
    uploadResume: null,
    home_address: "",
    city: "",
  };

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");

  const bannercss = { backgroundImage: `url(${bgimg})` };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "phone_no") {
      // Allow only numeric values and limit length to 10
      if (!/^\d*$/.test(value)) return; // Prevent non-numeric input
      if (value.length > 10) return; // Limit phone number to 10 digits
    }

    if (type === "file") {
      if (files[0].type !== "application/pdf") {
        setFileError("Please upload a PDF file.");
        setData({ ...data, uploadResume: null });
      } else {
        setFileError("");
        setData({ ...data, [name]: files[0] });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleJobTitleChange = (event) => {
    const value = event.target.value;
    setSelectedJobTitle(value);
    setData({ ...data, city: value });
  };

  const validate = () => {
    const newErrors = {};

    // First Name Validation
    if (!data.first_Name) newErrors.first_Name = "First name is required";

    // Last Name Validation
    if (!data.last_Name) newErrors.last_Name = "Last name is required";
    // if (!data.area_of_study)
    //   newErrors.area_of_study = "Area of Study is required";
    // Email Validation
    if (!data.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Phone Number Validation
    if (!data.phone_no) {
      newErrors.phone_no = "Phone number is required";
    } else {
      const phoneRegex = /^\d{10}$/; // Adjust based on country format
      if (!phoneRegex.test(data.phone_no)) {
        newErrors.phone_no = "Please enter a valid 10-digit phone number";
      }
    }

    // Other Field Validations
    if (!data.gender) newErrors.gender = "Gender is required";
    if (!data.job_title) newErrors.job_title = "Job title is required";
    if (!data.Highest_Education)
      newErrors.Highest_Education = "Highest education is required";
    if (!data.uploadResume) newErrors.uploadResume = "Resume is required";
    if (!data.home_address) newErrors.home_address = "Home address is required";
    if (!data.area_of_qualification)
      newErrors.area_of_qualification = "Qualification is required";

    // City Validation (ensure correct field is checked)
    if (!data.city) newErrors.city = "City is required";

    return newErrors;
  };

  const handleClick = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const postData = new FormData();
    Object.keys(data).forEach((key) => {
      postData.append(key, data[key]);
    });

    axios
      .post(`${baseUrl}uploadResume`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Resume uploaded successfully!",
          text: "You clicked the button!",
          icon: "success",
        });
        if (response.status === 200) {
          setErrors({});
          setData(initialState);
          setSelectedJobTitle("");
          document.getElementById("resumeUpload").value = null;
        }
      })
      .catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
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
                <h2>Upload Resume</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="form_details">
                <h2>Submit Your CV Here</h2>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="fname" className="mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.first_Name}
                        id="fname"
                        name="first_Name"
                        onKeyPress={(e) => {
                          if (e.key.match(/[^a-zA-Z]/)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.first_Name && (
                        <small className="text-danger">
                          {errors.first_Name}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="lname" className="mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.last_Name}
                        id="lname"
                        name="last_Name"
                        onKeyPress={(e) => {
                          if (e.key.match(/[^a-zA-Z]/)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.last_Name && (
                        <small className="text-danger">
                          {errors.last_Name}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                        value={data.email}
                        id="email"
                        name="email"
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                  </div>
                  {/* <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="City" className='mb-2'>City</label>
                      <input type='text' className='form-control' onChange={handleChange} value={data.city} id='City' name='city' />
                      {errors.city && <small className="text-danger">{errors.city}</small>}
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="phoneno" className="mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.phone_no}
                        id="phoneno"
                        name="phone_no"
                        maxLength="10" // Prevents entering more than 10 digits
                        // placeholder="Enter your phone number"
                      />

                      {errors.phone_no && (
                        <small className="text-danger">{errors.phone_no}</small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="home_address" className="mb-2">
                        Home Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.home_address}
                        id="home_address"
                        name="home_address"
                      />
                      {errors.home_address && (
                        <small className="text-danger">
                          {errors.home_address}
                        </small>
                      )}
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="area_of_study" className="mb-2">
                        Area of Study
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.area_of_study}
                        id="area_of_study"
                        name="area_of_study"
                      />
                      {errors.area_of_study && (
                        <small className="text-danger">
                          {errors.area_of_study}
                        </small>
                      )}
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="area_of_qualification" className="mb-2">
                        Area of Qualification
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.area_of_qualification}
                        id="area_of_qualification"
                        name="area_of_qualification"
                      />
                      {errors.area_of_qualification && (
                        <small className="text-danger">
                          {errors.area_of_qualification}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="job_title" className="mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={data.job_title}
                        id="job_title"
                        name="job_title"
                        onKeyPress={(e) => {
                          if (e.key.match(/[^a-zA-Z]/)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.job_title && (
                        <small className="text-danger">
                          {errors.job_title}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="Location" className="mb-2">
                        District
                      </label>
                      <select
                        name="selectedJobTitle"
                        id="Location"
                        className="form-control"
                        onChange={handleJobTitleChange}
                        value={selectedJobTitle}
                      >
                        <option value="">Select</option>
                        <option value="Western Area Urban">
                          Western Area Urban
                        </option>
                        <option value="Western Area Rural">
                          Western Area Rural
                        </option>
                        <option value="Bombali">Bombali</option>
                        <option value="Kailahun">Kailahun</option>
                        <option value="Kenema">Kenema</option>
                        <option value="Koinadugu">Koinadugu</option>
                        <option value="Kono">Kono</option>
                        <option value="Moyamba">Moyamba</option>
                        <option value="Port Loko">Port Loko</option>
                        <option value="Pujehun">Pujehun</option>
                        <option value="Tonkolili">Tonkolili</option>
                        <option value="Bo">Bo</option>
                        <option value="Bonthe">Bonthe</option>
                        <option value="Falaba">Falaba</option>
                        <option value="Karene">Karene</option>
                      </select>
                      {!selectedJobTitle && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="gender" className="mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        className="form-control"
                        onChange={handleChange}
                        value={data.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <small className="text-danger">{errors.gender}</small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="education" className="mb-2">
                        Highest Education
                      </label>
                      <select
                        name="Highest_Education"
                        id="education"
                        className="form-control"
                        onChange={handleChange}
                        value={data.Highest_Education}
                      >
                        <option value="">Select Education</option>
                        <option value="Masters">Master</option>
                        <option value="Diploma">Doctorate</option>
                        <option value="Masters">Bachelor</option>
                        <option value="Masters">Diploma</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Senior School Certificate">
                          Senior Secondary School Certificate
                        </option>
                        <option value="Junior School Certificate">
                          Junior Secondary School Certificate
                        </option>
                      </select>
                      {errors.Highest_Education && (
                        <small className="text-danger">
                          {errors.Highest_Education}
                        </small>
                      )}
                    </div>
                  </div>
                  {/* <div className='col-md-6'>
                    <div className='mb-3'>
                      <label htmlFor="cstatus" className='mb-2'>Job-Hunt Status</label>
                      <select name="candidate_status" id="cstatus" className='form-control' onChange={handleChange} value={data.candidate_status}>
                        <option value=''>Select Status</option>
                        <option value="1">Active</option>
                        <option value="0">Passive</option>
                      </select>
                      {errors.candidate_status && <small className="text-danger">{errors.candidate_status}</small>}
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="mb-2">
                        Upload CV
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="resumeUpload"
                        onChange={handleChange}
                        name="uploadResume"
                      />
                      {fileError && (
                        <small className="text-danger">{fileError}</small>
                      )}
                      {errors.uploadResume && (
                        <small className="text-danger">
                          {errors.uploadResume}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 my-2" style={{ "text-align": "end" }}>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleClick}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UploadResume;
