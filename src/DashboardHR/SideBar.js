import React, { useState, useEffect, useContext, useRef } from "react";
import "./SideBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import whitelogo from "../Image/logoNew.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useLocation } from "react-router-dom";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import { MyContext } from "../MyContext";
import WcIcon from "@mui/icons-material/Wc";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Woman2Icon from "@mui/icons-material/Woman2";
import AssessmentIcon from "@mui/icons-material/Assessment";
const { Header, Sider, Content, Footer } = Layout;
export default function SideBar() {
  const [nameValue, setNameValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [notification, setnotification] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [count, setCount] = useState("");
  const { text, setText } = useContext(MyContext);
  const location = useLocation(); // Get the current location
  const { state } = location;
  const dropdownRef = useRef(null);
  const packageKey = localStorage.getItem("package_key");

  const wKeys = ["w1", "w2", "w3", "w4", "w5", "w6", "w7", "w8"];
  const yKeys = ["y1", "y2", "y3"];
  const localStorageValue = localStorage.getItem("name");

  const menuStyle = {
    background: "#001529", // Customize the background color of the menu
    color: "#fff", // Customize the text color of the menu items
    height: "82vh",
  };
  const getActiveKey = () => {
    const path = location.pathname;
    // Implement your logic to determine the active key based on the 'path'
    // For example, you can use a switch statement or if-else conditions.
    // Here's a simple example:
    switch (path) {
      case "/admin":
        return ""; // Use the localStorage value if available, otherwise, use an empty string
      case "/admin/GetAllJobs":
        return "GetAllJobs";
      case "/admin/AddNewJob":
        return "AddNewJob";
      case "/admin/NextAddJob":
        return "NextAddJob";

      case "/admin/Profile":
      case "/admin/MyProfile":
      case "/admin/ChangePassword":
      case "/admin/JobDescription":
      case "/admin/JobTital":
      case "/admin/Candidate":
      case "/admin/JobDetailFemale":
      case "/admin/FemaleTelentPool":
      // case "/admin/Psychometric":
      case "/admin/EditHotel":
      case "/admin/AddRoomInFloor":
      case "/admin/GetRoomFloorData":
      case "/admin/GetRoomFloorData":
      case "/admin/Report":
        return "Analytics";

      // Add more cases for other pages
      default:
        return "";
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  const signoutData = () => {
    localStorage.clear();
    navigate("/");
  };
  const adminImage = localStorage.getItem("profileImage");
  useEffect(() => {
    // Retrieve the current value from localStorage
    const storedName = localStorage.getItem("name");
    const storedImage = localStorage.getItem("profileImage");
    console.log(storedName, storedImage);

    if (storedName) {
      setNameValue(storedName);
    } else {
      // If the "name" key doesn't exist in localStorage, set it with the value from state
      localStorage.setItem("name", state?.dataValue?.firstName || "");
      setNameValue(state?.dataValue?.firstName || "");
    }
    if (storedImage) {
      setImageValue(storedImage);
    } else {
      // If the "image" key doesn't exist in localStorage, set it with the value from state
      localStorage.setItem("profileImage", state?.dataValue?.image || "");
      setImageValue(state?.dataValue?.image || "");
    }
  }, [nameValue, imageValue, state]);

  const getNotification = () => {
    axios
      .get(`${baseUrl}getNotification_emp/${localStorage.getItem("empId")}`)
      .then((response) => {
        console.log(response.data.notification_details);
        setnotification(response.data.notification_details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu2 = () => {
    setOpen1((prev) => !prev);
    getNotification();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen1(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlUnSeeNotification = () => {
    axios
      .get(`${baseUrl}unseenNotificationCount/${localStorage.getItem("empId")}`)
      .then((response) => {
        console.log(response.data.unseenNotificationCount);
        setCount(response.data.unseenNotificationCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handlUnSeeNotification();
  }, []);

  const handleSeeNotification = (id) => {
    axios
      .post(`${baseUrl}/seenNotification/${id}`)
      .then((response) => {
        console.log(response);
        handlUnSeeNotification();
        getNotification();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed} id="sideHr">
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <div className="sm-logo px-4">
              <img
                src={whitelogo}
                className=" festabash-l0go mb-3"
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
            </div>
            <div className="lg-logo">Client</div>
          </h2>
        </div>
        {wKeys.includes(packageKey) ? (
          <Menu
            mode="inline"
            style={menuStyle}
            defaultSelectedKeys={[getActiveKey()]} // Set the active key based on the URL
            onClick={({ key }) => {
              if (key === "signout") {
                // Handle signout
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: " ",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "GetAllJobs",
                icon: <WorkOutlineOutlinedIcon className="fs-4" />,
                label: "Jobs",
              },
              {
                key: "JobDescription",
                icon: <BookmarkBorderIcon className="fs-4" />,
                label: "Job Description",
              },
            ]}
          />
        ) : yKeys.includes(packageKey) ? (
          <Menu
            mode="inline"
            style={menuStyle}
            defaultSelectedKeys={[getActiveKey()]} // Set the active key based on the URL
            onClick={({ key }) => {
              if (key === "signout") {
                // Handle signout
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: " ",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "GetAllJobs",
                icon: <WorkOutlineOutlinedIcon className="fs-4" />,
                label: "Jobs",
              },
              {
                key: "JobDescription",
                icon: <BookmarkBorderIcon className="fs-4" />,
                label: "Job Descriptions",
              },
              {
                key: "FemaleTelentPool",
                icon: <Woman2Icon className="fs-4" />,
                label: "Female Pool",
              },
              {
                key: "Candidate",
                icon: <WcIcon className="fs-4" />,
                label: "Candidates",
              },
              {
                key: "Report",
                icon: <AssessmentIcon className="fs-4" />,
                label: "Report",
              },
            ]}
          />
        ) : null}
      </Sider>

      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-3"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center mx-4">
            <div className="d-flex gap-3 align-items-center dropdown">
              <div className="nav-item dropdown" ref={dropdownRef}>
                <a className="nav-link ai-icon" onClick={toggleMenu2}>
                  <NotificationsIcon />
                  <span className="badge">{count}</span>
                  <div className="pulse-css" />
                </a>

                {open1 && (
                  <div className="menuProfile1" id="myDIV">
                    <div className="widget-media dz-scroll p-3 addClass">
                      <ul className="timeline">
                        {Array.isArray(notification) &&
                          notification.map((info, index) => (
                            <li
                              key={index}
                              onClick={() => handleSeeNotification(info._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <b>{index + 1}</b>. {info.message}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className="nav-item dropdown">
                <a className="nav-link  ai-icon">
                  <NotificationsIcon onClick={toggleMenu2} />
                  {show === 1 ? <span className='badge' style={{ "backgroundColor": "red", "color": "white" }}>{Count}</span> : null}
                  <span className="badge">{count}</span>
                  <div className="pulse-css" />
                </a>
                {open1 && (
                  <div className="menuProfile1" id="myDIV">
                    <div className="widget-media dz-scroll p-3 addClass">
                      <ul className="timeline">
                        {Array.isArray(notification) &&
                          notification.map((info, index) => (
                            <li
                              key={index}
                              onClick={() => handleSeeNotification(info._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <b>{index + 1}</b>.{info.message}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div> */}
              <div>
                <h5 className="mb-0 ps-3">{nameValue}</h5>
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div>
                    {imageValue ? (
                      <img
                        style={{ borderRadius: "50%" }}
                        width={32}
                        height={32}
                        src={`https://sisccltd.com/hrsolutions/${
                          text ? text : adminImage
                        }`}
                        alt="loading"
                      />
                    ) : (
                      <img
                        style={{ borderRadius: "50%" }}
                        width={32}
                        height={32}
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="loading"
                      />
                    )}
                  </div>
                  {/* <div>
                    <h5 className="mb-0 ps-3">{nameValue}</h5>
                  </div> */}
                </div>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <NavLink
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/Profile"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item py-2 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/ChangePassword"
                  >
                    Change Password
                  </NavLink>
                </li>
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            // padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          HR Solution Admin Panel ©2024 Created by Admin
        </Footer>
      </Layout>
    </Layout>
  );
}
