import React, { useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios'
import { baseUrl } from '../../../Api/BaseUrl';
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';
import swal from 'sweetalert2'
import logo from "../../../Image/white-logo.png"
import { useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function ResetPasswordPage(props) {
    const [hide, setHide] = useState(false);
    const [hide2, setHide2] = useState(false);
    const toggle = () => {
        setHide((prev) => !prev);
    };
    const toggle2 = () => {
        setHide2((prev) => !prev);
    };
    let location = useLocation()
    let data = location.state?.clienID
    const [clienID, setClientID] = useState(data)

    const [error, seterror] = useState({
        error: {

        }, isarray: false
    })
    const navigate = useNavigate();

    const userId = localStorage.getItem("empId")
    console.log(userId)
    const [password, setpassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleResetpassword = (e) => {
        e.preventDefault();
        navigate('/ResetPasswordPage')
        axios.post(`${baseUrl}clientResetPass/${clienID}`, {
            password: password,
            confirmPassword: confirmPassword

        }).then((response) => {
            if (response.status === 200) {
                Swal.fire(
                    `${response.data.message}`,
                    "You clicked the button!",
                    "success"
                );
                navigate("/Signin");
            }
        }).catch((error) => {
            Swal.fire(
                "Error",
                `${error?.response?.data?.message}`,
                "error"
            );

        });
    }

    return (
        <>
            <section className="section-paddings">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="auth-form">
                                    <div className="text-center mb-3">
                                        <img src={logo} style={{ "height": "auto", width: "150px", "margin": "0 auto" }} />
                                    </div>
                                    <h4 className="text-center text-white">
                                        Reset Password
                                    </h4>
                                    <form onSubmit={handleResetpassword} >
                                        <div className="form-group" style={{ position: "relative" }}>
                                            <label className="mb-1 text-white">
                                                <strong>Password*</strong>
                                            </label>
                                            <input
                                             type={!hide ? "password" : "text"}
                                             {...props}
                                                 
                                                className="form-control"
                                                placeholder="Please enter password"
                                                required=""
                                                onChange={(e) => setpassword(e.target.value)}
                                                value={password}
                                                name="password"
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
                                            {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                        </div>
                                        <div className="form-group" style={{ position: "relative" }}>
                                            <label className="mb-1 text-white">
                                                <strong>Confirm Password*</strong>
                                            </label>
                                            <input
                                               type={!hide2 ? "password" : "text"}
                                               {...props}
                                                className="form-control"
                                                placeholder="Please enter Confirm Password"
                                                required=""
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                name="confirmPassword"
                                            />
                                            <span
                                                className="icon"
                                                onClick={toggle2}
                                                style={{
                                                    position: "absolute",
                                                    top: "69%",
                                                    right: "10px",
                                                    transform: "translateY(-50%)",
                                                    cursor: "pointer",
                                                    color: "#rgb(23 14 14)",
                                                }}
                                            >
                                                {hide2 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </span>
                                            {error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""}
                                        </div>
                                        <div className="text-center">
                                            <Button variant="contained" type='submit' className="b-btn rounded-pill my-3" style={{ "backgroundColor": "#020950", "color": "white", "lineHeight": "27px" }}>Reset Password</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
