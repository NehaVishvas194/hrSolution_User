import React from 'react'
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
import { baseUrl } from '../../Api/BaseUrl';
import { useEffect, useState } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WomanIcon from '@mui/icons-material/Woman';
import ManIcon from '@mui/icons-material/Man';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SignalCellularNull } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useLocation } from 'react-router-dom';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReactStars from "react-rating-stars-component";
export default function FemaleTelentPool() {
  const [page, setPage] = useState(0);
  let location = useLocation();

  // Use optional chaining and fallback value if location.state is null or undefined
  // let data = location.state?.data || {}; // Provide a default empty object or any other fallback value
  // console.log(data);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [status, setStatus] = useState({});
  // const [age, setAge] = React.useState('');

  // const handleChange2 = (event) => {
  //   setAge(event.target.value);
  // };
  // console.log(age)

  // Calculate expiration date based on package key
  const calculateExpirationDate = () => {
    const packageKey = localStorage.getItem("package_key");
    const activationDate = moment(localStorage.getItem("package_activate_date"));
    // const activationDate = 2024-10-2

    if (!activationDate) {
      setErrorMessage("Activation date is missing.");
      return null;
    }

    const activationDateObj = new Date(activationDate.format('l'));

    switch (packageKey) {
      case "y1":
        return new Date(activationDateObj.setMonth(activationDateObj.getMonth() + 3));
      case "y2":
        return new Date(activationDateObj.setMonth(activationDateObj.getMonth() + 6));
      case "y3":
        return new Date(activationDateObj.setMonth(activationDateObj.getMonth() + 12));
      default:
        setErrorMessage("Invalid package key.");
        return null;
    }
  };

  // Fetch data and filter
  const getdataList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllFemale_Candidate`);
      const data = response.data.Details;

      const expirationDate = calculateExpirationDate();

      if (expirationDate && expirationDate < new Date()) {
        setRows([]);
        setSearchApiData([]);
        setErrorMessage("Your subscription has expired. Please renew to access data.");
      } else {
        setRows(data);
        setSearchApiData(data);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch data.");
    }
  };

  useEffect(() => {
    getdataList();
  }, []);






  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const phoneNumber = item.phone_no.toLowerCase();
        // const emailMatches = item.job_Desciption.toLowerCase();
        const useremail = item.user_Email.toLowerCase();
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          phoneNumber.includes(searchValue) ||
          // fullName.includes(searchValue) ||
          useremail.includes(searchValue)
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
          Female Talent Pool
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search By Phone No and User Email"
            id="outlined-size-small"
            size="small"
            value={filterValue}
            onChange={handleFilter}
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        </Stack>
        <Box height={10} />

        {errorMessage ? ( // Conditionally render error message
          <Typography color="error" variant="body1">{errorMessage}</Typography>
        ) : rows.length === 0 && !errorMessage ? ( // loading message
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow style={{ whiteSpace: "nowrap" }}>
                  <TableCell align="left" style={{ minWidth: "80px", fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell align="left" style={{ minWidth: "60px", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell align="left" style={{ minWidth: "150px", fontWeight: "bold" }}>District</TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>User Email</TableCell>
                  <TableCell align="left" style={{ minWidth: "100px", fontWeight: "bold" }}>Phone No</TableCell>
                  <TableCell align="left" style={{ minWidth: "85px", fontWeight: "bold" }}>Total Experience</TableCell>
                  <TableCell align="left" style={{ minWidth: "85px", fontWeight: "bold" }}>Resume</TableCell>
                  <TableCell style={{fontWeight: "bold"}}>Candidate Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{ whiteSpace: "nowrap" }}>
                     <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                      <TableCell>{row.first_Name} {row.last_Name}</TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.user_Email}</TableCell>
                      <TableCell>{row.phone_no}</TableCell>
                      <TableCell>{row.Total_experience}</TableCell>
                      <TableCell>
                        {row.resume ? (
                          <a href={"https://sisccltd.com/hrsolutions/" + row.resume} target="_blank" rel="noopener noreferrer">
                            <PictureAsPdfIcon />
                          </a>
                        ) : "_"}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
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
