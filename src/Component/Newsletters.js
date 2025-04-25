
import React, { useState } from 'react';
import axios from 'axios';
import carrerJob from '../Image/letter.jfif';
import Swal from "sweetalert2";
import { baseUrl } from '../Api/BaseUrl';

export default function Newsletters() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}newsLetter`, { email });
      Swal.fire("Success", "subscribed successfully", "success");
      if (response.status === 200) {
        setSuccess('');
        setEmail('');
      } else {
        setError('Failed to subscribe. Please try again later.');
         Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      }
    } catch (error) {
      setError('Failed to subscribe. Please try again later.');
      Swal.fire("Error", `${error?.response?.data?.message}`, "error");
    }
  };

  return (
    <div
      className="cta-area pt-50 pb-20 newsLetterBg"
      style={{ backgroundImage: `url(${carrerJob})` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="cta-text mb-30">
              <h3>Newsletters</h3>
              <p>
                Subscribe for job alerts, career tips, and exclusive opportunities
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="section-bt mb-30">
              <form className="newLetterForm" onSubmit={handleSubmit}>
                <input
                  placeholder="Enter Your Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btnNews">
                  Subscribe Now <i className="fi fi-sr-arrow-right" />
                </button>
              </form>
              {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
              {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
