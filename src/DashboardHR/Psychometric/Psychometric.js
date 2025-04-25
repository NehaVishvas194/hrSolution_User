import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Paper,
    Typography,
    Divider,
    Box,
    Stack,
    TextField,
    Button,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import { baseUrl } from '../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function Psychometric() {
    const [jobList, setJobList] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterValue, setFilterValue] = useState("");
    const [searchApiData, setSearchApiData] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getDataList = () => {
        axios
            .get(`${baseUrl}/getAll_psychometric_test_of_client/${localStorage.getItem("empId")}`)
            .then((response) => {
                console.log(response.data.Test);
                setRows(response.data.Test);
                // setSearchApiData(response.data.details)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getDataList();
    }, []);

     

    const navigate = useNavigate();
    const addJobsData = () => {
        navigate('/admin/TestCategery');
    };


    
    const handleFilter = (event) => {
        if (event.target.value === "") {
            setRows(searchApiData);
        } else {
            const filterResult = searchApiData.filter((item) => {
                const fullName = item.jobTitle.toLowerCase();
                // const emailMatches = item.job_Desciption.toLowerCase();

                const searchValue = event.target.value.toLowerCase();

                // Check if the full name, last name, or email includes the search value
                return (
                    fullName.includes(searchValue)
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
            <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                    Jobs List
                </Typography>
                <Divider />
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <TextField
                        sx={{ width: "25%" }}
                        label="Search By Job Title"
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <Button className="global_button" variant="contained" endIcon={<AddCircleIcon />} onClick={addJobsData}>
                        Test Category
                    </Button>
                </Stack>

                <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow style={{ 'white-space': 'nowrap' }}>
                                <TableCell align="left" style={{ minWidth: '80px' }}>
                                    S. No.
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '60px' }}>
                                    Job Title
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: '150px' }}>
                                    Add Test
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell align="left">{i + 1}</TableCell>
                                    <TableCell>{row.category_name}</TableCell>

                                    <TableCell align="left">
                                        <Button variant="outlined">Add test</Button>
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
            </Paper>
        </div>
    );
}
