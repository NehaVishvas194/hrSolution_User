import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

import axios from "axios";
import "./AddNewJob.css";

import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/BaseUrl";
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Switch from '@mui/material/Switch';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
const names = [
  'Full-Time',
  'Part-Time',
  'Temporary',
  'Contract',
  'Internship',
  'Commission',
  'Fresher',
  'Volunteer',
  'Walk-In',

];
const names2 = [
  'Day Shif',
  'Morning Shift',
  'Rotational Shift',
  'Night Shift',
  'Monday to Friday',
  'Evening Shift',
  'US Shift',
  'UK Shift',
  'Others',

];


export default function AddNewJob() {

  const navigate = useNavigate();
  const [disable, setDisable] = useState('typing')
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [checkvalue, setcheckvalue] = useState(0)
  const [age, setAge] = React.useState('');
  const [testid, setTesID] = useState("")
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [stopName, setStopName] = useState("");
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  const [inputData, setInputData] = useState({

    Number_of_emp_needed: "",
    Experience: "",

  });
  const [job_Description, setJob_Description] = useState("")
  const [Responsibilities, setResponsibilities] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  let name, value;
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    
    if (
      (name === "Experience" || name === "Number_of_emp_needed") &&
      value !== "" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setInputData({ ...inputData, [name]: value });
  };
  const [facilitiesName, setfacilitiesName] = React.useState([]);
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setfacilitiesName(value);
  };
  const [jobschedule, setjobschedule] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setjobschedule(value);
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

  console.log(inputData, facilitiesName, jobschedule, selectedImage, selectedJobTitle)

  const [checked, setChecked] = React.useState(false);

  const handleChangecheck = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setcheckvalue(0)
    } else (
      setcheckvalue(1)
    )
  };

  console.log(selectedJobTitle)
  const handleGetQuestionData = () => {
    axios.post(`${baseUrl}getAll_psychometric_questions`, {
      job_title: selectedJobTitle
    }).then((response) => {
      console.log(response.data.options[0].job_title)
      setAge(response.data.options[0].job_title)
      setTesID(response.data.options[0]._id)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    handleGetQuestionData()
  }, [selectedJobTitle]);
  console.log(age, testid, selectedJobTitle, checked)

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}addJobTitle`, {
      jobTitle: stopName,
    }).then((response) => {
      console.log(response);
      handleClose()
      alert("jobTitle is added successfully.");
      fetchJobTitles()
      setStopName('')


    }).catch((error) => {
      seterror({ isarray: true, error: error })
      console.log(error)
    })
    console.log({
      stopName,
    })
  }
  console.log(checked, checkvalue)
  const addJobsDatapage = () => {
    navigate("/admin/AddJobDescription");
  };
  const handleDescriptionData = () => {
    axios.post(`${baseUrl}getJd`, {
      jobTitle: selectedJobTitle
    }).then((response) => {
      console.log(response.data.Details.job_Description)
      setJob_Description(response.data.Details.job_Description)
      setResponsibilities(response.data.Details.Responsibilities)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handleDescriptionData()
  }, [selectedJobTitle])

  const addJobsData = () => {

    navigate("/admin/NextAddJob", {
      state: {
        data: inputData,
        job_Description: job_Description,
        image: selectedImage,
        Responsibilities: Responsibilities,
        jobtype: facilitiesName,
        jobschedule: jobschedule,
        JobTitle: selectedJobTitle,
        checked: checkvalue,
        testid: testid
      }
    });
  };
  return (
    <>{/* Form for Add new job [English]*/}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header-div">
              <span>
                <i class="fas fa-users"></i>
              </span>
              <span className="ps-3">New Job Add</span>
            </div>
          </div>
        </div>
        <div className="row-style p-4">
          <div className="row">
            {/* <div className="col-12 d-flex justify-content-center image-div"></div> */}
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center col-sm-12">
                  <Autocomplete
                    fullWidth
                    className="MuiAutocomplete-input"
                    disablePortal
                    id="combo-box-demo"
                    options={jobTitles}
                    value={selectedJobTitle}
                    onChange={handleJobTitleChange}
                    size="normal"
                    style={{ mt: '3', width: '100%' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Job title"
                        size="small"
                        variant="standard"
                      />
                    )}
                  />
                  <abbr title="Add JobTital"><button className="mt-3 p-2 ms-3" onClick={handleClickOpen}><AddBoxIcon style={{ "color": "rgb(191, 155, 47)" }} /></button></abbr>

                 
                </div>
                {/* <span style={{ color: "red" }}>
              {jobErr && !inputData.jobTitle
                ? "*Please Enter  Title Value"
                : ""}
            </span> */}
                <div className="col-lg-12 d-flex justify-content-center col-sm-12">
                  <TextField
                    fullWidth
                    className=" mt-3 w-100"
                    type="text"
                    label="Job Experience"
                    name="Experience"
                    value={inputData.Experience}
                    onChange={submitInputdata}
                    size="normal"
                    inputProps={{ pattern: "\\d*" }}
                  />
                  {/* <span style={{ color: "red" }}>
                    {jobErr && !inputData.Job_Experience
                      ? "*Please Enter Your Job Experience"
                      : ""}
                  </span> */}
                </div>

                <div className="col-lg-12 d-flex justify-content-center mt-3 col-sm-12">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Job type</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"

                      value={facilitiesName}
                      onChange={handleChange2}
                      input={<OutlinedInput label="Job type" />}

                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>

                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* <span style={{ color: "red" }}>
                {blogErr && facilitiesName.length === 0
                  ? "*Please Enter Your Facilities"
                  : ""}
              </span> */}




                <div className="col-lg-12 d-flex justify-content-center mt-3 col-sm-12">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Job schedule</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      value={jobschedule}
                      onChange={handleChange}
                      input={<OutlinedInput label="Job schedule" />}

                      MenuProps={MenuProps}
                    >
                      {names2.map((name) => (
                        <MenuItem key={name} value={name}>

                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* <span style={{ color: "red" }}>
                  {blogErr && jobschedule.length === 0
                    ? "*Please Enter Your Facilities"
                    : ""}
                  </span> */}
                </div>
                <div className="col-lg-12 d-flex align-items-center col-sm-12">
                  <p className="mb-0">Choose PsychometricTest</p>
                  <Switch
                    checked={checked}
                    onChange={handleChangecheck}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />

                </div>
                <div className="col-lg-12 d-flex align-items-center mt-2 col-sm-12">
                  {checkvalue === 1 ? <> <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">PsychometricTest ID</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="PsychometricTest ID"
                      onChange={handleChange1}
                    >
                      <MenuItem value={testid}>{age}</MenuItem>

                    </Select>
                  </FormControl></> : null}

                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <TextField

                    fullWidth
                    className="w-100"
                    type="text"
                    name="Number_of_emp_needed"
                    value={inputData.Number_of_emp_needed}
                    onChange={submitInputdata}
                    label="Number of emp needed"
                    size="normal"
                    inputProps={{ pattern: "\\d*" }}
                  />
                </div>
                {/* <span style={{ color: "red" }}>
              {jobErr && !inputData.location
                ? "*Please Enter Your Location"
                : ""}
            </span> */}
                <div className="col-lg-12 d-flex justify-content-center align-items-center col-sm-12">
                  <TextField
                    className="mt-3 w-100"
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={2.5}
                    type="file"
                    name="job_Description"
                    value={job_Description}
                    onChange={submitInputdata}
                    fullWidth
                  />
                  <abbr title="Add Description"><button className="mt-3 p-2 ms-3" onClick={addJobsDatapage} ><AddBoxIcon style={{ "color": "rgb(191, 155, 47)" }} /></button></abbr>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <TextField
                    className="mt-3 w-100"
                    id="outlined-multiline-static"
                    label="Responsibilities"
                    multiline
                    rows={2.5}
                    type="file"
                    name="Responsibilities"
                    value={Responsibilities}
                    onChange={submitInputdata}
                    fullWidth
                  />

                </div>

              </div>
            </div>
            <div className="col-lg-12 d-flex justify-content-center mt-2 col-sm-12">
              <button type="button" class="global_button" style={{borderRadius: '5px'}} onClick={addJobsData}
                disabled={

                  inputData.Experience.length === 0 ||
                  inputData.Number_of_emp_needed.length === 0 ||

                  inputData.selectedImage === null ||
                  facilitiesName.length === 0 ||
                  jobschedule.length === 0 ||

                  disable === 'submitted'
                }
              >Continue</button>
              {/* <button
            type="button"
            className="global_button mb-3"
            style={{ borderRadius: "5px" }}
             
          
          >
         continue
            <ArrowRightAltIcon />
          </button> */}
            </div>
          </div>
        </div>
      </div >
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}

        >

          <DialogContent   >

            <Box
              noValidate
              component="form"

              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',

              }}
            >
              <Box>
                <TextField fullWidth label="Job Title" id="fullWidth" size="small" sx={{ width: 400 }} value={stopName}
                  onChange={(e) => setStopName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }} /> <br></br>


                <p>{error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""} </p>
                <Button variant="contained" size="small" sx={{ width: 100 }} onClick={handleSubmit}>Add</Button>
              </Box>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  )
}
