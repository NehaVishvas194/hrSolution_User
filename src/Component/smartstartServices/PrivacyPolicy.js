import React, { useState, useEffect } from "react";
import Header from "../Header";
import BackgroundImg from "../../Image/privacy.jpg";
import Footer from "../Footer";
import bgimg from "../../Image/privacy-policy.jpg";
import { baseUrl } from "../../Api/BaseUrl";
import axios from "axios";

export default function PrivacyPolicy() {
  const [traning, setTraning] = useState([]);
  const bannercss = { backgroundImage: `url(${bgimg})` };

  const handleGetTraning = () => {
    axios
      .get(`${baseUrl}get_privacy_policy`)
      .then((response) => {
        // console.log(response.data.Details);
        setTraning(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetTraning();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <section className="section-paddings1">
      <Header />
      {/* Banner Section start */}
      <section>
        <div className="Page_title" style={bannercss}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>Privacy Policy</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner section End */}
      <section className="privacy_policy">
        <section className="privacy_section">
          <div className="container">
            <div className="row justify-content-center">
              {traning.map((info) => (
                <div className="col-lg-12 my-5">
                  <p
                    className="heading3"
                    dangerouslySetInnerHTML={renderHTML(info.Description)}
                  ></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </section>
  );
}
