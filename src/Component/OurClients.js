import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PartnerBanner from "../Image/clients/Our-Clients.png";
import partner1 from "../Image/clients/Marie Stopes.png";
import partner2 from "../Image/clients/Scals.png";
import partner3 from "../Image/clients/ABB.png";
import partner4 from "../Image/clients/Afcom.png";
import partner5 from "../Image/clients/AIIAC.png";
import partner6 from "../Image/clients/Picture7.png";
import partner7 from "../Image/clients/HDF.jpg";
import partner8 from "../Image/clients/BRADCORP.png";
import partner9 from "../Image/clients/rISE.png";
import partner10 from "../Image/clients/MCSL.png";
import partner11 from "../Image/clients/DOMESTIC HELPERS.png";

const OurClients = () => {
  return (
    <div>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${PartnerBanner})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>Our Clients </h2>
              <p className="mt-2">
                Trusted by Leading Brands and Organizations Around the World
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="smartProfesion">
                <div>
                  <h3 className="lrBorder1">
                    <span></span>
                    Our Clients
                    <span></span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Partner Section Start --> */}
      <div className="partner-section mb-20">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="items">
                <img src={partner1} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner2} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner3} alt="partner" />
              </div>
            </div>

            <div className="col-md-4">
              <div className="items">
                <img src={partner4} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner5} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner6} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner7} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner8} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner9} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner10} alt="partner" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="items">
                <img src={partner11} alt="partner" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Partner Section End --> */}
      <Footer />
    </div>
  );
};

export default OurClients;