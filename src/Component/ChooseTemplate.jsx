import React from 'react'
import Header from './Header'
import Footer from './Footer'
import cssVars from '@mui/system/cssVars'
import cvOne from "../../src/Image/cv1.jpg"
import cvTwo from "../../src/Image/cv2.jpg"
import cvThree from "../../src/Image/cv3.jpg"
import cvFour from "../../src/Image/cv4.jpg"
import { Link } from 'react-router-dom'
import cvBanner from "../Image/cvBanner.jpg"

const ChooseTemplate = () => {
    return (
        <div>
            <Header />
            <section
                className="gridBanner"
                style={{
                    backgroundImage: `url(${cvBanner})`
                }}
            >
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h2> CV </h2>
                            <p className="mt-2">Find Your Best templates According to Your Field  </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="chooseTempSec">
                <div className="container">
                    <div className="row">
                        <div className=" ">
                            <h1>Templates We Recommended For You </h1>
                            <p>You can always change your template later</p>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/templates">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvOne} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>

                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/templates">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvTwo} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>

                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvThree} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>

                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvThree} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4">
                            <Link to="/">
                                <div className="resumeImage">
                                    <div>
                                        <img src={cvFour} alt="" />
                                    </div>
                                    <h4>Choose Templates</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ChooseTemplate
