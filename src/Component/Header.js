import React from "react";
import { Link } from "react-router-dom";
import logo from "../Image/logo.png";
import { useTranslation } from "react-i18next";
import Home2 from "../HRComponent/Company/Home_Campany";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import whatsappIcon from "../Image/whtsp.png";

export default function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handlesubmit = (code) => {
    i18n.changeLanguage(code);
    console.log("SELECT", code);

    localStorage.setItem("language", code);
  };
  const signoutData = () => {
    localStorage.clear();
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navBar position_fixit">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </a>
          <button
            className="navbar-toggler btn-sm"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={handleToggle}
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
                  {" "}
                  Home
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/about" className="nav-link" href="#">
                  About Us
                </Link>
              </li>
              <li className="nav-item navList">
                <Link to="/Vacancy" className="nav-link">
                  Vacancies
                </Link>
              </li>
              <li className="nav-item navList  dropList dropdown">
                <Link
                  to="/Services"
                  className="nav-link dropdown-toggle"
                  style={{ color: "#000" }}
                  href=" "
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
                      Learning and Development
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
                  {" "}
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="hedder-button">
              <div>
                <Link to="/Client" className="b-btn job_area_btn">
                  Employers / Post Job
                </Link>
              </div>
              <div className="dropdown">
                {localStorage.getItem("USername") ? (
                  <div
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <p className="px-3 mb-0">
                      {localStorage.getItem("USername")}
                    </p>
                  </div>
                ) : (
                  <Link to="/login" className="b-btn job_area_btn">
                    Sign in
                  </Link>
                )}

                <div
                  className="dropdown-menu drop_style"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <NavLink
                      className="dropdown-item py-2 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/Profile"
                    >
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item py-2 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      to="/Courses"
                    >
                      My Courses
                    </NavLink>
                  </li>
                  {/* <li>
                <NavLink
                  className="dropdown-item py-2 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/admin/ChangePassword"
                >
                  Change Password
                </NavLink>
              </li> */}
                  <li>
                    <button
                      className="dropdown-item py-2 mb-1"
                      style={{ height: "auto", lineHeight: "20px" }}
                      onClick={signoutData}
                    >
                      Signout
                    </button>
                  </li>
                </div>
              </div>
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
