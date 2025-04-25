import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from "./Header";
import Footer from "./Footer";
import Img from "../Image/Girl.png";
import TablePagination from "@mui/material/TablePagination";
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
import { baseUrl } from "../Api/BaseUrl";
import { Link } from "react-router-dom";

const GetAll_candidates = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  useEffect(() => {
    getdataformclient();
  }, []);
  const getdataformclient = () => {
    axios
      .get(`${baseUrl}getAll_candidates`)
      .then((response) => {
        setData(response.data.candidates);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <Header />
      <section>
        <div className="container d-flex justify-content-center mt-30">
          <div className="col-lg-12 col-sm-12 col-md-12 col-xl-12">
            <h1 style={{ justifyContent: "center", textAlign: "center" }}>
              Candidates Profile
            </h1>
            <p style={{ textAlign: "center", color: "" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum,
              modi ab. Debitis quam voluptate mollitia consequuntur magnam odit
              facere nobis.
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "whiteSmoky" }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <Link to="/">Home</Link>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Candidates Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
          <Slider {...settings}>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={index}>
                    <MDBRow>
                      <MDBCol lg="4">
                        <MDBCard className="mb-4">
                          <MDBCardBody className="text-center">
                            <div>
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
                            </div>
                            <p className="text-muted mb-2">
                              {" "}
                              {item?.job_Heading}
                            </p>
                            <p className="text-muted mb-2">
                              {item?.HomeAddress}{" "}
                            </p>
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
                                <MDBCardText className="text-muted">
                                  {item?.first_Name}
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
                                  {item?.candidate_email}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Total experience</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-muted">
                                  {item?.Total_experience}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            {/* <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Password</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-hide">123456</MDBCardText>
                    </MDBCol>
                  </MDBRow> */}
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Highest Education</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-muted">
                                  {item?.Highest_Education}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Gender</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-muted">
                                  {item?.gender}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                              <MDBCol sm="3">
                                <MDBCardText>Relevant experience</MDBCardText>
                              </MDBCol>
                              <MDBCol sm="9">
                                <MDBCardText className="text-muted">
                                  {item?.relevant_experience}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>

                            {/* <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>HomeAddress</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{item?.HomeAddress}</MDBCardText>
                    </MDBCol>
                  </MDBRow> */}
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </div>
                );
              })}

            {/* <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div> */}
          </Slider>

          {/* <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </MDBContainer>
      </section>

      <Footer />
    </div>
  );
};

export default GetAll_candidates;
