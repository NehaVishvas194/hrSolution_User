import React from 'react';
import Banner from "../Image/coursedetail.jpg";
import Header from './Header';
import Footer from './Footer';
// import coursesImg from "../Image/breadcrumb_shape01.df47cee2.svg"
// import star from "../Image/breadcrumb_shape02.26314598.svg"
// import round from "../Image/breadcrumb_shape05.92525270.svg"
// import Airpane from '../Image/breadcrumb_shape04.eef66ed0.svg'
import { useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { baseUrl } from '../Api/BaseUrl';
import axios from "axios";
import { Link } from "react-router-dom";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export default function CourseDetail() {
    const [value, setValue] = React.useState(2);
    let location = useLocation();
    const navigate = useNavigate();
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");
    const [open, setOpen] = React.useState(false);
    const { data, coursId } = location.state
    const [firstname, setFirst_name] = useState(""); // Changed from array to string
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState(""); // Fixed typo in setter name
    const [phoneno, setPhoneno] = useState("");
    const [message, setMessage] = useState("")
    console.log(data, coursId)
    const GetData = data.find((info) => {
        return info._id === coursId
    })
    console.log(GetData)
    const handleClose = () => {
        setOpen(false);
    };
    const handlesubmit = (e, id) => {
        e.preventDefault();
    }
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
    const total_amount = 1
    const cancelUrl = "http://itdevelopmentservices.com/hrsolution/Cancel/"
    const receiptUrl = "http://itdevelopmentservices.com/hrsolution/Success/"
    const EnrolledIntoCourse = (price) => {
        axios.get(`${baseUrl}create_checkOut_session?total_amount=${GetData.price}&cancelUrl=${cancelUrl}&receiptUrl=${receiptUrl}&course_id=${location.state.coursId}&enroll_user_id=${localStorage.getItem('UserId')}`, {
            //     total_amount : Number(1200),
            //     cancelUrl : "http://192.168.1.49:4102/cancle" ,
            //    receiptUrl : "http://192.168.1.49:4102/"
        }).then((response) => {
            console.log(response)
            localStorage.setItem("sessionID", response.data.session_id)
            console.log(response.data.session_id)
            const checkoutUrl = response.data.checkoutUrl
            console.log(checkoutUrl)
            if (response.status === 200) {
                window.location = checkoutUrl;
            }
        }).catch((error) => {
            console.log(error)
            Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        })
    }
    const handleCoursLogin = (e, courseID) => {
        localStorage.setItem("coursID", courseID)
        console.log(courseID)
        { localStorage.getItem("UserId") ? EnrolledIntoCourse() : navigate('/login') }
    }
    // const shareUrl = `http://yourdomain.com/courses/${GetData._id}`;
    // const courseTitle = encodeURIComponent(GetData.Heading);
    // const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    // const twitterShareUrl = `https://twitter.com/intent/tweet?text=${courseTitle}&url=${encodeURIComponent(shareUrl)}`;
    // const whatsappShareUrl = `https://api.whatsapp.com/send?text=${courseTitle}%20${encodeURIComponent(shareUrl)}`;
    // const instagramShareUrl = `https://www.instagram.com/`; // Instagram doesn't allow direct sharing of links via URL
    // const youtubeShareUrl = `https://www.youtube.com/`;
    return (
        <div>
            <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                {/* <div className="container">
                    <div className="row">
                        <div className='col-12'>
                            <div className='breadcrumb__content'>
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
                <div className='breadcrumb_parafrafh mb-0'>Empowering Your Future Through Accessible Online Learning</div>
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
                                <img src={`https://sisccltd.com/hrsolutions/${GetData.image}`} alt="" />
                            </div>
                            <div className='mt-5'>
                                <h4>{GetData.Heading}</h4>
                                <p>{GetData.Description}</p>
                                <div></div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-3'>
                            <div className='courses__details-sidebar'>
                                <div class="courses__cost-wrap"><span>This Course Fee:</span><h2 class="title">{GetData.price}</h2></div>
                                <div className='courses__information-wrap'>
                                    <h5 class="title">Course includes:</h5>
                                    <ul class="list-wrap">
                                        <li><CastForEducationIcon />Topic<span>{GetData.topic.length}</span></li>
                                        <li><WorkspacePremiumIcon />Quizzes<span>{GetData?.number_of_quiz}</span></li>
                                    </ul>
                                </div>
                                {/* <div className="courses__details-social">
                                    {/* <h5 className="title">Share this course:</h5> */}
                                {/* <ul className="list-wrap">
                                        <li><a href={facebookShareUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a></li>
                                        <li><a href={instagramShareUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href={youtubeShareUrl} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    </ul> */}
                                <div className="courses__details-enroll">
                                    <div className="tg-button-wrap">
                                        <a className="btn btn-two arrow-btn" onClick={handleCoursLogin}>
                                            Enroll
                                            <svg
                                                width={16}
                                                height={14}
                                                viewBox="0 0 16 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                data-inject-url="http://127.0.0.1:5500/skillgro-html/assets/img/icons/right_arrow.svg"
                                                className="injectable"
                                            >
                                                <path
                                                    d="M1 7L15 7M15 7L9 1M15 7L9 13"
                                                    stroke="currentcolor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M1 7L15 7M15 7L9 1M15 7L9 13"
                                                    stroke="currentcolor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>
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
                    onClose={handleClose}>
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
                                    <div className="form-group-Add">
                                        <input
                                            type="text"
                                            placeholder="Fistname"
                                            className="form-control"
                                            name="firstname"
                                            required=""
                                            onChange={(e) => setFirst_name(e.target.value)}
                                            value={firstname}
                                        />
                                    </div>
                                    <div className="form-group-Add">
                                        <input
                                            type="text"
                                            placeholder="Lastname"
                                            className="form-control"
                                            name="lastname"
                                            required=""
                                            onChange={(e) => setLastname(e.target.value)}
                                            value={lastname}
                                        />
                                    </div>
                                    <div className="form-group-Add">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            name="email"
                                            required=""
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                    </div>
                                    <div className="form-group-Add">
                                        <input
                                            type="text"
                                            placeholder="Phone No "
                                            className="form-control"
                                            name="phoneno"
                                            required=""
                                            onChange={(e) => setPhoneno(e.target.value)}
                                            value={phoneno}
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
                                        {/* <Button type="submit" onClick={(e) => handlesubmit(e, GetData._id)} variant="contained">
                                            Submit
                                        </Button> */}
                                        <Link to='/PsychometricTest'><Button type="submit" variant="contained">
                                            Submit
                                        </Button></Link>

                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
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
    )
}