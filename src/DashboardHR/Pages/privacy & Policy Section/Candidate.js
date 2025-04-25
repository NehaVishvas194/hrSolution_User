import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../../Api/BaseUrl';
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from 'react-router-dom';
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import NumCalculator from 'antd/es/theme/util/calc/NumCalculator';
import { SignalWifiStatusbarNullSharp } from '@mui/icons-material';

export default function Candidate() {
  let location = useLocation();

  // Use optional chaining and fallback value if location.state is null or undefined
  let data = location.state?.data || {}; // Provide a default empty object or any other fallback value
  console.log(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [age, setAge] = useState('');
  const [report, setReport] = useState('');
  const [redata, setRedata] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };

  const getActivedataList = () => {
    axios
      .get(`${baseUrl}/get_all_candidate_for_client/${localStorage.getItem("empId")}?gender=${data === "Female" ? data : age}`)
      .then((response) => {
        console.log(response.data.candidates)
        setRows(response.data.candidates);
        setSearchApiData(response.data.candidates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getActivedataList();
  }, [age]);

  // const getReport = () => {
  //   axios
  //     .get(`${baseUrl}export_client_jobs_candidate/${localStorage.getItem("empId")}?gender=${report}`)
  //     .then((response) => {
  //       console.log(response); // Check the structure of the response data
  //       let data = response.data;

  //       // Ensure the data is an array of objects
  //       if (!Array.isArray(data)) {
  //         data = [data];
  //       }

  //       setRedata(data);
  //       exportToCSV(data); // Export the data after fetching
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   if (report) {
  //     getReport();
  //   }
  // }, [report]);

  // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileExtension = ".xlsx";
  // const fileName = "Candidate_Report";

  // const exportToCSV = (data) => {
  //   if (data && data.length > 0) {
  //     const ws = XLSX.utils.json_to_sheet(data);
  //     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //     const dataBlob = new Blob([excelBuffer], { type: fileType });
  //     FileSaver.saveAs(dataBlob, fileName + fileExtension);
  //   } else {
  //     console.error("No data available to export.");
  //   }
  // };
  const getReport = () => {
    axios
      .get(`${baseUrl}export_client_jobs_candidate/${localStorage.getItem("empId")}?gender=${report}`, {
        responseType: "blob", // Important to set the response type to 'blob'
      })
      .then((response) => {
        // Create a URL for the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can set a default file name here
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (report) {
      getReport();
    }
  }, [report]);
  const navigate = useNavigate();

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = item.jobId.toLowerCase();
        const addresMatches = item.job_title.toLowerCase();
        const searchValue = event.target.value.toLowerCase();
        return (
          fullName.includes(searchValue) || addresMatches.includes(searchValue)
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
        <Typography gutterBottom variant="h5" component="div" sx={{ padding: "20px" }}>
          Candidate List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          {/* <TextField
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
          /> */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All Candidate</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="All Candidates"
                onChange={handleChange2}
              >
                <MenuItem value="">All Candidate</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Report tab</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={report}
                label="All Candidates"
                onChange={handleChangeReport}
              >
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Box height={10} />
        {rows.length === 0 ? (

          <>
            <div style={{ "fontSize": "20px", "fontWeight": "600", "color": "#e80707" }}>Currently, No Candidates have applied for job</div>
            <Box component="section" sx={{ p: 2 }} display="flex" justifyContent="center" alignItems="center">
              <Box
                component="img"
                sx={{ height: 420, width: 450 }}
                alt="No data available"
                src='https://media.istockphoto.com/id/1426781411/vector/outstanding-winner-candidate-for-job-position-stand-out-from-the-crowd-notable-different-or.jpg?s=612x612&w=0&k=20&c=Y3vpaYRD92EfnfFhdp3H0v-JwLzj4Z270Y8YdN9svKQ='
              />
            </Box></>

        ) : (
          <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ "white-space": "nowrap" }}>
                  <TableCell align="left" style={{ minWidth: "80px", "fontWeight": "bold" }}>Sr. No.</TableCell>
                  <TableCell align="left" style={{ minWidth: "60px", "fontWeight": "bold" }}>First Name</TableCell>
                  <TableCell align="left" style={{ minWidth: "60px", "fontWeight": "bold" }}>Last Name</TableCell>
                  <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>User Email</TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>District</TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>Industry</TableCell>
                  <TableCell align="left" style={{ minWidth: "95px", "fontWeight": "bold" }}>Candidate</TableCell>
                  <TableCell align="left" style={{ minWidth: "150px", "fontWeight": "bold" }}>Gender</TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", "fontWeight": "bold" }}>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={row._id}>
                    <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell> {/* Corrected line */}

                    <TableCell>{row.first_Name}</TableCell>
                    <TableCell>{row.last_Name}</TableCell>
                    <TableCell>{row.user_Email}</TableCell>
                    <TableCell >{row.city || "_"}</TableCell>
                    <TableCell>{row.job_Heading}</TableCell>
                    <TableCell>{row.candidateStatus === 0 ? "rejected" : row.candidateStatus === 1 ? "pending" : row.candidateStatus === 2 ? "screened" : row.candidateStatus === 3 ? "complete" : null}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell >
                      <Tooltip title="Detail">
                        <VisibilityIcon
                          onClick={() =>
                            navigate("/admin/CandidateDetail", {
                              state: { id: row._id, response: rows },
                            })
                          }
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
