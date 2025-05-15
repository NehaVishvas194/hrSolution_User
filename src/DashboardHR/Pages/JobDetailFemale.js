import React, { useEffect, useState } from "react";
import "./JobDetailEmp.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import moment from "moment";
import { usePDF } from "react-to-pdf";
import { useLocation } from "react-router-dom";
// import Rating from "@mui/material/Rating";
import { baseUrl } from "../../Api/BaseUrl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IosShareIcon from "@mui/icons-material/IosShare";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReactStars from "react-rating-stars-component";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import { CKEditor } from "ckeditor4-react";
import { render } from "react-dom";

export default function JobDetailFemale() {
  const location = useLocation();
  const packageKey = localStorage.getItem("package_key");

  const wKeys = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"];
  const yKeys = ["y1", "y2", "y3"];
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const [rows, setRows] = useState([]);
  const [to, setTo] = useState(""); // Changed from array to string
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState(""); // Fixed typo in setter name
  const [message, setMessage] = useState("");
  const [candidate, setCadidate] = useState("");
  const [rating, setRating] = useState(0);
  const [country_code, setcountry_code] = useState("");
  const [receiver_no, setreceiver_no] = useState("");
  const [messagewhat, setmessagewhat] = useState("");
  const [candidate_rating1, setcandidate_rating] = useState("");
  const [seeker_status, setseeker_status] = useState("");
  const [emailSubjec, setemailSubjec] = useState("");
  const [emailContent, setemailContent] = useState("");
  const [email_title, setEmail_title] = useState("");

  const selectedUser = location.state.response.filter((item) => {
    return item.jobId === location.state.id;
  });

  const getData = selectedUser[0];
  console.log(getData);

  const handleClickOpen = (e, candidateId) => {
    setOpen(true);
    setCadidate(candidateId);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = (e, candidateId) => {
    setOpen2(true);
    setCadidate(candidateId);
  };
  const handleClickOpen3 = (e, candidateRating, candidateId) => {
    setOpen3(true);
    setcandidate_rating(candidateRating);
    setCadidate(candidateId);
  };
  const handleClickOpen4 = (e, candidateId) => {
    setOpen4(true);
    setCadidate(candidateId);
    console.log(candidateId);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleFemaleJob = () => {
    axios
      .get(`${baseUrl}get_Female_jobseeker_profile/${getData.jobId}`)
      .then((response) => {
        setRows(response.data.Details);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleFemaleJob();
  }, []); // Run only once when the component mounts

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const handleChange = (e, id) => {
    const { value } = e.target;
    setseeker_status(value);
    setSeekerStatus((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    e.preventDefault();
    axios
      .get(`${baseUrl}emailContent_of_title/${value}`, {})
      .then((response) => {
        console.log(response.data.template);
        setemailSubjec(response.data.template.email_subject);
        setemailContent(response.data.template.email_body);
        setEmail_title(response.data.template.email_title);
        // Swal.fire("Success", `${response.data.message}`, "success");
        // setseeker_status("")
        // setemailSubjec("")
        // setemailContent("")
      })
      .catch((error) => {
        setOpen4(false);
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handleToChange = (e) => {
    const {
      target: { value },
    } = e;
    setTo(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    ); // Updated to handle single value for now
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(to, from, message, subject);
    axios
      .post(`${baseUrl}share_cv/${candidate}`, {
        to: to,
        from: from,
        subject: subject,
        message: message,
        shareVia: 1,
      })
      .then((response) => {
        console.log(response);
        setOpen(false);
        Swal.fire("Success", "Email sent successfully!", "success");
        setTo("");
        setFrom("");
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
        setOpen(false);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handlesubmitWhatApp = (e) => {
    e.preventDefault();
    console.log(to, from, message, subject);
    axios
      .post(`${baseUrl}share_cv/${candidate}`, {
        country_code: country_code,
        receiver_no: receiver_no,
        message: messagewhat,
        shareVia: 2,
      })
      .then((response) => {
        setOpen2(false);
        console.log(response.data.waLink);
        Swal.fire("Success", "Email sent successfully!", "success");
        window.location.href = response.data.waLink;
        setcountry_code("");
        setreceiver_no("");
        setmessagewhat("");
      })
      .catch((error) => {
        console.log(error);
        setOpen2(false);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  const handleSavedata = (e, id, savestatus) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}save_candidate_profile_for_later/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          handleFemaleJob();
        }
        if (savestatus === 0) {
          Swal.fire("Success", `${response?.data?.message}`, "success");
        } else {
          Swal.fire("Success", `${response?.data?.message}`, "success");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  const ratingChanged = (newRating) => {
    setcandidate_rating(newRating);
  };
  const handlRetingUpdate = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}update_candidate_rating/${candidate}`, {
        rating: candidate_rating1,
      })
      .then((response) => {
        console.log("Before update:", rows);
        if (response.status === 200) {
          handleFemaleJob();
          // Update the specific candidate's rating in the rows array

          setRows((prevRows) =>
            prevRows.map((row) =>
              row._id === candidate
                ? { ...row, candidate_rating: candidate_rating1 }
                : row
            )
          );
          console.log();
          console.log("After update:", rows);
          setOpen3(false);
          Swal.fire("Success", "Rating updated successfully", "success");
        }
      })
      .catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  const handlchangeCandidate = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}candidate_recruitment_process/${candidate}`, {
        seeker_status: email_title,
        emailSubject: emailSubjec,
        emailContent: emailContent,
      })
      .then((response) => {
        setOpen4(false);
        console.log(response.data.whatsappURL);
        Swal.fire("Success", `${response.data.message}`, "success");
        setEmail_title("");
        setemailSubjec("");
        setemailContent("");
      })
      .catch((error) => {
        setOpen4(false);
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <>
      <div></div>
      {/*Detail of clicked job [English]*/}
      <h2 className="ps-4">Female</h2>
      <div className="container emp-profile" ref={targetRef}>
        <form method="post">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-head">
                <h5>
                  {getData.first_name} {getData.last_name}{" "}
                </h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Job Details
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row ps-3">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job Id</label>
                    </div>
                    <div className="col-md-6">
                      {getData.jobId ? <p>{getData.jobId}</p> : <p>_</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Job title</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_title ? (
                        <p>{getData.job_title}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company name</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_name ? (
                        <p>{getData.company_name}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Number of emp needed</label>
                    </div>
                    <div className="col-md-6">
                      {getData.Number_of_emp_needed ? (
                        <p>{getData.Number_of_emp_needed}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label> Job type</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_type ? <p>{getData.job_type}</p> : <p>_</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job schedule</label>
                    </div>
                    <div className="col-md-6 mb-2">
                      {getData.job_schedule ? (
                        <p>{getData.job_schedule}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Salary Pay</label>
                    </div>
                    <div className="col-md-6">
                      {getData.salary_pay ? (
                        <p>{getData.salary_pay}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job Description</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_Description ? (
                        <p
                          dangerouslySetInnerHTML={renderHTML(
                            getData.job_Description
                          )}
                        ></p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company address</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_address ? (
                        <p>{getData.company_address}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Employee email</label>
                    </div>
                    <div className="col-md-6">
                      {getData.employee_email ? (
                        <p>{getData.employee_email}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="row">
                                        <div className="col-md-6">
                                            <label>Requirement timeline</label>
                                        </div>
                                        <div className="col-md-6">
                                            {getData.requirement_timeline ? (
                                                <p>{getData.requirement_timeline}</p>
                                            ) : (
                                                <p>_</p>
                                            )}
                                        </div>
                                    </div> */}
                  <div className="row">
                    <div className="col-md-6">
                      <label>Start Date</label>
                    </div>
                    <div className="col-md-6">
                      {getData.startDate ? (
                        <p>{getData.startDate}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>End Date</label>
                    </div>
                    <div className="col-md-6">
                      {getData.endDate ? <p>{getData.endDate}</p> : <p>_</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone no</label>
                    </div>
                    <div className="col-md-6">
                      {getData.phone_no ? <p>{getData.phone_no}</p> : <p>_</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      {getData.Experience ? (
                        <p>{getData.Experience}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Template type</label>
                    </div>
                    <div className="col-md-6">
                      {getData.template_type ? (
                        <p>{getData.template_type}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company Industry</label>
                    </div>
                    <div className="col-md-6">
                      {getData.company_Industry ? (
                        <p>{getData.company_Industry}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Status</label>
                    </div>
                    <div className="col-md-6">
                      {getData.status == "3" ? (
                        <p
                          className="mb-2 mr-2 badge "
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#29cc97",
                            position: "static",
                          }}
                        >
                          Inactive
                        </p>
                      ) : (
                        <p
                          className="mb-2 mr-2 badge "
                          style={{
                            color: "#ffffff",
                            backgroundColor: "red",
                            position: "static",
                          }}
                        >
                          Active
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="ms-invoice-table table-responsive mt-4 px-3">
          <h5 className="mb-4">Applicants</h5>
          <table
            className="table table-hover text-right thead-light"
            style={{ "white-space": "nowrap" }}
          >
            <thead style={{ "white-space": "nowrap" }}>
              <tr className="text-capitalize">
                <th className="text-center w-5 common_style">S. No.</th>
                <th className="text-left common_style">Full name</th>
                <th className="common_style">Candidate Email</th>
                <th className="common_style">Phone No</th>
                <th className="common_style">District</th>
                <th className="common_style">Experience</th>
                <th className="common_style">CV</th>
                {/* <th className="common_style">Current status</th> */}
                <th className="common_style">status</th>
                <th className="common_style">Share this CV</th>
                <th className="common_style">Save for later</th>
                {wKeys.includes(packageKey) ? null : yKeys.includes(
                    packageKey
                  ) ? (
                  <th className="common_style">Rating</th>
                ) : null}

                {/* <th className="common_style">Edit Rating</th> */}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, i) => (
                  <tr key={i}>
                    <td className="text-center common_style">{i + 1}</td>
                    <td className="text-left common_style">
                      {row.first_Name}
                      {row.last_Name}
                    </td>
                    <td className="common_style">{row.user_Email}</td>
                    <td className="common_style">{row.phone_no}</td>
                    <td className="common_style">{row.city}</td>
                    <td className="common_style">{row.relevant_Experience}</td>

                    <td className="common_style">
                      {row.resume ? (
                        <a
                          href={
                            "https://sisccltd.com/hrsolutions/" + row.resume
                          }
                          target="Loading Pdf file"
                          rel="noreferrer"
                        >
                          <PictureAsPdfIcon />
                        </a>
                      ) : (
                        "_"
                      )}
                    </td>
                    {/* <td className="common_style">{row.jobSeeker_status === 1 ? "pending" : row.jobSeeker_status === 2 ? "schedule Interview" : row.jobSeeker_status === 3 ? "assessment" : row.jobSeeker_status === 4 ? "HR Discussion" : row.jobSeeker_status === 5 ? "complete" : row.jobSeeker_status === 6 ? "shortlist" : row.jobSeeker_status === 7 ? "reject" : null}</td> */}
                    <td>
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id={`demo-select-small-label-${i}`}>
                          {row.jobSeeker_status === 2
                            ? "shortlist"
                            : row.jobSeeker_status === 3
                            ? "longlisted"
                            : row.jobSeeker_status === 4
                            ? "Assesment Schedule"
                            : row.jobSeeker_status === 5
                            ? "Schedule_Interview"
                            : null}
                        </InputLabel>

                        <Select
                          labelId={`demo-select-small-label-${i}`}
                          id={`demo-select-small-${i}`}
                          value={seekerStatus[row._id] || ""} // Set the value from state
                          label="Seeker Status"
                          onChange={(e) => handleChange(e, row._id)}
                        >
                          <MenuItem
                            value="Shortlisted"
                            onClick={(e) => handleClickOpen4(e, row._id)}
                          >
                            Shortlisted
                          </MenuItem>
                          <MenuItem
                            value="longlisted"
                            onClick={(e) => handleClickOpen4(e, row._id)}
                          >
                            Longlisted
                          </MenuItem>
                          <MenuItem
                            value="Assessment_Scheduled"
                            onClick={(e) => handleClickOpen4(e, row._id)}
                          >
                            Assessment Scheduled
                          </MenuItem>
                          <MenuItem
                            value="Schedule_Interview"
                            onClick={(e) => handleClickOpen4(e, row._id)}
                          >
                            Schedule Interview
                          </MenuItem>
                          <MenuItem
                            value="complete"
                            onClick={(e) => handleClickOpen4(e, row._id)}
                          >
                            Complete
                          </MenuItem>
                          {/* <MenuItem value="complete" onClick={(e) => handleClickOpen4(e, row._id)}>complete</MenuItem>
                                                    <MenuItem value="reject" onClick={(e) => handleClickOpen4(e, row._id)}>reject</MenuItem> */}
                        </Select>
                      </FormControl>
                    </td>
                    <td align="center">
                      <EmailIcon
                        onClick={(event) => handleClickOpen(event, row._id)}
                      />
                      {/* /
                      <WhatsAppIcon
                        onClick={(event) => handleClickOpen2(event, row._id)}
                      /> */}
                    </td>
                    <td align="center">
                      {row.saved_status === 0 ? (
                        <BookmarkBorderIcon
                          style={{ color: "#000000" }}
                          onClick={(event) =>
                            handleSavedata(event, row._id, row.saved_status)
                          }
                        />
                      ) : (
                        <BookmarkBorderIcon
                          style={{ color: "red" }}
                          onClick={(event) =>
                            handleSavedata(event, row._id, row.saved_status)
                          }
                        />
                      )}{" "}
                    </td>
                    {wKeys.includes(packageKey) ? null : yKeys.includes(
                        packageKey
                      ) ? (
                      <td style={{ "white-space": "nowrap" }}>
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          value={row?.candidate_rating}
                        />
                      </td>
                    ) : null}

                    {/* <td><EditIcon onClick={(event) =>handleClickOpen3(event,row.candidate_rating,row._id)} /></td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <h4 className="text-center">No Jobs Apply</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <Box>
                <form
                  id="contact-form"
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  <div className="form-group-Add">
                    <input
                      type="text"
                      placeholder="To"
                      className="form-control"
                      name="to"
                      required=""
                      onChange={handleToChange}
                      value={to}
                    />
                  </div>

                  {/* <div className="form-group-Add">
                    <input
                      type="email"
                      placeholder="From"
                      className="form-control"
                      name="from"
                      required=""
                      onChange={(e) => setFrom(e.target.value)}
                      value={from}
                    />
                  </div> */}
                  <div className="form-group-Add">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="form-control"
                      name="subject"
                      required=""
                      onChange={(e) => setSubject(e.target.value)}
                      value={subject}
                    />
                  </div>
                  <div className="form-group-Add">
                    <textarea
                      placeholder="Message"
                      className="form-control"
                      name="message"
                      rows="5"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </div>

                  <DialogActions>
                    <Button
                      type="submit"
                      onClick={handlesubmit}
                      variant="contained"
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open2}
          onClose={handleClose2}
        >
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <Box>
                <form
                  id="contact-form"
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  <div className="form-group-Add">
                    <input
                      type="text"
                      placeholder="Country code"
                      className="form-control"
                      name="country_code"
                      required=""
                      onChange={(e) => setcountry_code(e.target.value)}
                      value={country_code}
                    />
                  </div>
                  <div className="form-group-Add">
                    <input
                      type="email"
                      placeholder="Receiver No"
                      className="form-control"
                      name="receiver_no"
                      required=""
                      onChange={(e) => setreceiver_no(e.target.value)}
                      value={receiver_no}
                    />
                  </div>
                  <div className="form-group-Add">
                    <input
                      type="text"
                      placeholder="message"
                      className="form-control"
                      name="messagewhat"
                      required=""
                      onChange={(e) => setmessagewhat(e.target.value)}
                      value={messagewhat}
                    />
                  </div>
                  <DialogActions>
                    <Button
                      type="submit"
                      onClick={handlesubmitWhatApp}
                      variant="contained"
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose2} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>

      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open3}
          onClose={handleClose3}
        >
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <Box>
                <form
                  id="contact-form"
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    value={candidate_rating1}
                  />
                  <DialogActions>
                    <Button
                      type="submit"
                      onClick={handlRetingUpdate}
                      variant="contained"
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose3} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open4}
          onClose={handleClose4}
        >
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <Box>
                <>
                  <form
                    id="contact-form"
                    className="contact-form"
                    method="post"
                    role="form"
                  >
                    <div className="form-group-Add">
                      <input
                        type="text"
                        placeholder="Seeker Status"
                        className="form-control"
                        name="email_title"
                        required=""
                        value={email_title}
                      />
                    </div>

                    <div className="form-group-Add">
                      <textarea
                        placeholder="Email Content"
                        className="form-control"
                        name="emailSubject"
                        rows="5"
                        onChange={(e) => setemailSubjec(e.target.value)}
                        value={emailSubjec}
                      />
                      {/* <input
                      type="email"
                      placeholder="emailSubject"
                      className="form-control"
                      name="emailSubject"
                      required=""
                      onChange={(e) => setemailSubjec(e.target.value)}
                      value={emailSubjec}
                    /> */}
                    </div>
                    <div className="form-group-Add">
                      <textarea
                        placeholder="Email Content"
                        className="form-control"
                        name="emailContent"
                        rows="5"
                        onChange={(e) => setemailContent(e.target.value)}
                        value={emailContent}
                      />
                    </div>
                  </form>

                  <DialogActions>
                    <Button
                      type="submit"
                      onClick={handlchangeCandidate}
                      variant="contained"
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose4} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
