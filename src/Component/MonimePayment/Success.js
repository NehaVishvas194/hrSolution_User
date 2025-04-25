import React from 'react'
import './SuccessPage.css';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Api/BaseUrl';
import axios from "axios";
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";
export default function Success() {
 
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

            const clientId = params.client_id;
            const bookingId = params.booking_id;

            console.log("Client ID:", clientId);
            console.log("Booking ID:", bookingId);

            if (!clientId || !bookingId) {
                console.error("Missing client_id or booking_id in URL");
                return;
            }

            const response = await axios.post(`${baseUrl}update_detail`, {
                clientId,
                booking_id: bookingId,
                payment_status: 1,
            });

            console.log("API Response:", response);
            if (response.status === 200) {
                alert("Payment failed and details updated.");
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
              <div><Link to='/Signin' className="btn-view-orders">Sine in</Link></div>

            </div>
            <div className="jagged-edge" />
          </div>
        </div>
      </div>
    </>
  )
}
