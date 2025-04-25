import React from "react";
import { Link } from "react-router-dom";
import logo from "../Image/logo.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import whatsappIcon from "../../Image/whtsp.png";

export default function Header() {
  const { t, i18n } = useTranslation();
  const handlesubmit = (code) => {
    i18n.changeLanguage(code);
    console.log("SELECT", code);
    localStorage.setItem("language", code);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg px-4 navBar">
        <div className="container-fluid">
          <a className="navbar-brand me-5" href="#">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen} // Sync aria-expanded with state
            aria-label="Toggle navigation"
            onClick={handleToggle} // Handle click event
          >
            {isMenuOpen ? (
              <ClearIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item navList">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/Vacancy" className="nav-link">
                  Vacancies
                </Link>
              </li>
              <li className="nav-item navList dropList dropdown">
                <Link
                  to="/Services"
                  className="nav-link dropdown-toggle"
                  style={{ color: "#000" }}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Our Services
                </Link>
                <ul className="dropdown-menu">
                  {/* <li>
                  <Link to="/fixitfinder" className="dropdown-item">
                    Fixit Finder
                  </Link>
                </li> */}
                  <li>
                    <Link to="/hrconsultancy" className="dropdown-item">
                      HR Consultancy
                    </Link>
                  </li>
                  <li>
                    <Link to="/traingdev" className="dropdown-item">
                      Learning And Development
                    </Link>
                  </li>
                  <li>
                    <Link to="/elitefemale" className="dropdown-item">
                      Elite Female Talent Pool
                    </Link>
                  </li>
                  {/* <li>
                  <Link to="/acadmiccredintial" className="dropdown-item">
                    Academic Credential Verifier
                  </Link>
                </li> */}
                  {/* <li>
                  <Link to="/" className="dropdown-item">
                    Recruitment and Selection
                  </Link>
                </li> */}
                  {/* <li>
                  <a className="dropdown-item">
                    Employee Outsourcing
                  </a>
                </li> */}
                  <li>
                    <Link to="/teleconsult" className="dropdown-item">
                      HR Teleconsultation
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item navList">
                <Link to="/basiclabourtool" className="nav-link">
                  Basic Labour Tools
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/onlinecourse" className="nav-link">
                  Online Courses
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/Blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/ContentAs" className="nav-link">
                  Contact Us
                </Link>
              </li>
              {/* <li className="nav-item   dropList dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  style={{ color: "#000" }}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pages
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Login
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Registor
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>

            <div className="hedder-button">
              <Link to="/SignUp" className="b-btn job_area_btn" href="">
                <i className="fi fi-rr-circle-user" /> Sign Up
              </Link>
              <Link to="/Signin" className="b-btn job_area_btn" href="/SignUp">
                <i className="fi fi-rr-circle-user" /> Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="whatChat">
        <Link
          to="https://chat.whatsapp.com/ICzrvs7FxGVFusmG9hdLo2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsappIcon} alt="WhatsApp" />
        </Link>
      </div>
    </>
  );
}
