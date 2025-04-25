import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import { baseUrl } from "../../../Api/BaseUrl";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";

export default function AddJobDescription() {
  const navigate = useNavigate();
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [jobErr, setJobErr] = useState(false);
  const [inputData, setInputData] = useState({
    job_Description: "",
    Responsibilities: "",

  });
  let name, value;
  const submitInputdata = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };
  const fetchJobTitles = () => {
    axios.get(`${baseUrl}alljobTitle`)

      .then((response) => {
        console.log(response.data.details)
        const option = response.data.details.map((info) => {
          return info.jobTitle
        })
        console.log(option)
        setJobTitles(option)

      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    fetchJobTitles();

  }, []);
  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(value);
  };
  const submitAllData = () => {
    setJobErr({
      job_Description: false,
      Responsibilities: false,

    });
    if (!inputData.job_Description) {
      setJobErr((prevState) => ({ ...prevState, job_Description: true }));
    }
    if (!inputData.Responsibilities) {
      setJobErr((prevState) => ({ ...prevState, Responsibilities: true }));
    }
    if (!selectedJobTitle) {
      setJobErr((prevState) => ({ ...prevState, selectedJobTitle: true }));
    }
    if (!inputData.job_Description || !inputData.Responsibilities || !selectedJobTitle) {
      return;
    }
    axios.post(`${baseUrl}addJob_Description`,{
      jobTitle:selectedJobTitle,
      job_Description:inputData.job_Description,
      Responsibilities :inputData.Responsibilities
    }).then((response)=>{
      console.log(response)
      if(response.status ===200){
        Swal.fire("Success", "job Description added successfully !", "success");
        navigate("/admin/AddNewJob");
      }
       
     
    }).catch((error)=>{
      console.log(error)
      Swal.fire("Error", `${error?.response?.data?.message}`, "error");
    })
  }


  return (
    <>
      {/* Add new Job in French*/}
      <div className="container">
        <div className="header-div">
          <span>
            <i className="fas fa-users"></i>
          </span>
          <span>New Job Description</span>
        </div>
        <div className="row row-style">
          <div className="col-12">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Autocomplete
                  fullWidth
                  className="MuiAutocomplete-input mb-1 mt-4"
                  disablePortal
                  id="combo-box-demo"
                  options={jobTitles}
                  value={selectedJobTitle}
                  onChange={handleJobTitleChange}
                  size="normal"
                  style={{ mx: 'auto', width: '100%', p: 3 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Job title"
                      size="small"
                      variant="outlined"
                    />
                  )}
                />
              </div>


              <span style={{ color: "red" }}>
                {jobErr && !selectedJobTitle
                  ? "*Please Enter Your Job title"
                  : ""}
              </span>

            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  className="mb-1 mt-2 w-100"
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4.5}
                  type="file"
                  name="job_Description"
                  value={inputData.job_Description}
                  onChange={submitInputdata}
                  fullWidth
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.job_Description
                  ? "*Please Enter Your Description"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  className="mb-1 mt-3 w-100"
                  id="outlined-multiline-static"
                  label="Responsibilities"
                  multiline
                  type="text"
                  name="Responsibilities"
                  value={inputData.Responsibilities}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.Responsibilities
                  ? "*Please Enter Your Responsibilities"
                  : ""}
              </span>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-center mt-2">
            <button
              type="button"
              className="global_button mb-3"
              style={{ borderRadius: "5px" }}
              onClick={submitAllData}
            >
              Submit
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
