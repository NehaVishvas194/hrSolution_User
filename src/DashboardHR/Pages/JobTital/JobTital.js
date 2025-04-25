import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
// import AddStop from '../AddStop';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 import { baseUrl } from '../../../Api/BaseUrl';
 import Swal from "sweetalert2";
export default function JobTital() {
  const [stop, setstop] = useState("")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [stopName, setStopName] = useState("");
  const [error, seterror] = useState({
    error: {

    }, isarray: false
  })
  const [searchInput, setSearchInput] = useState('');
  const [originalUser, setOriginalUser] = useState([]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleStopAddData = () => {
    axios.get(`${baseUrl}alljobTitle`).then((response) => {
      console.log(response.data.details)
      setstop(response.data.details)
      setOriginalUser(response.data.details)

    }).then((error) => {
      console.log(error)
    })

  }
  useEffect(() => {
    handleStopAddData()
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}addJobTitle`, {
      jobTitle: stopName,   
    }).then((response) => {
      console.log(response);
      handleClose()
      alert("jobTitle is added successfully.");
      handleStopAddData()
      setStopName('')


    }).catch((error) => {
      seterror({ isarray: true, error: error })
      console.log(error)
    })
    console.log({
      stopName,
    })
  }
  const handleDelete = (id) => {
    console.log(id)
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`${baseUrl}deletejobTitle/${id}`)
          .then(() => {
            setstop((prevRoutes) => prevRoutes.filter((post) => post._id !== id));

          })
          .catch((error) => {
            console.log(error)
          })
      }
    })

  }
  const handleSearch = () => {
    const filteredUsers = stop.filter((u) =>
      u.stopName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setstop(filteredUsers);
    setRowsPerPage(5); // Reset rowsPerPage to the default value
    setPage(0);
  };

  const clearSearch = () => {
    setSearchInput('');
    setstop(originalUser);
  };

  return (
    <div>
      <div className='content-body'>
        <div className="container-fluid">

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">ADD Job Tital</h4>
                  <div className='pl-2'>
                    <Button variant='contained' className='month-link' onClick={handleClickOpen}>Add Job Title</Button></div>

                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <div id="example3_wrapper" className="table dataTables_wrapper no-footer">
                      <div className="showAndSearch">
                        <div className="dataTables_length" id="example3_length">

                        </div>
                        <div id="example3_filter" className="dataTables_filter">
                          <label>
                            Search:{" "}
                            <input
                              type="text"
                              className="search_box"
                              placeholder="Search by Job Title..."
                              aria-controls="example3"
                              value={searchInput}
                              style={{ "width": "322px", " outline-style": "none" }}

                              onChange={(e) => setSearchInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleSearch();
                                }
                              }}


                            />
                            {searchInput.length > 0 && (
                              <a
                                variant="outlined"
                                className="clear_button"
                                onClick={clearSearch}
                              >
                                <CloseIcon />
                              </a>
                            )}
                          </label>
                        </div>
                      </div>
                      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>

                              <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Delete</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Array.isArray(stop) && stop.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((info, index) => (

                                <TableRow role="row" className="odd" key={info._id}>
                                  <TableCell>{info.jobTitle}</TableCell>

                                  <TableCell><Button onClick={() => handleDelete(info._id)}><DeleteOutlineOutlinedIcon /></Button></TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[10, 25, 100]}
                          component="div"
                          count={stop.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />



                      </Paper>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 
        <AddStop open={popup} onClose={() => setPopup(false)} /> */}

      </div>
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
                <TextField fullWidth label="Stop Name" id="fullWidth" size="small" sx={{ width: 400 }} value={stopName}
                  onChange={(e) => setStopName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }} /> <br></br>


                <p>{error.isarray ? <div className="text-danger">{error.error.response.data.message}</div> : ""} </p>
                <Button variant="contained" size="small" sx={{ width: 100 }} onClick={handleSubmit}>Add Stop</Button>
              </Box>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  )
}
