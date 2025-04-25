import React, { useEffect, useState } from 'react'
import logo from '../Image/logo.png'

import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import Swal from 'sweetalert2'
import axios from "axios";
import { baseUrl } from '../Api/BaseUrl';
import Header from './Header';
import Footer from './Footer';
import qrImg from "../Image/qr.svg"
import star from "../Image/star.png"
import search from "../Image/search.png"



import { useLocation, useNavigate } from 'react-router-dom';

export default function ShortJobTemp() {
    const navigate = useNavigate();
    const [information, setInformatio] = useState("")
    const location = useLocation();
    const data = location.state;
    console.log(data)
    const handleGetJobData = () => {
        axios.get(`${baseUrl}getJob/${data}`).then((response) => {
            console.log(response.data.Details)
            setInformatio(response.data.Details)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        handleGetJobData()
    }, [])
    console.log(information)

    const multiStep = (e, id, isPsychometricTest, psychometric_Test) => {
        e.preventDefault(); // Ensure that preventDefault is invoked as a function
        console.log(id, isPsychometricTest, psychometric_Test)
        if (isPsychometricTest === 1) {
            navigate("/PsychometricTest", { state: { data: psychometric_Test } });
        } else {
            navigate("/multistepform", { state: { data: id } });
        }


    }

    return (
        <>
            <Header />
            <section
                className="blogBanner8"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ">
                            <h1>Job Details</h1>
                            <p>
                                Nous incarnons une vision horizontale, transparente et équitable de
                                l'ESN, pour permettre à ceux qui en font la richesse d'en récolter les
                                fruits.{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="jobDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="parentLogo">
                                <div className="DetailLogo">
                                    <img src={logo} alt="" />
                                </div>
                                <div>
                                    <div className="parentMaiNcCall">
                                        <div className="parentCalDetail">
                                            <div className="callIcon">
                                                <i className="fa fa-link" />
                                            </div>
                                            <div className="textICon">
                                                <a href="https://itdevelopmentservices.com/design_website/sysLearn/index.html">
                                                    http://www.guxoft.com
                                                </a>
                                            </div>
                                        </div>
                                        <div className="parentCalDetail">
                                            <div className="callIcon">
                                                <i className="fa fa-phone" />
                                            </div>
                                            <div className="textICon">
                                                <a href="#">{information.phone_no}</a> 
                                            </div>
                                        </div>
                                        <div className="parentCalDetail">
                                            <div className="callIcon">
                                                <i className="fa fa-envelope" />
                                            </div>
                                            <div className="textICon">
                                                <a href="#">{information.employee_email}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="jobDesTemp">
                                <h5>Job Description</h5>
                                <p>
                                    {information.job_title}
                                    {information.job_Description}

                                </p>
                                <p className="mt-2">
                                    {information.job_Description}
                                </p>
                                <h5>Experience</h5>
                                <p>
                                    job detail
                                    
                                </p>
                                <h5>Must Have</h5>
                                <ul>
                                    <li>
                                        Proficient in ReactJS and other5modern JS libraries/frameworks
                                    </li>
                                    <li>
                                        Proficient in ES6/7 object oriented JavaScript and architecture
                                        and development of Single page web applications.
                                    </li>
                                    <li>
                                        Basic understanding of nodeJS and its package managers like npm
                                        and yarn.
                                    </li>
                                    <li>
                                        Proficient in flux pattern based development and libraries build
                                        upon it like redux, mobX and its derivative micro frameworks like
                                        reduxForm etc.
                                    </li>
                                    <li>
                                        Proficient in Event handling/event driven programming and creating
                                        event observers at appropriate abstraction levels.
                                    </li>
                                    <li>
                                        Strong understanding of build tools like web-pack, its
                                        configuration, scripting and environment management
                                        (dev/test/prod).
                                    </li>
                                    <li>
                                        {" "}
                                        Basic knowledge of HTML5, CSS3 and its frameworks and
                                        pre-processors.
                                    </li>
                                    <li>
                                        Should be able to resolve cross browser incompatibilities
                                        associates with JS and CSS…
                                    </li>
                                    <li>Working Knowledge of D3 and similar JS charting libraries</li>
                                </ul>
                                <h5>Nice to Have</h5>
                                <ul>
                                    <li>Working knowledge of REST API design.</li>
                                    <li>Working knowledge of User Experience Design</li>
                                    <li>Working knowledge of responsive design.</li>
                                    <li> Good understanding of Web 2.0 and Semantic Web standards.</li>
                                    <li>Good understanding of data-structures and algorithms.</li>
                                    <li>Ability to understand and balance performance tradeoffs.</li>
                                    <li>
                                        Experience with programming languages like Ruby on Rails, Python,
                                        Node JS
                                    </li>
                                    <li>Experience in deploying complex systems in AWS</li>
                                    <li>Experience with best practices such as A/B testing.</li>
                                </ul>
                                <h5>Just to Add</h5>
                                <p>
                                    Creative Workplace and open work culture. Creativity and out of the
                                    box thinking is nurtured.
                                </p>
                                <p>
                                    {" "}
                                    Some perks: Excellent Filter Coffee, Free lunches, PS4 and Fooseball
                                    breaks, stocked kitchen topped up with a nice set of people to work
                                    with!
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sideDetails">
                                <div className="applyDetails">
                                    <button onClick={(e) => multiStep(e, information.jobId,information.isPsychometricTest,information.psychometric_Test)}>Apply for job</button>

                                </div>
                                <p className="OverviewJob">Job Overview</p>
                                <div className="bgSide">
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-money" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary">
                                                employee email
                                            </p>
                                            <p>{information.employee_email} {information.phone_no}</p>
                                        </div>
                                    </div>
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-transgender-alt" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary">Company address</p>
                                            <p>{information.company_address} </p>
                                        </div>
                                    </div>
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-graduation-cap" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary">Company name</p>
                                            <p>{information.company_name} </p>
                                        </div>
                                    </div>
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-industry" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary">Industry </p>
                                            <p>{information.company_Industry}</p>
                                        </div>
                                    </div>
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-history" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary"> Experience </p>
                                            <p>{information.Experience}</p>
                                        </div>
                                    </div>
                                    <div className="jobOverviewParent">
                                        <div className="iconOverview">
                                            <i className="fa fa-university" />
                                        </div>
                                        <div>
                                            <p className="offerdSalary"> Qualification </p>
                                            <p>{information.key_qualification}</p>
                                        </div>
                                    </div>
                                </div>
                                <h5>Job Location</h5>
                                <div className="mapDetail">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11382320.295574686!2d29.995966!3d45.853565!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2sUkraine!5e0!3m2!1sen!2sus!4v1706943512911!5m2!1sen!2sus"
                                        height={350}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <div className="mt-50 shortSecJob">
                <div className="container">
                    <div className="row">
                        <div className='shortempSec'>
                            <div className='d-flex justify-content-end'>

                                <div className="logoSecShort">
                                    <img src={logo} alt="" />
                                </div>
                            </div>
                            <div className='weHiring'>
                                <h2>we are <br />  <span className='Hiring'>Hiring</span>  </h2>
                                <p className='freshIntern'> <span>Fresher Intern -</span>  graphics designer</p>
                                <p className="deadline">
                                    Deadline <i class="fi fi-bs-angle-small-right"></i> 26may,2024
                                </p>
                                <div className="qualiSec">
                                    <div className="buttonqual ">
                                        <button>Qualification</button>
                                    </div>
                                    <div className="bgProven">
                                        <div className="proven">
                                            <div>
                                                <img src={star} alt="" />
                                            </div>
                                            <div>
                                                <p>Proven working experience in   visual graphic design graphics.</p>
                                            </div>
                                        </div>
                                        <div className="proven">
                                            <div>
                                                <img src={star} alt="" />
                                            </div>
                                            <div>
                                                <p>Proven working experience in   visual graphic design graphics.</p>
                                            </div>
                                        </div>
                                        <div className="proven">
                                            <div>
                                                <img src={star} alt="" />
                                            </div>
                                            <div>
                                                <p>Proven working experience in   visual graphic design graphics.</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="search">
                                        <img src={search} alt="" />
                                    </div>
                                </div>

                            </div>
                            <div className="socialMediaParent">
                                <div className='yellowSocial'>
                                    <div className="socialChild">
                                        <i class="fab fa-facebook-f"></i>
                                    </div>
                                    <div className="socialChild">
                                        <i class="fab fa-twitter"></i>
                                    </div>
                                    <div className="socialChild">
                                        <i class="fab fa-youtube"></i>
                                    </div>
                                    <div className="socialChild">
                                        <i class="fab fa-instagram"></i>
                                    </div>

                                </div>
                                <div className='cvSec'>
                                    <p>Send your CV and portfolio to :</p>
                                    <p className='gmailJob'>patricia@gmail.com</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
            <Footer />
        </>

    )
}
