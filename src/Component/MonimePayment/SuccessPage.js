import React from 'react'
import './SuccessPage.css';
 
import { baseUrl } from '../../Api/BaseUrl';
import axios from "axios";
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
export default function SuccessPage() {
    const location = useLocation();
    useEffect(() => {
        const updatePaymentDetails = async () => {
            try {
                const searchParams = location.search.slice(1); // Remove the "?" at the start
                const params = searchParams.split("$").reduce((acc, param) => {
                    const [key, value] = param.split("=");
                    acc[key] = value;
                    return acc;
                }, {});
    
                const course_id = params.course_id;
                const bookingId = params.booking_id;
                const enroll_user_id = params.enroll_user_id;
    
                console.log("Client ID:", course_id);
                console.log("Booking ID:", bookingId);
                console.log("Booking ID:", enroll_user_id);
    
                if (!course_id || !bookingId || !enroll_user_id) {
                    console.error("Missing client_id or booking_id andenroll_user_id in URL");
                    return;
                }
    
                const response = await axios.post(`${baseUrl}enroll_course/${enroll_user_id}`, {
                    course_id,
                    booking_id: bookingId,
                    status : 1,
                });
    
                console.log("API Response:", response);
                if (response.status === 200) {
                    alert("Payment received! Thank you");
                }
            } catch (error) {
                console.error("Error updating payment details:", error);
                alert("Failed to update payment details. Please contact support.");
            }
        };
    
        updatePaymentDetails();
    }, [location.search]);


    return (
        <>
            <div className="container">
                <div className="printer-top" />
                <div className="paper-container">
                    <div className="printer-bottom" />
                    <div className="paper">
                        <div className="main-contents">
                            <div className="success-icon">✔</div>
                            <div className="success-title">Payment Complete</div>
                            <div className="success-description">
                                Your payment has been confirmed.
                            </div>
                            <div><Link to='/Courses' className="btn-view-orders">View Course</Link> </div>

                        </div>
                        <div className="jagged-edge" />
                    </div>
                </div>
            </div>
        </>
    )
}
