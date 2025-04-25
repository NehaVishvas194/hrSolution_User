import { React, useState, useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Banner from '../../Image/7.png'
import axios from 'axios';
import { baseUrl } from '../../Api/BaseUrl';
import { useNavigate } from "react-router-dom";
export default function MyCourses() {
    const navigate = useNavigate();
    const [online, setOnline] = useState([])
    const handleGetCmslabourToolDetails = () => {
        axios.get(`${baseUrl}get_my_enrolled_courses/${localStorage.getItem("UserId")}`)
            .then((response) => {
                console.log(response.data.enrolled_courses);
                setOnline(response.data.enrolled_courses)

            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        handleGetCmslabourToolDetails()
    }, []);

    const handleCourshdetail = (e, id) => {
        navigate("/MyCourseDetail", { state: { coursId: id } })
    }

    return (
        <>
            <Header />
            <section className="gridBanner" style={{ backgroundImage: `url(${Banner})` }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2> Online Courses </h2>
                            <p className='mt-2'>Enhance your skills with our comprehensive online courses.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="onlineSec pt-50 pb-50">
                <div className="container">
                    <h2 className='lrBorder1' style={{ "font-size": "25px" }}><span></span>Smart Start Career Accelerator<span></span> </h2>
                    <div className="row mt-5">
                        {online.length === 0 ? "No Paid Courses" : <>{online.map((info) => (
                            <div className='col-lg-3 p-0 Course_body mb-4'>
                                <div className="card course_inner_card" style={{ width: "18rem" }} >
                                    <img src={`http://13.51.205.211:4102/${info.course_Image}`} className="card-img-top" alt="..." style={{ "height": "80%" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{info.course_name}</h5>
                                        <p className="card-text">
                                            {info.course_Description.length > 20 ? `${info.course_Description.substring(0, 60)}...` : info.course_Description}
                                        </p>
                                        <a className="btn btn-primary mx-1" onClick={(e) => handleCourshdetail(e, info.course_id)}>
                                            start course
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}</>}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}