import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Background from "../Image/counterBg.jpeg";
import Autocomplete from "@mui/material/Autocomplete";
import TableContainer from "@mui/material/TableContainer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { baseUrl } from "../Api/BaseUrl";
import Swal from "sweetalert2";
const countries = [
  " Western Area Urban ",
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
  "noida",
];

const FixitFinder = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [Location, setLocation] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedJobLocation, setSelectedJobLocation] = useState("");
  const [findercms, setFinderCms] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchJobTitles = () => {
    axios
      .get(`${baseUrl}alljobTitle`)
      .then((response) => {
        if (response.data.success) {
          setJobTitles(response.data.details.map((job) => job.jobTitle));
          setLocation(countries);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };

  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(value);
  };
  const handleJobLocationChange = (event, value) => {
    setSelectedJobLocation(value);
  };

  console.log(selectedJobTitle);
  const handleGetsearchData = () => {
    axios
      .post(`${baseUrl}fixit_finder`, {
        job_title: selectedJobTitle,
        company_location: selectedJobLocation,
      })
      .then((response) => {
        console.log(response.data);
        setRows(response.data.details);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      });
  };
  const handelFixiderCMS = () => {
    axios
      .get(`${baseUrl}getService/6605031c9a99e3c931fff841`)
      .then((response) => {
        console.log(response.data.Details);
        setFinderCms(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchJobTitles();
    handelFixiderCMS();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <div>
      <div>
        <Header />
        <section
          className="gridBanner"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <h2> Fixit Finder</h2>
                <p className="mt-2">{findercms.Description1} </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <div>
                  <h1 className="heading1">{findercms.Heading}</h1>
                  <p
                    className="para"
                    dangerouslySetInnerHTML={renderHTML(findercms.Description)}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container pb-5">
          <Stack direction="row" spacing={2} sx={{ m: 5 }}>
            <div className="col-md-12 col-sm-12 col-lg-4 Addmarginthree">
              <TextField
                id="outlined-basic"
                label="Job title"
                variant="outlined"
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
              />
            </div>
            <div className="col-md-12 col-sm-12 col-lg-4 Addmarginthree">
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                value={selectedJobLocation}
                onChange={(e) => setSelectedJobLocation(e.target.value)}
              />
            </div>
            <div className="col-md-12 col-sm-12 col-lg-4 Addmarginthree">
              <div className="section-bt FindJob">
                <button
                  onClick={handleGetsearchData}
                  className="b-btn job_area_btn"
                  href="job-grid"
                >
                  Search Now&nbsp;<i className="fi fi-sr-arrow-right" />
                </button>
              </div>
            </div>
          </Stack>
          {rows.length === 0 ? null : (
            <>
              {" "}
              <Box sx={{ m: 5 }}>
                {" "}
                <TableContainer component={Paper} style={{ overflowX: "auto" }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{ "white-space": "nowrap" }}>
                        <TableCell align="left" style={{ minWidth: "80px" }}>
                          Sr. No.
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: "60px" }}>
                          Full Name
                        </TableCell>

                        <TableCell align="left" style={{ minWidth: "100px" }}>
                          Gender
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: "100px" }}>
                          Home Address
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: "85px" }}>
                          Location in Sierra Leone
                        </TableCell>
                        <TableCell align="left" style={{ minWidth: "85px" }}>
                          Mobile Number
                        </TableCell>

                        <TableCell
                          align="left"
                          style={{ minWidth: "95px", "white-space": "nowrap" }}
                        >
                          Applicable
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "95px", "white-space": "nowrap" }}
                        >
                          other
                        </TableCell>

                        {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    Status
                  </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              <TableCell align="left">{i + 1}</TableCell>
                              <TableCell>{row.Full_Name}</TableCell>

                              <TableCell align="left">
                                {" "}
                                {row.Gender}
                                {/* {row.job_experience.length > 20 ? `${row.job_experience.substring(0, 18)}...` : row.job_experience} */}
                              </TableCell>
                              <TableCell align="left">
                                {row.Home_Address ? row.Home_Address : "_"}
                              </TableCell>
                              <TableCell align="left">
                                {row.Location_in_Sierra_Leone}
                              </TableCell>

                              <TableCell align="left">
                                {row.Mobile_Number}
                              </TableCell>
                              <TableCell>{row.applicable}</TableCell>
                              <TableCell>{row.other}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={rows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Box>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default FixitFinder;
