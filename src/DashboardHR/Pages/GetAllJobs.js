import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import OrderDetails from "../OrderDetails";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Api/BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SignalCellularNull } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from "react-router-dom";

export default function GetAllJobs() {
  const [page, setPage] = useState(0);
  let location = useLocation();

  // Use optional chaining and fallback value if location.state is null or undefined
  let data = location.state?.data || {}; // Provide a default empty object or any other fallback value
  console.log(data);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [status, setStatus] = useState({});
  const [age, setAge] = React.useState("");

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };
  console.log(age);

  const getdataList = () => {
    axios
      .get(
        `${baseUrl}/getJobs_posted_by_employee/${localStorage.getItem(
          "empId"
        )}?status=${data === 1 ? data : age}`
      )
      .then((response) => {
        console.log(response.data.emp_jobs);
        setRows(response.data.emp_jobs);
        setSearchApiData(response.data.emp_jobs);
        // setSearchApiData(response.data.All_jobs);
      })
      .catch((error) => {
        console.log(error);
        // <OrderDetails />;
      });
  };

  const getActivedataList = () => {
    axios
      .get(`${baseUrl}/activejobs_by_client/${localStorage.getItem("empId")}`)
      .then((response) => {
        console.log(response.data.emp_jobs);
        setRows(response.data.activeJob);
        setSearchApiData(response.data.emp_jobs);
      })
      .catch((error) => {
        console.log(error);
        // <OrderDetails />;
      });
  };
  const getInActivedataList = () => {
    axios
      .get(`${baseUrl}Inactivejobs_by_client/${localStorage.getItem("empId")}`)
      .then((response) => {
        console.log(response.data.inactiveJob);
        setRows(response.data.inactiveJob);
        setSearchApiData(response.data.inactiveJob);
      })
      .catch((error) => {
        console.log(error);
        // <OrderDetails />;
      });
  };

  useEffect(() => {
    getdataList();
  }, [age]);
  const navigate = useNavigate();
  const addJobsData = () => {
    navigate("/admin/AddNewJob");
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = (id) => {
    let deleteId = id;
    axios
      .delete(`${baseUrl}deleteJob/${deleteId}`)
      .then((response) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getdataList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChange = (event, id) => {
    const newStatus = event.target.value;
    setStatus((prevState) => ({
      ...prevState,
      [id]: newStatus,
    }));
    axios
      .post(`${baseUrl}active_inactive_job/${id}`, {
        newStatus: newStatus,
      })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: `${response.data.message}`,
          text: "You clicked the button!",
          icon: "success",
        });
        getdataList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = item.jobId.toLowerCase();
        // const emailMatches = item.job_Desciption.toLowerCase();
        const addresMatches = item.job_title.toLowerCase();
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          fullName.includes(searchValue) ||
          // emailMatches.includes(searchValue) ||
          addresMatches.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Job List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search By Job Id and Job Title"
            id="outlined-size-small"
            size="small"
            value={filterValue}
            onChange={(e) => handleFilter(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {filterValue && (
                    <IconButton onClick={handleClearFilter} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All Jobs</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="All Jobs"
                onChange={handleChange2}
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={3}>Inactive</MenuItem>
                <MenuItem value="">All Jobs</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Box height={10} />
        {rows.length === 0 ? (
          <>
            <div
              style={{ fontSize: "20px", fontWeight: "600", color: "#e80707" }}
            >
              Currently, No job posted!
            </div>
            <Box
              component="section"
              sx={{ p: 2 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                component="img"
                sx={{
                  height: 420,
                  width: 450,
                }}
                alt="The house from the offer."
                src="https://img.freepik.com/premium-vector/woman-holds-magnifying-glass-laptop-her-hands-job-search-theme-hr-linear-modern-style_174639-61647.jpg?w=826"
              />
            </Box>
          </>
        ) : (
          <TableContainer component={Paper} style={{ overflowX: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ "white-space": "nowrap" }}>
                  <TableCell
                    align="left"
                    style={{ minWidth: "80px", fontWeight: "bold" }}
                  >
                    Sr. No.
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "60px", fontWeight: "bold" }}
                  >
                    Job Id
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "150px", fontWeight: "bold" }}
                  >
                    Industry
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "150px", fontWeight: "bold" }}
                  >
                    Job Title
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Company Name
                  </TableCell>
                  {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    candidateCounts
                  </TableCell> */}
                  <TableCell
                    align="left"
                    style={{ minWidth: "85px", fontWeight: "bold" }}
                  >
                    Status
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{
                      minWidth: "95px",
                      "white-space": "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    End Date
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      minWidth: "95px",
                      "white-space": "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Candidate
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Delete
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        style={{ "white-space": "nowrap" }}
                      >
                        <TableCell align="left">
                          {page * rowsPerPage + i + 1}
                        </TableCell>{" "}
                        {/* Corrected line */}
                        <TableCell>{row.jobId}</TableCell>
                        <TableCell>{row.job_title}</TableCell>
                        <TableCell>
                          {row.sub_job_title ? row.sub_job_title : "Job Title"}
                        </TableCell>
                        <TableCell align="left">
                          {" "}
                          {row.company_name.length > 20
                            ? `${row.company_name.substring(0, 18)}...`
                            : row.company_name}
                        </TableCell>
                        {/* <TableCell align="center">
                          {row.candidateCounts
                            ? (row.candidateCounts.Female, row.candidateCounts.Male)
                            : "_"}
                        </TableCell> */}
                        <TableCell align="left">
                          {row.status === 1 ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row.endDate).format("MMM Do YY")}
                        </TableCell>
                        <TableCell align="left">
                          <div>
                            <div>
                              <Tooltip title="Female">
                                {
                                  <WomanIcon
                                    onClick={() =>
                                      navigate("/admin/JobDetailFemale", {
                                        state: {
                                          id: row.jobId,
                                          response: rows,
                                        },
                                      })
                                    }
                                  />
                                }
                                &nbsp;
                              </Tooltip>
                              {row.candidateCounts.Female}
                            </div>
                            <div>
                              <Tooltip title="Male">
                                {
                                  <ManIcon
                                    onClick={() =>
                                      navigate("/admin/JobDetailEmp", {
                                        state: {
                                          id: row.jobId,
                                          response: rows,
                                        },
                                      })
                                    }
                                  />
                                }
                                &nbsp;
                              </Tooltip>
                              {row.candidateCounts.Male}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          {
                            <DeleteForeverIcon
                              onClick={() => {
                                deleteUser(row.jobId);
                              }}
                              style={{ color: "red" }}
                            />
                          }
                        </TableCell>
                        <TableCell align="left">
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                          >
                            <InputLabel id={`demo-select-small-label-${i}`}>
                              {row.status === 1
                                ? "Open"
                                : row.status === 2
                                ? "Recruitment in progress"
                                : row.status === 3
                                ? "Close"
                                : null}
                            </InputLabel>
                            <Select
                              labelId={`demo-select-small-label-${i}`}
                              id={`demo-select-small-${i}`}
                              value={status[row.jobId] || ""}
                              label={row.status}
                              onChange={(event) =>
                                handleChange(event, row.jobId)
                              }
                            >
                              <MenuItem value={1}>Open </MenuItem>
                              <MenuItem value={2}>
                                Recruitment in progress
                              </MenuItem>
                              <MenuItem value={3}>Close</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
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
        )}
      </Paper>
    </div>
  );
}