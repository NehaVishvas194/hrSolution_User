import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../Api/BaseUrl";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

export default function ChangePassword(props) {
  const defaultState = {
    oldPassword: "",
    password: "",
    confirmpassword: "",
  };
  const adminId = localStorage.getItem("empId");
  const [jobErr, setJobErr] = useState(false);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
   const [hide, setHide] = useState(false);
    const toggle = () => {
      setHide((prev) => !prev);
    };
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const submitData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = () => {
    console.log(state);
    setJobErr({
      oldPassword: false,
      password: false,
      confirmpassword: false,

    });
    if (!state.oldPassword) {
      setJobErr((prevState) => ({ ...prevState, oldPassword: true }));
    }

    if (!state.password) {
      setJobErr((prevState) => ({ ...prevState, password: true }));
    }
    if (!state.confirmpassword) {
      setJobErr((prevState) => ({ ...prevState, confirmpassword: true }));
    }
    if (!state.oldPassword || !state.password || !state.confirmpassword) {
      return;
    }
    axios
      .post(`${baseUrl}emp_ChangePassword/${adminId}`, {
        oldPassword: state.oldPassword,
        password: state.password,
        confirmPassword: state.confirmpassword,
      })
      .then((response) => {
        console.log(response);

        if (response.data.success) {
          Swal.fire(
            "Password  update  successfully!",
            "You clicked the button!",
            "success"
          );
          navigate("/admin");
          setJobErr(false)
          setState({
            oldPassword: "",
            password: "",
            confirmpassword: "",
          });
          setError({
            isError: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  return (
    <div>
      <>
        <div className="container " style={{ backgroundColor: "#fff" }}>
          <div className="row m-0 ">
            <div className="col-12 my-3">
              <h4 className="text-center"> Change password</h4>
            </div>
            <span style={{ color: "red" }}>
              {error.isError
                ? error?.errors?.response?.data?.OldPasswordValidMessage
                : " "}
            </span>
            <div className="col-12 my-3">
              <TextField
                fullWidth
                variant="outlined"
                size="large"
                label={"Old Password "}
                name="oldPassword"
                onChange={submitData}
                value={state.oldPassword}
              />
              <span style={{ color: "red" }}>
                {jobErr && !state.oldPassword
                  ? "*Please Enter Old Password"
                  : ""}
              </span>
            </div>
            <div className="col-12 my-3">
              <TextField
                fullWidth
                variant="outlined"
                type="password"
                size="large"
                label={"New Password"}
                name="password"
                onChange={submitData}
                value={state.password}
              />
              <span style={{ color: "red" }}>
                {jobErr && !state.password
                  ? "*Please Enter  New Password"
                  : ""}
              </span>
            </div>
            <div className="col-12 my-3">
              <span style={{ color: "red" }}>
                {error.isError
                  ? error?.errors?.response?.data?.passwordMatchMessage
                  : " "}
              </span>
              <TextField
               type={!hide ? "password" : "text"}
               {...props}
                fullWidth
                variant="outlined"
                className="me-2"
                size="large"
                label={"Confirm Password "}
                name="confirmpassword"
                onChange={submitData}
                value={state.confirmpassword}
                
              />
               {/* <span
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
              </span> */}
              <span style={{ color: "red" }}>
                {jobErr && !state.confirmpassword
                  ? "*Please Enter Confirm Password"
                  : ""}
              </span>
            </div>
            <div className="col-12 my-3 d-flex justify-content-center">
              <button
                type="submit"
                className="global_button"
                onClick={submitFormData}
                style={{ borderRadius: "5px" }}
              >
                Submit <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
