import React from 'react'
import './CancelPage.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 import Swal from 'sweetalert2'
import { baseUrl } from '../../Api/BaseUrl';
import axios from "axios";
import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

export default function CancelPage() {
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
                status : 0,
            });

            console.log("API Response:", response);
            if (response.status === 200) {
                //   Swal.fire("Success",`${response?.data?.message}`|| "Payment failed and details updated.", "success");
            }
        } catch (error) {
            console.error("Error updating payment details:", error);
            // alert("Failed to update payment details. Please contact support.");
        }
    };

    updatePaymentDetails();
}, [location.search]);
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success _failed">
                            <i className="fa fa-times-circle" aria-hidden="true" />
                            <h2> Your payment failed </h2>
                            <Link to='/onlinecourse'><button className='Error_style'><p><ArrowBackIcon />Try again later </p></button> </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
