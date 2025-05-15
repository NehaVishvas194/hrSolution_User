import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../Api/BaseUrl";
import Header from "../Header";
import Footer from "../Footer";
import bgimg from "../../Image/t&C.jpg";
import Background_img from "../../Image/term&con.webp";

export default function TermCondition() {
  const [traning, setTraning] = useState([]);
  const bannercss = { backgroundImage: `url(${bgimg})` };

  const handleGetTraning = () => {
    axios
      .get(`${baseUrl}get__admin_term_condition`)
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
                <h2>Terms & Conditions</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner section End */}
      {/* Privacy and policy section start */}
      <section className="privacy_policy">
        <section className="privacy_section">
          <div className="container">
            <div className="row justify-content-center">
              {traning.map((info) => (
                <div className="col-lg-12">
                  <p
                    className="mt-4"
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
