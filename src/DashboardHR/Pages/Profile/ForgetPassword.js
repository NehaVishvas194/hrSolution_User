import React, { useState } from 'react'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../../Api/BaseUrl';
import axios from 'axios';
import logo from "../../../Image/white-logo.png"
import Swal from "sweetalert2";
export default function ForgetPassword() {
    const navigate = useNavigate();
    const [forgotErr, setForgotErr] = useState(false);
    const [email, setEmail] = useState("")
    const [error, setError] = useState({
        errors: {},
        isError: false,
    });
    const handlsubmint = (e) => {
        e.preventDefault();
        if (email == "") {
            setForgotErr(true);
        } else {
            setForgotErr(false);
            axios.post(`${baseUrl}forgetPassOTP`, {
                email: email
            }).then((response) => {

                console.log(response)
                if (response.status === 200) {
                    Swal.fire(
                        `${response.data.message}`,
                        "You clicked the button!",
                        "success"
                    );
                    navigate("/GetOtpPage",{state:{email:response.data.email}});
                }
            }).catch((error) => {
                Swal.fire(
                    "Error",
                    `${error?.response?.data?.message}`,
                    "error"
                );

            })
        }

    }
    return (
        <>
            <section className="section-paddings">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="authincation-content">
                                <div className="auth-form">
                                    <div className="text-center mb-3">
                                        <img src={logo} style={{ "height": "auto", width: "150px", "margin": "0 auto" }} />
                                    </div>
                                    <h4 className="text-center mb-4 text-white">
                                        Forgot Password
                                    </h4>
                                    <form onSubmit={handlsubmint}>
                                        <div className="row">
                                            <div className="col-lg-12 col-12">
                                                <div className="form-group">
                                                    <label className="mb-1 text-white">
                                                        <strong>Email*</strong>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Please enter email"
                                                        required=""
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        name="email"
                                                    />
                                                    <span style={{ color: "red" }}>
                                                        {error.isError
                                                            ? error.errors?.response?.data?.message
                                                            : " "}
                                                    </span>
                                                    {/* {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""} */}
                                                </div>
                                                <div className="text-center">
                                                    <Button variant="contained" type='submit' className="b-btn rounded-pill mt-3" style={{ "backgroundColor": "#020950", "color": "white", "lineHeight": "27px" }}>Forget Password</Button>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
