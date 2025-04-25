import React, { useEffect } from "react";
import "./CancelPage.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Api/BaseUrl";

export default function CancelPackege() {
    const location = useLocation();
    const mockSearch = "?client_id=12345&booking_id=67890";
    const searchParams = new URLSearchParams(mockSearch);
    console.log("Client ID:", searchParams.get("client_id")); // Should log "12345"
    console.log("Booking ID:", searchParams.get("booking_id")); // Should log "67890"
    
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
                payment_status: 2,
            });

            console.log("API Response:", response);
            if (response.status === 200) {
                // alert("Payment failed and details updated.");
            }
        } catch (error) {
            console.error("Error updating payment details:", error);
            // alert("Failed to update payment details. Please contact support.");
        }
    };

    updatePaymentDetails();
}, [location.search]);


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="message-box _success _failed">
                        <i className="fa fa-times-circle" aria-hidden="true" />
                        <h2>Your payment failed</h2>
                        <Link to="/SignUp">
                            <button className="Error_style">
                                <p>
                                    <ArrowBackIcon />
                                    Try again later
                                </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
