import React from 'react'
import './Certificate.css'
import logo from "../../Image/logo.jpg"
 

export default function Certificate() {
    return (
        <>
            <section className='section'>
                <div className="certificate-container">
                    <div className="header">
                        <div className="logo">
                            <img src={logo}  alt="Smart Start Logo" />
                        </div>
                        {/* <div className="tagline">
                            <p>...Professionalism Defined</p>
                        </div> */}
                    </div>
                    <h1 className="title">Certificate of Completion</h1>
                    <p className="sub-title">This is to certify that</p>
                    <h2 className="name">Taylor Alonso</h2>
                    <p className="description">
                        Has successfully completed the course{" "}
                        <span className="highlight">[Course Title]</span> comprising
                        <span className="highlight">[Number of Hours]</span> hours of study on
                        <span className="highlight">[Completion Date]</span> in recognition of the
                        commitment to professional development through online learning.
                    </p>
                    <div className="signature-section">
                        <p className="trainer-name">Patricia Olayemi Jangah</p>
                        <p className="trainer-title">Lead Trainer</p>
                    </div>
                    <p className="certificate-id">SSSLYYYY01</p>
                </div>
            </section>

        </>
    )
}
