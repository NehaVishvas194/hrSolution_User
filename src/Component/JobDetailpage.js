import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import logo from "../Image/logo.png";
import qrImg from "../Image/qr.svg";
import star from "../Image/star.png";
import search from "../Image/search.png";
import { baseUrl } from "../Api/BaseUrl";
import moment from "moment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import jsPDF from "jspdf";
import letterheadImg from "../../src/Image/SmartStart-letterhead.jpg";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import logoPath from "../../src/Image/logo.png";

export default function JobDetailpage() {
  const [information, setInformation] = useState(null);
  // const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const jobId2 = location.state;
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`${baseUrl}getJob/${jobId2}`);
        console.log(response.data.Details, "check data");
        setInformation(response.data.Details);
        setCoordinates({
          lat: response.data.Details.job_location_latitude,
          lng: response.data.Details.job_location_longitude,
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId2]);

  const multiStep = (e, id, isPsychometricTest, psychometric_Test) => {
    e.preventDefault();
    if (isPsychometricTest === 1) {
      navigate("/PsychometricTest", { state: { data: psychometric_Test } });
    } else {
      navigate("/multistepform", { state: { data: id } });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const leftWidth = pageWidth * 0.3; // 30% for golden background
    const blueBorderWidth = 2; // blue border
    const contentStartX = leftWidth + blueBorderWidth + 7; // Start content after golden & blue border
    const contentWidth = pageWidth - contentStartX - 10;
    const bottomPadding = 15; // Space from the bottom of the page

    // Function to add a new page with consistent styling
    const addStyledPage = () => {
      doc.addPage();
      // Draw golden background on the new page
      doc.setFillColor(218, 184, 89);
      doc.rect(0, 0, leftWidth, pageHeight, "F");
      // Draw blue border on the new page
      doc.setFillColor(2, 9, 80);
      doc.rect(leftWidth, 0, blueBorderWidth, pageHeight, "F");
      // Fill the right part with #f9f8f8 on the new page
      doc.setFillColor(249, 248, 248);
      doc.rect(
        leftWidth + blueBorderWidth,
        0,
        pageWidth - (leftWidth + blueBorderWidth),
        pageHeight,
        "F"
      );
      // Reset yPosition for the new page content
      return 20;
    };

    // Draw initial golden background
    doc.setFillColor(218, 184, 89);
    doc.rect(0, 0, leftWidth, pageHeight, "F");

    // Draw initial blue border
    doc.setFillColor(2, 9, 80);
    doc.rect(leftWidth, 0, blueBorderWidth, pageHeight, "F");

    // Fill the initial right part with #f9f8f8
    doc.setFillColor(249, 248, 248);
    doc.rect(
      leftWidth + blueBorderWidth,
      0,
      pageWidth - (leftWidth + blueBorderWidth),
      pageHeight,
      "F"
    );

    // left side logo
    const logoWidth = 53;
    const logoHeight = 23;
    const logoX = (leftWidth - logoWidth) / 2; // Center logo inside golden section
    const logoY = 35;
    const padding = 5; // White background padding
    doc.setFillColor(255, 255, 255); // White color
    doc.rect(
      logoX - padding,
      logoY - padding,
      logoWidth + 2 * padding,
      logoHeight + 2 * padding,
      "F"
    );

    // Add Logo
    // const logoPath = "/HrUserPanel/src/Image/logo.png";
    doc.addImage(logoPath, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Add "Contact Us"
    const contactX = 10; // Adjust positioning inside golden part
    let contactY = pageHeight - 50; // Position near the bottom

    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 9, 80);
    doc.text("Contact Us", contactX, contactY);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    contactY += 10;
    doc.text(`Phone:${information.phone_no} `, contactX, contactY);
    // contactY += 10;
    // doc.text("Address: Noida", contactX, contactY);

    const stripHtml = (html) => html.replace(/<\/?[^>]+(>|$)/g, ""); // Removes HTML tags

    // Content Variables
    const Title = `${information?.job_title}`;
    const Description = stripHtml(information?.job_Description || "");
    // const Responsibilities = stripHtml(information?.job_Responsibility || "");

    let yPosition = 20;

    // Add job title
    doc.setFontSize(26);
    doc.setTextColor(0, 0, 0);
    doc.text(Title, contentStartX, yPosition);
    yPosition += 10;

    // Function to add text with page break and color control
    const addTextWithPageBreakAndColor = (
      text,
      x,
      y,
      fontSize,
      textColor,
      isBold = false
    ) => {
      doc.setFontSize(fontSize);
      doc.setTextColor(...textColor);
      if (isBold) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }
      const lines = doc.splitTextToSize(text, contentWidth);
      let currentY = y;
      for (const line of lines) {
        if (currentY + 7 > pageHeight - bottomPadding) {
          currentY = addStyledPage();
        }
        doc.text(line, x, currentY);
        currentY += 7;
      }
      return currentY;
    };

    // Add job description
    yPosition = addTextWithPageBreakAndColor(
      "Job Description",
      contentStartX,
      yPosition,
      16,
      [0, 0, 0],
      true // Make it bold
    );
    yPosition += 5;
    yPosition = addTextWithPageBreakAndColor(
      Description,
      contentStartX,
      yPosition,
      13,
      [102, 116, 136] // Lighter color
    );
    yPosition += 10;
    // Save the PDF
    doc.save(`${information?.job_title || "Job"}.pdf`);
  };

  const shareUrl = `https://smartstartsl.com`;
  const renderHTML = (html) => {
    return { __html: html };
  };
  const mapSrc =
    coordinates.lat && coordinates.lng
      ? `https://www.google.com/maps/embed/v1/view?key=AIzaSyCw7-f8k7chsuVtyKNwo9ek6bh_qON7j8g&center=${coordinates.lat},${coordinates.lng}&zoom=14`
      : "";
  console.log(coordinates);
  console.log("Map coordinates:", coordinates);

  return (
    <>
      <Header />
      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

      <section className="blogBanner8">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <h2>Job Details</h2>
                <p>
                  At Smart Start SL Ltd., we specialise in advertising job
                  vacancies for a diverse range of organisations. Whether you're
                  looking to start your career or take the next step, we connect
                  talented individuals with rewarding opportunities across
                  various industries. Discover your next role and grow your
                  career with us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="jobDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="mt-50 shortSecJob">
                <div className="container">
                  <div className="row">
                    <div className="shortempSec">
                      <div className="d-flex justify-content-end">
                        <div className="logoSecShort">
                          <img src={logo} alt="Logo" />
                        </div>
                      </div>
                      <div className="weHiring">
                        <h2>
                          we are <br /> <span className="Hiring">Hiring</span>
                        </h2>
                        <h5 className="freshIntern">
                          <span>{information?.job_title}</span>
                        </h5>
                        <p className="deadline">
                          Deadline{" "}
                          <i className="fi fi-bs-angle-small-right"></i>
                          {moment(information?.endDate).format("DD-MM-YYYY")}
                        </p>
                        <div className="qualiSec">
                          <div className="buttonqual">
                            <button>Skills</button>
                          </div>
                          <div className="bgProven">
                            <ul>
                              {information?.skills
                                ?.split("•")
                                .map((item, index) => (
                                  <li key={index}>{item.trim()}</li>
                                ))}
                            </ul>
                          </div>
                          <div className="search">
                            <img src={search} alt="Search" />
                          </div>
                        </div>
                      </div>
                      <div className="socialMediaParent">
                        <div className="yellowSocial">
                          <div className="socialChild">
                            <i className="fab fa-facebook-f"></i>
                          </div>
                          <div className="socialChild">
                            <i className="fab fa-twitter"></i>
                          </div>
                          <div className="socialChild">
                            <i className="fab fa-youtube"></i>
                          </div>
                          <div className="socialChild">
                            <i className="fab fa-instagram"></i>
                          </div>
                        </div>
                        <div className="cvSec">
                          <h4 style={{ color: "white" }}> Apply Today: </h4>
                          {/* <p className="gmailJob">
                            {" "}
                            {information?.employee_email}
                          </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="download-button">
                <button onClick={generatePDF} className="b-btn mb-3">
                  Download Job Details
                </button>
              </div>
              <div className="share-buttons">
                <FacebookShareButton
                  url={shareUrl}
                  title={information?.job_title}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  title={information?.job_title}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={shareUrl}
                  title={information?.job_title}
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  title={information?.job_title}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sideDetails">
                <div className="applyDetails">
                  <button
                    onClick={(e) =>
                      multiStep(
                        e,
                        information?.jobId,
                        information?.isPsychometricTest,
                        information?.psychometric_Test
                      )
                    }
                  >
                    Apply for job
                  </button>
                </div>
                <h4>Job Overview</h4>
                <div className="bgSide">
                  {/* <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Company Email</p>
                      <p>
                        {information?.employee_email} {information?.phone_no}
                      </p>
                    </div>
                  </div> */}
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Location</p>
                      <p>{information?.location?.join(",")}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i class="fa fa-building" aria-hidden="true"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Company Name</p>
                      <p>{information?.company_name}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-industry"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Industry</p>
                      <p>{information?.company_Industry}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-history"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Experience</p>
                      <p>{information?.Experience}</p>
                    </div>
                  </div>
                  <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i className="fa fa-university"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Academic Qualification</p>
                      <p>{information?.qualification}</p>
                    </div>
                  </div>
                  {/* <div className="jobOverviewParent">
                    <div className="iconOverview">
                      <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
                    </div>
                    <div>
                      <p className="offerdSalary">Skill</p>
                      {information?.key_qualification?.map((info) => (
                        <p className='truncate'>{info}</p>
                      ))}

                    </div>
                  </div> */}
                </div>
                {/* <h5>Job Location</h5>
                <div className="mapDetail">
                  {coordinates.lat && coordinates.lng ? (
                    <iframe
                      src={mapSrc}
                      height={350}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <p>Loading map...</p>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
