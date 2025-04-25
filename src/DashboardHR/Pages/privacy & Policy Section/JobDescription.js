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
import { Document, Packer, Paragraph, TextRun, AlignmentType, Media } from "docx";
import { saveAs } from "file-saver";
import sanitizeHtml from 'sanitize-html';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import { baseUrl } from '../../../Api/BaseUrl';
import { useNavigate } from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import letterheadImg from "../../../Image/SmartStart-letterhead.jpg"
import jsPDF from 'jspdf';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from '@mui/icons-material/Article';

export default function JobDescription() {
  const [count, setCount] = useState(1);
  const [jobList, setJobList] = useState([]);
  const [open4, setOpen4] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [preview, setPreview] = useState('')
  const [description, setDescription] = useState('')
  const [responsibilities, setResponsibilities] = useState('')


  const handleClose4 = () => {

    setOpen4(false);
  };
  const handleClickOpen4 = (e, Description, Responsibilities, title) => {
    setOpen4(true);
    setDescription(Description)
    setPreview(title)
    setResponsibilities(Responsibilities)


  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataList = () => {
    axios
      .get(`${baseUrl}/getAllUploadedJobFiles`)
      .then((response) => {
        console.log(response.data.data);
        setRows(response.data.data);
        setSearchApiData(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataList();
  }, []);

  const renderHTML = (html) => {
    return { __html: html };
  };

  const navigate = useNavigate();
  const addJobsData = () => {
    navigate('/admin/AddJobDescription');
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
  // const toPDF = (id, title, download_count) => {
  //   axios
  //     .get(`${baseUrl}download_jd/${id}?jd_download_count=${count + download_count}`, { responseType: 'blob' })

  //     .then((response) => {

  //       getDataList()
  //       // Update the count in the UI
  //       setRows((prevRows) =>
  //         prevRows.map((row) =>
  //           row._id === id
  //             ? { ...row, jd_download_count: row.jd_download_count + 1 }
  //             : row
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error downloading PDF:", error);
  //     });

  // };

  const toWord = async (e, id, download_count) => {
    try {
      const response = axios
        .post(`${baseUrl}updateJobCountById/${id}`, { "count": count + download_count }, { responseType: 'blob' })

      getDataList();
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id
            ? { ...row, count: row.count + 1 }
            : row
        )
      );
    } catch (error) {
      console.error("Error downloading PDF:", error);

    }

  };



  const generatePDF = async (e, id, download_count) => {
    try {
      const response = await axios.post(`${baseUrl}updateJobCountById/${id}`, { "count": count + download_count }, { responseType: 'blob' });
      getDataList();
      setRows((prevRows) =>
        prevRows.map((row) =>
          row._id === id
            ? { ...row, count: row.count + 1 }
            : row
        )
      );
    } catch (error) {
      console.error("Error downloading PDF:", error);

    }


  };

  function addTextToPDF(doc, textArray, paddingLeft, yPosition, contentWidth, pageHeight, paddingTop, bgImage) {
    const lineSpacing = 16; // Consistent line spacing
    for (const line of textArray) {
      if (yPosition + lineSpacing > pageHeight - 10) {
        doc.addPage();
        // Add the background image to the new page
        const imgWidthMm = 2480 * 0.264583;
        const imgHeightMm = 3508 * 0.264583;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        doc.addImage(bgImage, 'PNG', 0, 0, pageWidth, pageHeight);
        yPosition = paddingTop;
      }
      doc.text(line, paddingLeft, yPosition);
      yPosition += lineSpacing;
    }
    return yPosition;
  }


  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
          Job Description
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
          {/* <Button className="global_button" variant="contained" endIcon={<AddCircleIcon />} onClick={addJobsData}>
            Add Job
          </Button> */}
        </Stack>

        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ 'white-space': 'nowrap' }}>
                <TableCell align="left" style={{ minWidth: '80px', "fontWeight": "bold" }}>
                  Sr. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: '60px', "fontWeight": "bold" }}>
                  Job Title
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: '150px', "fontWeight": "bold" }}>
                  Preview
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: '100px', "fontWeight": "bold" }}>
                  Download Word
                </TableCell>
                {/* <TableCell align="left" style={{ minWidth: '100px', "fontWeight": "bold" }}>
                  Download PDF
                </TableCell> */}
                <TableCell align="left" style={{ minWidth: '100px', "fontWeight": "bold" }}>
                  Times Downloaded
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                     <TableCell align="left">{page * rowsPerPage + i + 1}</TableCell> {/* Corrected line */}
                  <TableCell>{row.jobTitle}</TableCell>
                  {/* <TableCell> <RemoveRedEyeIcon onClick={(e) => handleClickOpen4(e, row.job_Description, row.Responsibilities, row.jobTitle)} /></TableCell> */}
                  <TableCell align="left">

                    {/* <a onClick={() => toWord(row._id, row.jobTitle, row.jd_download_count)} className="">
                      Download Word {row.jobWord}
                    </a> */}
                    {row.jobWord ? (
                      <a href={"https://sisccltd.com/hrsolutions/" + row.jobWord} target="_blank" rel="noopener noreferrer" onClick={(e) => toWord(e, row._id, row.count)}>
                        <ArticleIcon />
                      </a>
                    ) : "_"}

                  </TableCell>

                  {/* <TableCell align="left">
                    {row.jobPdf ? (
                      <a href={"https://sisccltd.com/hrsolutions/" + row.jobPdf} target="_blank" rel="noopener noreferrer" onClick={(e) => generatePDF(e, row._id, row.count)}>
                        <PictureAsPdfIcon />
                      </a>
                    ) : "_"}
                 
                  </TableCell> */}
                  <TableCell>{count ? row.count + count : row.count}</TableCell>
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
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',

              }}
            >
              <Box>
                <form id="contact-form" className="contact-form" method="post" role="form">
                  <>
                    <h2>{preview}</h2>

                    <p dangerouslySetInnerHTML={renderHTML(description)}></p>

                    <p dangerouslySetInnerHTML={renderHTML(responsibilities)}></p>
                  </>

                  <DialogActions>

                    {/* <Button onClick={handleClose4} color="primary">
                      okey
                    </Button> */}
                  </DialogActions>
                </form>

              </Box>

            </Box>
          </DialogContent>
          <DialogActions>

          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
