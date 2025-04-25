import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import Img from "../../Image/Girl.png";
import { baseUrl } from "../../Api/BaseUrl";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import axios from "axios";


const UserProfile = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState([])
    const [online, setOnline] = useState([])
    const handleGetCmslabourToolDetails = () => {
        axios.get(`${baseUrl}get_enrolled_user_detail/${localStorage.getItem("UserId")}`)
            .then((response) => {
                console.log(response.data.detail);
                setOnline(response.data.detail)

            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handleGetCmslabourToolDetails()
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };
    // useEffect(() => {
    //     getdataformclient()
    // }, [])
    // const getdataformclient = () => {
    //     axios.get(`${baseUrl}getAllEmp`).then((response) => {
    //         setData(response.data.Details)
    //     }).catch((error) => {
    //         console.log(error.response.data)
    //     })
    // }
    return (
        <div>
            <Header />
            <section>
                <div className="container d-flex justify-content-center mt-30">
                    <div className="col-lg-12 col-sm-12 col-md-12 col-xl-12">
                        <h1 style={{ justifyContent: "center", textAlign: "center" }}>
                            <Link to="/onlinecourse">Online Courses</Link>
                        </h1>
                        {/* <p style={{ textAlign: "center", color: "" }}>
                            Showcasing our successful collaborations and the impact we've made across various industries. Explore the success stories and partnerships that define Smart Start SL Ltd.
                        </p> */}
                    </div>
                </div>
            </section>

            <section style={{ backgroundColor: "whiteSmoky" }}>
                <MDBContainer className="py-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                                <MDBBreadcrumbItem>
                                    <Link to="/"> <a>Home</a></Link>
                                    
                                </MDBBreadcrumbItem>
                                <MDBBreadcrumbItem active>Client Profile</MDBBreadcrumbItem>
                            </MDBBreadcrumb>
                        </MDBCol>
                    </MDBRow>
                    <div>
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        {online.profileImage ? (
                                            <MDBCardImage

                                                className="rounded-circle"

                                                src={`https://sisccltd.com/hrsolutions/${online.profileImage}`}
                                                alt="loading"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    display: "inline-block",
                                                    backgroundColor: "whiteSmoky",
                                                }}
                                                fluid
                                            />
                                        ) : (
                                            <MDBCardImage

                                                src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                                                alt="avatar"
                                                className="rounded-circle"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    display: "inline-block",
                                                    backgroundColor: "whiteSmoky",
                                                }}
                                                fluid
                                            />
                                        )}

                                        <p className="text-muted mb-2">{online.first_name} {online.last_name}</p>

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{online.first_name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Last Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {online.last_name}

                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {online.email}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />


                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone No</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {online.phone_no}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </div>


                </MDBContainer>
            </section>


            <Footer />
        </div>
    );
};

export default UserProfile;