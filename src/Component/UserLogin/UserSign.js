import React from "react";
import '../../HRComponent/Signup/SignUp.css';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import EastIcon from "@mui/icons-material/East";
import { useState, useEffect } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";

import Swal from "sweetalert2";
import Input from '@mui/material/Input';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/BaseUrl";
import logo from "../../Image/white-logo.png"


import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const ariaLabel = { 'aria-label': 'description' };

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



export default function UserSign(props) {
    const navigate = useNavigate();
    const [hide, setHide] = useState(false);
    const toggle = () => {
        setHide((prev) => !prev);
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        phone_no: "",
        last_name: "",
        gender: "Male"

    });

    const [disable, setDisable] = useState("typing");
    const imageFunction = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    const submitInputdata = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setEmailError("Please enter a valid email address.");
            } else {
                setEmailError(""); // Clear error if email is valid
            }
        }
        // Ensure only numeric values for phone_no and Number_of_emp
        if (
            (name === "phone_no" && (value.length > 10 || !/^\d{0,10}$/.test(value)))
        ) {
            return; // Exit the function if the validation fails
        }

        setInputData({ ...inputData, [name]: value });
    };




    const submitAllData = (e) => {
        e.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append("first_name", inputData.name);
        bodyFormData.append("email", inputData.email);
        bodyFormData.append("password", inputData.password);
        bodyFormData.append("phone_no", inputData.phone_no);
        bodyFormData.append("last_name", inputData.last_name);
        bodyFormData.append("gender", inputData.gender);
        bodyFormData.append("profileImage", selectedImage);
        if (selectedImage === null) {
            alert("Please select an image");
        } else {
            axios
                .post(`${baseUrl}courses_user_enroll`, bodyFormData)
                .then((response) => {
                    console.log(response);
                    Swal.fire("Success", "Successfully Signed Up!", "success");
                    navigate("/login");

                    setInputData({
                        name: "",
                        email: "",
                        password: "",
                        phone_no: "",
                        last_name: "",

                    });
                    setSelectedImage("")

                })
                .catch((error) => {
                    console.log(error);
                    setDisable("typing");
                    Swal.fire("Error", `${error?.response?.data?.message}`, "error");
                });
        }

    };

    return (
        <section className="section-paddings">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-7">
                        <div className="authincation-content">
                            <div className="auth-form">
                                <div className="text-center mb-3">
                                    <img src={logo} style={{ "height": "auto", width: "150px", "margin": "0 auto" }} />
                                </div>
                                <h4 className="text-center mb-4 text-white">
                                    Sign up your account
                                </h4>
                                <form>
                                    <div className="row">
                                        <div className="row">
                                            <div className="col-lg-12 col-12">
                                                <div className="form-group">
                                                    {/* <div className="profile-pic">
                                                        {selectedImage ? (
                                                            <img
                                                                alt="not found"
                                                                className="rounded-circle"
                                                                height={200}
                                                                src={URL.createObjectURL(selectedImage)}
                                                            />
                                                        ) : (
                                                            <label htmlFor="profile-image-upload">
                                                                <img
                                                                    alt="not found"
                                                                    className="rounded-circle"
                                                                    height={200}
                                                                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                                />
                                                            </label>
                                                        )}
                                                        <input
                                                            id="profile-image-upload"
                                                            type="file"
                                                            name="image"
                                                            onChange={imageFunction}
                                                            className="file-input"
                                                        />
                                                        <div style={{ color: "#999" }}></div>
                                                    </div> */}
                                                    <div className="container">

                                                        <div className="avatar-upload">
                                                            <div className="avatar-edit">
                                                                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" name="image"
                                                                    onChange={imageFunction}
                                                                    className="file-input" />
                                                                <label htmlFor="imageUpload" />
                                                            </div>
                                                            <div className="avatar-preview">
                                                                {selectedImage ? (
                                                                    <img
                                                                        alt="not found"
                                                                        className="rounded-circle"
                                                                        height={200}
                                                                        style={{ "maxWidth": "100%", "height": "auto" }}
                                                                        src={URL.createObjectURL(selectedImage)}
                                                                    />
                                                                ) : (
                                                                    <label htmlFor="profile-image-upload">
                                                                        <img
                                                                            alt="not found"
                                                                            className="rounded-circle"
                                                                            height={200}
                                                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                                            style={{ "maxWidth": "100%", "height": "auto" }}
                                                                        />
                                                                    </label>
                                                                )}
                                                                {/* <div
      id="imagePreview"
      style={{ backgroundImage: 'url("http://i.pravatar.cc/500?img=7")' }}
    ></div> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="fullname" className="mb-1 text-white">
                                                    <strong>
                                                        First name
                                                        <span style={{ color: "red", margin: "0px" }}>*</span>
                                                    </strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    className="form-control"
                                                    placeholder="First name"
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
                                        <div className="col-lg-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="fullname" className="mb-1 text-white">
                                                    <strong>
                                                        Last name
                                                        <span style={{ color: "red", margin: "0px" }}>*</span>
                                                    </strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    className="form-control"
                                                    placeholder="Last name"
                                                    name="last_name"
                                                    value={inputData.last_name}
                                                    onChange={submitInputdata}
                                                    onKeyPress={(e) => {
                                                        if (e.key.match(/[0-9]/)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="phoneno" className="mb-1 text-white">
                                                    <strong>
                                                        Phone no
                                                        <span style={{ color: "red", margin: "0px" }}>*</span>
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
                                        <div className="col-lg-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="email" className="mb-1 text-white">
                                                    <strong>
                                                        Email
                                                        <span style={{ color: "red", margin: "0px" }}>*</span>
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
                                                {emailError && <p style={{ color: "#040101" }}>{emailError}</p>} {/* Error message */}
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
                                        <div className="col-12">
                                            <div className="form-group">
                                                <FormControl>
                                                    <FormLabel id="gender-radio-buttons-group-label" style={{ color: "white", fontWeight: "600" }}>
                                                        Gender<span style={{ color: "red", margin: "0px" }}>*</span>
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="gender-radio-buttons-group-label"
                                                        style={{ color: "white" }}
                                                        name="gender"
                                                        value={inputData.gender}
                                                        onChange={submitInputdata}
                                                    >
                                                       
                                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                className="b-btn"
                                                onClick={(e) => submitAllData(e)}
                                                disabled={
                                                    inputData.name.length === 0 ||
                                                    inputData.email.length === 0 ||
                                                    inputData.phone_no.length === 0 ||
                                                    inputData.password.length === 0 ||
                                                    inputData.last_name.length === 0 ||
                                                    inputData.gender.length === 0 ||
                                                    // selectedImage === null ||
                                                    disable === "submitted"
                                                }
                                            >
                                                Submit
                                                <EastIcon />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="new-account mt-3">
                                    <p className="text-white">
                                        Already have an account?{" "}
                                        <Link to="/login" className="text-white">
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

// no need 
