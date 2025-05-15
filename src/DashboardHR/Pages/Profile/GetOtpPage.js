import React, { useState, useEffect } from "react";
import axios from "axios";
import OtpInput from "react-otp-input";
import { baseUrl } from "../../../Api/BaseUrl";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../Image/white-logo.png";
import { useLocation } from "react-router-dom";

export default function GetOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state.email);
  const [maskedEmail, setMaskedEmail] = useState(email);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    error: {},
    isarray: false,
  });

  // Mask the email using useEffect
  useEffect(() => {
    const emailParts = email.split("@");
    if (emailParts.length === 2) {
      const localPart = emailParts[0];
      const domainPart = emailParts[1];

      const maskedLocalPart =
        localPart.length > 4
          ? "*".repeat(localPart.length - 4) + localPart.slice(-4)
          : localPart;

      setMaskedEmail(`${maskedLocalPart}@${domainPart}`);
    }
  }, [email]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}verifyOTP`, {
        otp: otp,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire(
            `${response.data.message}`,
            "You clicked the button!",
            "success"
          );
          navigate("/ResetPasswordPage", {
            state: { clienID: response.data.clientId },
          });
        }
      })
      .catch((error) => {
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
        console.log(error);
      });
  };

  return (
    <>
      <section className="section-paddings">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="auth-form">
                  <div className="text-center mb-3">
                    <img
                      src={logo}
                      style={{
                        height: "auto",
                        width: "150px",
                        margin: "0 auto",
                      }}
                      alt="Logo"
                    />
                  </div>
                  <h4 className="text-center text-white py-3">
                    OTP Verification
                  </h4>
                  <form>
                    <p className="text-white text-center">
                      An OTP has been sent to {maskedEmail}
                    </p>
                    <div className="container text-center">
                      <div id="inputs" className="inputs4">
                        <OtpInput
                          inputStyle={{
                            width: "3rem",
                            height: "3rem",
                            fontSize: "1rem",
                            borderRadius: 4,
                            border: "2px solid rgba(0,0,0,0.3)",
                            display: "block",
                          }}
                          value={otp}
                          onChange={setOtp}
                          numInputs={4}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                        {error.isarray && (
                          <div className="text-danger">
                            {error.error.response.data.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="b-btn mt-4"
                        onClick={handleOnsubmit}
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
