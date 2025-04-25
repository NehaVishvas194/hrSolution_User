import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import "./AddNewJob.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import { useLocation } from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';
import { baseUrl } from "../../Api/BaseUrl";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Checkbox from '@mui/material/Checkbox';
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
const names2 = [
  'per Month',
  'per Year',
  'per Week',
  'per Day',
  'per Hour',

];
const names = [
  '1 to 3 Days',
  '3 to 7 Days',
  '1 to 3 Week',
  'more than Month',

];
// const skill_type = [
//   'Python',
//   'C++',
//   'JavaScript',
//   'SQL',
//   'Statistics',
//   'AWS',
//   'Google Cloud',
//   'SQL',
//   'Microsoft Azure',
//   'Oracle',


// ];
const template_type = [
  "1",
  "2",
];

export default function NextAddJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  console.log(location.state)
  // console.log((location.state.checked))
  const id = localStorage.getItem('empId')
  const [jobErr, setJobErr] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [skill_type, setSkill_type] = useState([])
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  console.log(selectedImage)
  const jobTitle = location.state.JobTitle || "MERN Developer";

  const handleSkillKey = () => {
    console.log(`Sending jobTitle: ${jobTitle}`); // Debugging line

    axios({
      url: `${baseUrl}getJs`,
      method: 'post', // Change to POST
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        jobTitle: location.state.JobTitle
      }
    }).then((response) => {
      console.log(response.data.Details);
      setSkill_type(response.data.Details)
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    handleSkillKey();
  }, [jobTitle]);


  const [inputData, setInputData] = useState({
    Minimum_pay: "",
    Maximum_pay: "",
    startDate: "",
    endDate: "",
    company_address: "",

  });
  const [Rate, setRate] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setRate(value);
  };
  const [requirement, setrequirement] = React.useState([]);
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;

    setrequirement(value);
  };
  const [skill, setskill] = React.useState([]);
  const handleChange3 = (event) => {
    const {
      target: { value },
    } = event;

    setskill(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const [template, setTemplate] = React.useState([]);
  const handleChange4 = (event) => {
    const {
      target: { value },
    } = event;

    setTemplate(value);
  };





  console.log(typeof (template))
  console.log(typeof (Number(template)))
  let name, value;
  const submitInputdata = (e) => {
    const { name, value } = e.target;

    if (
      (name === "Minimum_pay" || name === "Maximum_pay") &&
      value !== "" &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    setInputData({ ...inputData, [name]: value });
  };
  const submitAllData = () => {
    // Validate the form fields
    const formattedFacilities = skill.map((facility) => ({
      skill: facility,
    }));
    setJobErr({
      Minimum_pay: false,
      Maximum_pay: false,
      startDate: false,
      endDate: false,
      company_address: false,
    });

    // Validate the input fields
    if (!inputData.Minimum_pay) {
      setJobErr((prevState) => ({ ...prevState, Minimum_pay: true }));
    }

    if (!inputData.Maximum_pay) {
      setJobErr((prevState) => ({ ...prevState, Maximum_pay: true }));
    }
    if (!inputData.endDate) {
      setJobErr((prevState) => ({ ...prevState, endDate: true }));
    }
    if (!inputData.startDate) {
      setJobErr((prevState) => ({ ...prevState, startDate: true }));
    }
    if (!inputData.company_address) {
      setJobErr((prevState) => ({ ...prevState, company_address: true }));
    }

    if (Rate.length === 0) {
      setJobErr((prevState) => ({ ...prevState, Rate: true }));
    }
    if (requirement === 0) {
      setJobErr((prevState) => ({ ...prevState, requirement: true }));
    }
    if (skill.length === 0) {
      setJobErr((prevState) => ({ ...prevState, skill: true }));
    }
    if (template.length === 0) {
      setJobErr((prevState) => ({ ...prevState, template: true }));
    }

    // If any field is empty, stop the submission
    if (!inputData.Minimum_pay || !inputData.Maximum_pay || !inputData.endDate || !inputData.startDate || !inputData.company_address || !inputData.company_address) {
      return;
    }
    const formData = new FormData();

    formData.append("job_title", location.state.JobTitle);
    formData.append("job_Description", location.state.job_Description);
    formData.append("job_Responsibility", location.state.Responsibilities);
    formData.append("job_type", location.state.jobtype);
    formData.append("job_schedule", location.state.jobschedule);
    formData.append("Minimum_pay", inputData?.Minimum_pay);
    formData.append("Maximum_pay", inputData?.Maximum_pay);
    formData.append("Rate", Rate);
    formData.append("Number_of_emp_needed", location.state.data.Number_of_emp_needed);
    formData.append("requirement_timeline", requirement);
    formData.append("startDate", inputData?.startDate);
    formData.append("endDate", inputData?.endDate);
    formData.append("skills", skill);
    formData.append("Experience", location.state.data.Experience);
    formData.append("company_address", inputData?.company_address);
    formData.append("isPsychometricTest", location.state.checked);
    formData.append("job_image", selectedImage);

    if (location.state.checked === 1) {
      formData.append("psychometric_Test", location.state.testid);
    }

    formData.append("template_type", template);

    // Perform additional validation if needed

    // If all validations pass, proceed with the API call
    axios
      .post(`${baseUrl}postJob/${id}`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Job added successfully!", "success");
        setJobErr(false);
        navigate("/admin/GetAllJobs");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handleChangeSkill = () => {
    navigate('/admin/SkillOfJobTitle')
  }
  console.log(inputData, Rate, requirement, template, skill)
  return (
    <>{/* Form for Add new job [English]*/}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="header-div">
              <span>
                <i class="fas fa-users"></i>
              </span>
              <span className="ps-3">Job detail</span>
              <button onClick={handleSkillKey}>onclike</button>
            </div>
          </div>
        </div>
        <div className="row-style p-4">
          <div className="row">
            <div className="col-lg-12 image-div"></div>
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-lg-6 col-sm-12 pe-2">
                  <Box>
                    <TextField id="outlined-basic" label="Minimum_pay" variant="outlined" value={inputData.Minimum_pay} name="Minimum_pay" onChange={submitInputdata} inputProps={{ pattern: "\\d*" }} />
                    <span style={{ color: "red" }}>
                      {jobErr && !inputData.Minimum_pay
                        ? "*Please Enter  Title Value"
                        : ""}
                    </span>
                  </Box>
                </div>
                <div className="col-lg-6 col-sm-12 ps-2">
                  <Box> <TextField id="outlined-basic" label="Maximum_pay" variant="outlined" value={inputData.Maximum_pay} name="Maximum_pay" onChange={submitInputdata} inputProps={{ pattern: "\\d*" }} />
                    <span style={{ color: "red" }}>
                      {jobErr && !inputData.Maximum_pay
                        ? "*Please Enter  Title Value"
                        : ""}
                    </span></Box>
                </div>

                <div className="col-12 mt-3">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Rate</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"

                      value={Rate}
                      onChange={handleChange}
                      input={<OutlinedInput label="Rate" />}

                      MenuProps={MenuProps}
                    >
                      {names2.map((name) => (
                        <MenuItem key={name} value={name}>

                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <span style={{ color: "red" }}>
                    {jobErr && !Rate
                      ? "*Please Enter Your Job Experience"
                      : ""}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Requirement timeline</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"

                      value={requirement}
                      onChange={handleChange2}
                      input={<OutlinedInput label="Requirement timeline" />}

                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>

                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <span style={{ color: "red" }}>
                    {jobErr && !requirement
                      ? "*Please Enter  Salary Value"
                      : ""}
                  </span>
                </div>
                <div className="col-12 mt-3 d-flex">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">key qualification</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={skill}
                      onChange={handleChange3}
                      input={<OutlinedInput label="key qualification" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {skill_type.map((name) => (
                        <MenuItem key={name.skill_Name} value={name.skill_Name}>
                          <Checkbox checked={skill.indexOf(name.skill_Name) > -1} />
                          <ListItemText primary={name.skill_Name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div><abbr title="Key Qw"><button className="mt-2 p-2 ms-3" onClick={handleChangeSkill} ><AddBoxIcon style={{ "color": "rgb(191, 155, 47)" }} /></button></abbr>
                  </div>

                </div>
                <div className="col-12 mt-3">
                  <h6 className=" mb-2">Upload Image</h6>
                  <TextField
                    type="file"
                    className="mb-1  w-100"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  {selectedImage && (
                    <div className="image-preview">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        style={{ height: "100px" }}
                      />
                    </div>
                  )}
                  <span style={{ color: "red" }}>
                    {jobErr && !skill
                      ? "*Please Enter  Salary Value"
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="row">
                <div className="col-12">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      type="date"
                      onChange={(newValue) =>
                        setInputData({
                          ...inputData,
                          startDate: moment(newValue.$d).format(
                            "YYYY-MM-DD"
                          ),
                        })
                      }
                      label="startDate"
                    />
                  </LocalizationProvider>
                  <span style={{ color: "red" }}>
                    {jobErr && !inputData.startDate
                      ? "*Please Enter Your Location"
                      : ""}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      type="date"
                      onChange={(newValue) =>
                        setInputData({
                          ...inputData,
                          endDate: moment(newValue.$d).format(
                            "YYYY-MM-DD"
                          ),
                        })
                      }
                      label="endDate"
                    />
                  </LocalizationProvider>
                  <span style={{ color: "red" }}>
                    {jobErr && !inputData.endDate
                      ? "*Please Enter Description  "
                      : ""}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <TextField
                    fullWidth
                    type="text"
                    label="company_address"
                    name="company_address"
                    value={inputData.company_address}
                    onChange={submitInputdata}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {jobErr && !inputData.company_address
                      ? "*Please Enter Description  "
                      : ""}
                  </span>
                </div>
                <div className="col-12 mt-3">
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Template type</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      value={template}
                      onChange={handleChange4}
                      input={<OutlinedInput label="template_type" />}
                      MenuProps={MenuProps}
                    >
                      {template_type.map((name) => (
                        <MenuItem key={name} value={name}>
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <p className="note_templet">Use type 1 templet if the content is small; otherwise, use type 2.</p>
                  </FormControl>
                  <span style={{ color: "red" }}>
                    {jobErr && !template
                      ? "*Please Enter Description  "
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-4">
              <button
                type="button"
                className="global_button"
                style={{ borderRadius: "5px" }}
                onClick={submitAllData}
              >
                Submit
                <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
