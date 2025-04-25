import React from 'react'
import Banner from "../../Image/eLearning-1.png"
import Header from '../Header'
// import coursesImg from "../../Image/breadcrumb_shape01.df47cee2.svg"
// import star from "../../Image/breadcrumb_shape02.26314598.svg"
// import round from "../../Image/breadcrumb_shape05.92525270.svg"
// import Airpane from '../../Image/breadcrumb_shape04.eef66ed0.svg'
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { baseUrl } from '../../Api/BaseUrl'
import axios from "axios";
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Footer from '../Footer'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import ImageIcon from '@mui/icons-material/Image'; // For image files
import DescriptionIcon from '@mui/icons-material/Description'; // For document files
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import logo from "../../Image/logo.jpg"
import bgPDF from "../../Image/Marceline-Anderson.png"
import bgPDF2 from "../../Image/Marceline-Anderson2.png"
export default function MyCourseDetail() {

    let location = useLocation();
    const navigate = useNavigate();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [open, setOpen] = React.useState(false);
    const { data, coursId } = location.state
    const [quiz, setQuiz] = useState([]); // Changed from array to string
    const [currectAns, setCurrectAns] = useState([])
    const [rightAns, setRightAns] = useState("")
    const [topId, setTopId] = useState("")
    const [userResult, setUserResult] = useState("")
    const [isdisable, setIsdisablle] = useState(false)
    const [getData, setGetData] = useState([])
    const [option, setOption] = useState([])


    const GetCourseData = () => {
        axios.get(`${baseUrl}get_particular_enrolled_course_details/${localStorage.getItem("UserId")}/${coursId}`)
            .then((response) => {
                console.log(response.data.course);
                setGetData(response.data.course)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        GetCourseData()
    }, []);
    // Define state for selected options
    const [selectedOptions, setSelectedOptions] = useState({});

    // Define the handleOptionChange function
    const handleOptionChange = (questionId, optionName) => {
        setSelectedOptions(prevSelectedOptions => ({
            ...prevSelectedOptions,
            [questionId]: optionName, // Store selected option by question ID
        }));
        console.log("Updated Selected Options:", questionId, optionName);

    };

    const handleClickOpen = (e, id) => {
        setTopId(id);
        setOpen(true);
        axios.get(`${baseUrl}enroll_user_course_topic_quiz/${localStorage.getItem("UserId")}/${id}`)
            .then((response) => {
                console.log("Quiz Data:", response.data.topic_quiz.questions_bank);
                const questions = response.data.topic_quiz.questions_bank;

                // Shuffle questions
                const getRandomQuestions = (questions) => {
                    const shuffled = [...questions].sort(() => 0.5 - Math.random());
                    return shuffled.slice(0); // Return all questions after shuffling
                };

                // Shuffle options for each question
                const shuffleOptionsInQuestions = (questions) => {
                    return questions.map((question) => {
                        const shuffledOptions = [...question.options].sort(() => 0.5 - Math.random());
                        return { ...question, options: shuffledOptions }; // Return the question with shuffled options
                    });
                };

                const randomizedQuestions = shuffleOptionsInQuestions(getRandomQuestions(questions));
                setQuiz(randomizedQuestions); // Set the quiz with randomized options


                // Extract correct answer indices from the topic_quiz array
                const correctAnsArray = randomizedQuestions.map((quizItem) => quizItem.correct_answer);
                console.log("Correct Answer Indices:", correctAnsArray);
                setCurrectAns(correctAnsArray); // Set correct answers in state
            })
            .catch((error) => {
                setOpen(false);
                Swal.fire("Error", `${error?.response?.data?.message}`, "error");
            });
    };





    const handleSubmit = () => {
        const questions_Bank = Object.keys(selectedOptions).map(questionId => ({
            _id: questionId,
            user_answer: selectedOptions[questionId],
        }));

        console.log(questions_Bank)
        const Apidata = {
            topic_id: topId,
            questions_Bank: questions_Bank
        }
        axios.post(`${baseUrl}save_user_quiz_record_of_course_topic/${localStorage.getItem("UserId")}/${coursId}`, Apidata).then((response) => {
            console.log(response.data);
            if (response.status === 200) {
                GetCourseData()
                setSelectedOptions("")
                setOpen(false)
                setUserResult(response.data.user_result)
                Swal.fire("success", `${response?.data?.message}`, "success");

            }


        })
            .catch((error) => {
                console.log(error);
                Swal.fire("Error", `${error?.response?.data?.message}`, "error");
            });
    }

    console.log(userResult)
    // console.log(data, coursId)
    // const GetData = data.find((info) => {
    //     return info.course_id === coursId
    // })
    // console.log(GetData)


    const handleClose = () => {
        setOpen(false);
    };

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800],
            }),
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: '#1a90ff',
            ...theme.applyStyles('dark', {
                backgroundColor: '#308fe8',
            }),
        },
    }));


    const renderHTML = (html) => {
        return { __html: html };
    };
    // Function to determine the correct icon based on the file extension
    const getIconByExtension = (filename) => {
        if (!filename) return <DescriptionIcon />; // Return default icon if filename is missing
        const extension = filename.split('.').pop().toLowerCase(); // Extract file extension
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <ImageIcon />; // Return image icon for image files
            case 'pdf':
                return <PictureAsPdfIcon />; // Return PDF icon for PDF files
            case 'mp4':
                return <PlayCircleIcon />; // Return PDF icon for PDF files
            case 'xlsx':
            case 'csv':
            default:
                return <DescriptionIcon />; // Return default document icon for other file types
        }
    };
    //  console.log(getData.course_Topic.length-1)
    const generatePDF = () => {
        const doc = new jsPDF('landscape');

        // Add background image (width: 2000px, height: 1414px)
        const bgImage = new Image();
        bgImage.src = bgPDF2;
        // bgImage.src = bgPDF; 

        // Ensure the image is stretched to cover the whole page (assuming landscape)
        doc.addImage(bgImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

        // Load the custom font
        doc.setFont('Helvetica'); // You can use custom fonts if needed

        // // Title
        // doc.setFontSize(30);
        // doc.text('Certificate of Completion', 148.5, 50, { align: 'center' });

        // // Subtitle
        // doc.setFontSize(16);
        // doc.setTextColor(50, 87, 106); // RGB equivalent of #32576a
        // doc.setFont('Helvetica', "normal");
        // doc.text('This is to certify that', 148.5, 70, { align: 'center' });


        // Name
        doc.setFontSize(50);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Helvetica', "bold");
        doc.text(`${getData.user_name}`, 148.5, 90, { align: 'center' });

        // Course information with 80% width and reduced line height
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0);
        doc.setFont('Helvetica', "normal");
        const pageWidth = doc.internal.pageSize.width;
        const contentWidth = pageWidth * 0.6;
        const fullCourseInfo = `Has successfully completed the course ${getData.course_name}, comprising ${getData.course_complete_days} days of study on ${getData.Date}.`;
        const courseInfo = doc.splitTextToSize(fullCourseInfo, contentWidth);
        doc.text(courseInfo, 148.5, 105, { align: 'center' });


        // // Trainer's name and signature
        // doc.setFontSize(15);
        // doc.setTextColor(54, 91, 109);
        // doc.setFont('Helvetica', 'bold');
        // const trainerName = 'Patricia Olayemi Jangah';
        // doc.text(trainerName, 148.5, 150, { align: 'center' });
        // const nameWidth = doc.getTextWidth(trainerName);

        // doc.setFontSize(10);
        // doc.setFont('Helvetica', 'normal');
        // doc.text('Lead Trainer', 148.5, 155, { align: 'center' });
        // doc.setLineWidth(1);
        // doc.setDrawColor(1, 8, 75);
        // const startX = 148.5 - nameWidth / 2;
        // const endX = 148.5 + nameWidth / 2;
        // doc.line(startX, 144, endX, 144);


        // Certificate ID in bottom-left corner
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Certificate ID: SSSLYYYY01', 15, 205); // Adjust position as needed

        // Save the PDF
        doc.save('Certificate_of_Completion.pdf');
    };
    return (
        <div> <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                {/* <div className="container">
                    <div className="row">
                        <div className='col-12'>
                            <div className='breadcrumb__content mt-5'>
                                <nav className='breadcrumb'>
                                    <span property="itemListElement" typeof="ListItem"><Link to='/'><a style={{ "color": "white" }}>Home</a></Link> </span>
                                    <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                    <span property="itemListElement" typeof="ListItem"><Link to='/onlinecourse' style={{ "color": "white" }}><a>Courses</a></Link> </span>
                                    <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>

                                </nav>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='breadcrumb_parafrafh'>Empowering Your Future Through Accessible Online Learning</div>
                <div className='breadcrumb__shape-wrap'>
                    {/* <img src={coursesImg} className='alltuchtopdown' style={{ "width": "68px" }} /> */}
                    {/* <img src={star} />
                    <img src={round} />
                    <img src={Airpane} /> */}
                </div>
            </section>
            <section className='courses__details-area allJobSec'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-9 col-lg-8'>
                            <div className='courses__details-thumb'>
                                <img src={`https://sisccltd.com/hrsolutions/${getData.course_Image}`} alt="" />
                            </div>
                            <div className='mt-5'>
                                <h4>{getData.course_name}</h4>
                                <p>{getData.course_Description}</p>
                                <div className='col-lg-12 d-flex'>
                                </div>
                            </div>
                            <div className='courses__details-content'>
                                <ul className="nav nav-pills mb-3 nav-tabs" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-home-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-home"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-home"
                                            aria-selected="true"
                                        >
                                            Overview

                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            id="pills-profile-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-profile"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-profile"
                                            aria-selected="false"
                                        >
                                            Topics
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link"
                                            onClick={generatePDF} // Trigger PDF generation on click
                                            disabled={getData.download_certificate === 0}
                                        >
                                            <span>
                                                <ArrowDownwardIcon style={{ fontSize: "20px" }} />
                                            </span>
                                            Download Certificate
                                        </button>
                                    </li>


                                </ul>
                                <div className="tab-content mt-5" id="pills-tabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-home"
                                        role="tabpanel"
                                        aria-labelledby="pills-home-tab"
                                        tabIndex={0}
                                    >
                                        <div className="courses__overview-wrap">
                                            <h3 className="title">Course Description</h3>
                                            <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <h3 className="title">What you'll learn in this course?</h3>
                                            <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <ul className="about__info-list list-wrap">
                                                <li className="about__info-list-item">
                                                    <i className="flaticon-angle-right"><ChevronRightIcon /></i>
                                                    <p className="content">Work with color & Gradients & Grids</p>
                                                </li>
                                                <li className="about__info-list-item">
                                                    <i className="flaticon-angle-right"><ChevronRightIcon /></i>
                                                    <p className="content">All the useful shortcuts</p>
                                                </li>
                                                <li className="about__info-list-item">
                                                    <i className="flaticon-angle-right"><ChevronRightIcon /></i>
                                                    <p className="content">Be able to create Flyers, Brochures, Advertisements</p>
                                                </li>
                                                <li className="about__info-list-item">
                                                    <i className="flaticon-angle-right"><ChevronRightIcon /></i>
                                                    <p className="content">How to work with Images & Text</p>
                                                </li>
                                            </ul>
                                            <p className="last-info">
                                                Morem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magn.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="pills-profile"
                                        role="tabpanel"
                                        aria-labelledby="pills-profile-tab"
                                        tabIndex={0}
                                    >
                                        <div className="courses__curriculum-wrap">
                                            {/* <h3 className="title">Course Curriculum</h3>
                                            <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p> */}
                                            <div className="accordion" id="accordionExample">
                                                {/* Check if getData exists and has a course_Topic array */}
                                                {getData && getData.course_Topic && getData.course_Topic.length > 0 ? (
                                                    getData.course_Topic.map((info, index) => (
                                                        <div className="accordion-item" key={info._id}>
                                                            <h2 className="accordion-header" id={`heading_${index}`}>
                                                                <button
                                                                    className={`accordion-button ${info.topic_status === 0 ? 'disabled' : (index === 0 ? '' : 'collapsed')}`} // Disable if topic status is 0
                                                                    type="button"
                                                                    data-bs-toggle="collapse"
                                                                    data-bs-target={`#collapse_${index}`}
                                                                    aria-expanded={index === 0 ? "true" : "false"}
                                                                    aria-controls={`collapse_${index}`}
                                                                    disabled={info.topic_status === 0} // Disable button based on conditions
                                                                >
                                                                    {info.topic_name}
                                                                </button>
                                                            </h2>
                                                            <div
                                                                id={`collapse_${index}`}
                                                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                                aria-labelledby={`heading_${index}`}
                                                                data-bs-parent="#accordionExample"
                                                            >
                                                                <div className="accordion-body">
                                                                    <ul className="list-wrap">
                                                                        <li className="course-item open-item">
                                                                            <a className="course-item-link popup-video">

                                                                                <span className="item-name" dangerouslySetInnerHTML={renderHTML(info.topic_description)}></span>

                                                                            </a>
                                                                            <div className='d-flex col-md-12'>
                                                                                <div className="col-md-3 d-flex" style={{ "text-align": "center" }}>
                                                                                    {info.files.map((filename, fileIndex) => (
                                                                                        <div key={fileIndex}>
                                                                                            <a
                                                                                                href={`http://13.51.205.211:4102/` + filename}  // Link to open the file
                                                                                                target="_blank"  // Open in a new tab
                                                                                                rel="noopener noreferrer"  // Security feature to avoid accessing window object
                                                                                                style={{ textDecoration: 'none', color: 'inherit' }}  // Optional: Style the link to remove underline
                                                                                            >
                                                                                                {getIconByExtension(filename)} {/* Get icon based on file extension */}
                                                                                                {/* <span>{filename}</span>    */}
                                                                                            </a>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <div className="course-item-meta">
                                                                                    <span className="item-meta duration">
                                                                                        {/* Handle button based on topic_status */}
                                                                                        {info.topic_status === 1 ? (
                                                                                            <Button onClick={(e) => handleClickOpen(e, info._id)} style={{ "backgroundColor": "#bf9b2f", "color": "white" }}>
                                                                                                Quiz
                                                                                            </Button>
                                                                                        ) : info.topic_status === 2 ? (
                                                                                            <div>
                                                                                                <p style={{ "color": "green" }}>Quiz Completed!</p>

                                                                                            </div>
                                                                                        ) : (
                                                                                            <span>Status: Inactive</span>
                                                                                        )}
                                                                                    </span>
                                                                                </div>

                                                                            </div>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No course topics available.</p> // Fallback if course_Topic is undefined or empty
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>




                        </div>
                        <div className='col-xl-3 col-lg-3'>
                            <div className='courses__details-sidebar'>
                                <div class="courses__cost-wrap"><span>This Course Fee:</span><h2 class="title">{getData.course_Price}</h2></div>
                                <div className='courses__information-wrap'>
                                    <h5 class="title">Course includes:</h5>
                                    <ul class="list-wrap">
                                        {/* <li>   <AlignHorizontalLeftIcon />
                                            Level
                                            <span>Expert</span></li> */}
                                        {/* <li>   <AvTimerIcon />
                                            Duration
                                        //     <span>11h 20m</span></li> */}
                                        <li>   <CastForEducationIcon />
                                            Topics
                                            <span>{getData?.course_Topic?.length > 0 ? getData.course_Topic.length : "5"}</span>
                                        </li>
                                        <li>   <WorkspacePremiumIcon />
                                            Quizzes
                                            <span>{getData.number_of_quiz}</span></li>
                                        {/* <li>   <QuizIcon />
                                            Certifications
                                            <span>Yes
                                            </span></li> */}
                                        {/* <li>   <SchoolIcon />
                                            Graduation
                                            <span>25K</span></li> */}

                                    </ul>
                                </div>
                                {/* <div className="courses__details-social"><h5 className="title">Share this course:</h5><ul className="list-wrap"><li><a href="#"><i className="fab fa-facebook-f"></i></a></li><li><a href="#"><i className="fab fa-twitter"></i></a></li><li><a href="#"><i className="fab fa-whatsapp"></i></a></li><li><a href="#"><i className="fab fa-instagram"></i></a></li><li><a href="#"><i className="fab fa-youtube"></i></a></li></ul></div> */}
                                <div className="courses__details-enroll">
                                    <div className="tg-button-wrap">

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </section>


            <Footer />

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
                            }}
                        >
                            <Box>
                                <section className="mcqSection">
                                    <div className="container">
                                        <div className="row">
                                            <h2>
                                                {/* <div className="text-center">
                                                    <button>Personal Ability test</button>
                                                </div> */}
                                            </h2>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-7">
                                                {quiz.length > 0 && quiz.map((question, questionIndex) => (
                                                    <div key={question._id} className="questionMcq">
                                                        <strong>{question.question}</strong>
                                                        <input type="hidden" id={questionIndex} value={question._id} />
                                                        {question.options.map((option, optionIndex) => (
                                                            <div key={option._id} className="prantMcq">
                                                                <input
                                                                    type="radio"
                                                                    id={`option_${questionIndex}_${optionIndex}`}
                                                                    name={`question_${question._id}`} // Group options by question ID
                                                                    value={option.option_name}
                                                                    checked={selectedOptions[question._id] === option.option_name} // Check if this option is selected
                                                                    onChange={() => handleOptionChange(question._id, option.option_name)} // Pass question_id and option_name
                                                                />
                                                                <label htmlFor={`option_${questionIndex}_${optionIndex}`}>{option.option_name}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}

                                                <div className="SubmitTest">
                                                    <button
                                                        className="b-btn b-btn-green"
                                                        type="button"
                                                        onClick={handleSubmit}
                                                    >
                                                        Submit<i className="fi fi-sr-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>

                            </Box>

                        </Box>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    )
}













