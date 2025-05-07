import { React, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Banner from "../Image/imageHr_second.png";
import labourTool from "../Image/basiclabertoolman.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";
import Swal from "sweetalert2";
import { use } from "i18next";
import RedeemIcon from "@mui/icons-material/Redeem";
import AirIcon from "@mui/icons-material/Air";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const BasicLabourTool = () => {
  const [value, setValue] = useState("1");
  const [laberTool, setLaberTool] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGetCmslabourToolDetails = () => {
    axios
      .get(`${baseUrl}get_cms_labour_tool_details`)
      .then((response) => {
        console.log(response);
        setLaberTool(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetCmslabourToolDetails();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  const [Basic_pay, setBasic_pay] = useState("");
  const [OT_Hours_weekday, setOT_Hours_weekday] = useState("");
  const [OT_Hours_weekend, setOT_Hours_weekend] = useState("");
  const [blogErr, setBlogErr] = useState(false);
  const [tableData, setTableData] = useState("");
  const [basicPay, setBasicPay] = useState("");
  const [leave_allowence_percentage, setLeave_allowence_percentage] =
    useState("");
  const [leave_all, setLeave_all] = useState(null);
  const [contract_start_Date, setContract_start_Date] = useState("");
  const [employment_end_Date, setEmployment_end_Date] = useState("");
  const [EOSB_days_per_year, setEOSB_days_per_year] = useState("");
  const [untilized_leave_days, setUntilized_leave_days] = useState("");
  const [basic, setBasic] = useState("");
  const [EOSB, setEOSB] = useState(null);
  const [pay, setPay] = useState("");
  const [transport_allowance, setTransport_allowance] = useState("");
  const [rent_allowance, setRent_allowance] = useState("");
  const [hazard_and_other_allowance, setHazard_and_other_allowance] =
    useState("");
  const [salary, setSalary] = useState("");
  const [nassit_percentage, setnassit_percentage] = useState("");

  //   const handleOverTimeData = (e) => {
  //     e.preventDefault();
  //     // setBlogErr({
  //     //     Basic_pay: false,
  //     //     OT_Hours_weekday: false,
  //     //     OT_Hours_weekend: false,

  //     // });
  //     // if (!Basic_pay) {
  //     //     setBlogErr((prevState) => ({ ...prevState, Basic_pay: true }));
  //     // }
  //     // if (!OT_Hours_weekday) {
  //     //     setBlogErr((prevState) => ({ ...prevState, OT_Hours_weekday: true }));
  //     // }
  //     // if (!OT_Hours_weekend) {
  //     //     setBlogErr((prevState) => ({ ...prevState, OT_Hours_weekend: true }));
  //     // }
  //     // if (!Basic_pay || !OT_Hours_weekday || !OT_Hours_weekend) {
  //     //     return;
  //     // }
  //     axios
  //       .post(`${baseUrl}Overtime`, {
  //         Basic_pay: Basic_pay,
  //         OT_Hours_weekday: OT_Hours_weekday,
  //         OT_Hours_weekend: OT_Hours_weekend,
  //       })
  //       .then((response) => {
  //         console.log(response.data.data);
  //         setTableData(response.data.data);
  //         Swal.fire({
  //           title: `${response.data.message}`,
  //           text: " ",
  //           icon: "success",
  //         });

  //         setOT_Hours_weekday("");
  //         setOT_Hours_weekend("");
  //       })
  //       .catch((error) => {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: `${error.response.data.message}`,
  //         });
  //       });
  //     console.log({
  //       Basic_pay,
  //       OT_Hours_weekday,
  //       OT_Hours_weekend,
  //     });
  //   };

  const handleOverTimeData = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}Overtime`, {
        Basic_pay: Basic_pay,
        OT_Hours_weekday: OT_Hours_weekday,
        OT_Hours_weekend: OT_Hours_weekend,
      })
      .then((response) => {
        let data = response.data.data;
        console.log("API Response:", data);

        // Function to extract numbers from a string and round them
        const roundValue = (value) => {
          if (!value) return value;
          let num = parseFloat(value.toString().replace(/[^\d.]/g, ""));
          if (isNaN(num)) return value;
          return num % 1 >= 0.5 ? Math.ceil(num) : Math.floor(num);
        };

        // Format the response data
        const formattedData = {
          Basic_pay: data.Basic_pay,
          OT_Hours_weekday: roundValue(data.OT_Hours_weekday),
          OT_Hours_weekend: roundValue(data.OT_Hours_weekend),
          Basic_pay_per_day: `SLE ${roundValue(data.Basic_pay_per_day)}`,
          Basic_pay_per_Hour: `SLE ${roundValue(data.Basic_pay_per_Hour)}`,
          OT_computation_on_weekday: `SLE ${roundValue(
            data.OT_computation_on_weekday
          ).toLocaleString()}`,
          OT_computation_on_weekend: `SLE ${roundValue(
            data.OT_computation_on_weekend
          ).toLocaleString()}`,
          total_overTime: `SLE ${roundValue(
            data.total_overTime
          ).toLocaleString()}`,
        };

        console.log("Formatted Data:", formattedData);
        setTableData(formattedData);

        Swal.fire({
          title: `${response.data.message}`,
          text: " ",
          icon: "success",
        });

        setOT_Hours_weekday("");
        setOT_Hours_weekend("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      });
  };

  const handleAllowanceData = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}leave_allowence `, {
        Basic_pay: basicPay,
        leave_allowence_percentage: leave_allowence_percentage,
      })
      .then((response) => {
        console.log(response.data.data);
        setLeave_all(response.data.data);

        Swal.fire({
          title: `${response.data.message}`,
          text: " ",
          icon: "success",
        });

        setBasicPay("");
        setLeave_allowence_percentage("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      });
    console.log({
      basicPay,
      leave_allowence_percentage,
    });
  };
  const handleEOSBData = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}calculate_EOSB`, {
        contract_start_Date: contract_start_Date,
        Employment_end_Date: employment_end_Date,
        EOSB_days_per_year: EOSB_days_per_year,
        Basic_pay: basic,
      })
      .then((response) => {
        console.log(response, "this is EOSB data");
        setEOSB(response.data.data);

        Swal.fire({
          title: `${response.data.message}`,
          text: " ",
          icon: "success",
        });

        setContract_start_Date("");
        setEmployment_end_Date("");
        setEOSB_days_per_year("");
        setBasic("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      });
    console.log({
      contract_start_Date,
      employment_end_Date,
      EOSB_days_per_year,
      untilized_leave_days,
      contract_start_Date,
    });
  };
  const handleSalaryData = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}net_salary`, {
        Basic_pay: Number(pay),
        total_Allowance: Number(transport_allowance),

        nassit_percent: Number(nassit_percentage),
      })
      .then((response) => {
        console.log(response);
        setSalary(response.data.data);
        if (response.status === 200) {
          Swal.fire({
            title: `${response.data.message}`,
            text: " ",
            icon: "success",
          });
          setPay("");
          setTransport_allowance("");

          setnassit_percentage("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log({
      pay,
      transport_allowance,
      rent_allowance,
      hazard_and_other_allowance,
    });
  };
  const calculateMinEndDate = () => {
    if (!contract_start_Date) return "";

    const date = new Date(contract_start_Date);
    date.setDate(date.getDate() + 1); // Increment the date by 1 day
    return date.toISOString().split("T")[0]; // Format the date to 'YYYY-MM-DD'
  };

  return (
    <div>
      <Header />
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>
                {" "}
                <span></span>Basic Labour Tools<span></span>{" "}
              </h2>
              <p className="mt-2">
                Your Trusted Partner for Labour Tools—Supporting Businesses and
                Individuals Every Step of the Way.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="basicLabourSec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="OnlineText">
                <h2>{laberTool.Heading}</h2>
                <p
                  dangerouslySetInnerHTML={renderHTML(laberTool.Description)}
                ></p>
              </div>
            </div>
            <div className="col-lg-5 col-md-5">
              <div className="imgTool">
                <img src={labourTool} alt="" />
              </div>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-lg-12">
              <h3 className="mb-5 text-center lrBorder1">
                <span></span>Labour Tools<span></span>
              </h3>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Compute  Overtime" value="1" />
                      <Tab label="Compute  Leave Allowance" value="2" />
                      <Tab label="Compute End of Service Benefit" value="3" />
                      <Tab label="Compute Net Salary" value="4" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="d-flex flex-column overtimeSec labour-tool">
                      <h5
                        className="mt-4 mb-3 fw-bold"
                        style={{ color: "#bf9b2f" }}
                      >
                        What is Overtime?
                      </h5>
                      <p className="">
                        Overtime refers to any hours worked beyond 8 hours per
                        day or 40 hours per week.
                      </p>
                      <h5 className="mb-3 mt-4 fw-bold">Weekday Overtime</h5>
                      <ul>
                        <li>
                          <dl>
                            <div className="bgColorYellow">
                              {/* <dt>First 4 Hours Beyond 40 Hours/Week</dt> */}
                              <dd>
                                Employees working more than 8 hours per day or
                                40 hours per week are entitled to overtime pay.
                              </dd>
                            </div>
                          </dl>
                        </li>
                        <li>
                          <dl>
                            <div className="bgColorBlue">
                              {/* <dt>Overtime Beyond the Initial 4 Hours</dt> */}
                              <dd>
                                Overtime on weekdays is compensated at the
                                regular hourly rate plus 50% extra
                              </dd>
                            </div>
                          </dl>
                        </li>
                      </ul>
                      <h5 className="mb-3 mt-4 fw-bold">
                        Weekend and Public Holiday Overtime
                      </h5>
                      <ul>
                        <li>
                          <dl>
                            <div className="bgColorYellow">
                              {/* <dt>First 4 Hours Beyond 40 Hours/Week</dt> */}
                              <dd>
                                Overtime worked on weekends or public holidays
                                is compensated at the regular hourly rate plus
                                100% extra.
                              </dd>
                            </div>
                          </dl>
                        </li>
                      </ul>

                      <h5 className="fw-bold">Overtime Calculator</h5>
                      <ul>
                        <li>
                          To help you calculate your earnings accurately, use
                          our Overtime Calculator. Simply input your details,
                          and it will automatically apply the correct rates
                          based on the Labour Laws of Sierra Leone.
                        </li>
                      </ul>

                      {/* <p className='mb-0'>
                                                <strong className="Note_text">Note:</strong> This tool is designed to assist with basic calculations. For detailed overtime laws and further guidance on overtime hours beyond the initial calculations and considerations, please refer to the Employment Act of 2023 and Employment Regulations 2023 or seek legal counsel for guidance.
                                            </p> */}
                    </div>
                  </TabPanel>
                  <TabPanel value="1">
                    <div className="    ">
                      <form action="">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>Basic Salary</h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setBasic_pay(value);
                                  }
                                }}
                                name="name"
                                value={Basic_pay}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>Weekday OT Hours</h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setOT_Hours_weekday(value);
                                  }
                                }}
                                name="OT_Hours_weekday"
                                value={OT_Hours_weekday}
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="forInput">
                              <h6>Weekend OT Hours</h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setOT_Hours_weekend(value);
                                  }
                                }}
                                name="OT_Hours_weekend"
                                value={OT_Hours_weekend}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="subBtnLabour">
                          <button onClick={handleOverTimeData}>Submit</button>
                        </div>
                      </form>
                      {tableData.length === 0 ? (
                        ""
                      ) : (
                        <>
                          <div className="ms-invoice-table table-responsive mt-5">
                            <h6>Overtime Computation</h6>
                            <table className="table table-hover text-right thead-light">
                              <thead>
                                <tr className="text-capitalize">
                                  <th className="common_style">
                                    Current Basic Salary
                                  </th>
                                  <th className="common_style">
                                    Basic Salary Per Day
                                  </th>
                                  <th className="text-left common_style">
                                    Basic Salary Per Hour
                                  </th>
                                  <th className="common_style">
                                    Weekday OT Hours
                                  </th>
                                  <th className="common_style">
                                    OT Computation On Weekday
                                  </th>
                                  <th className="common_style">
                                    Weekend OT Hours
                                  </th>
                                  <th className="common_style">
                                    OT Computation On Weekend
                                  </th>
                                  <th className="common_style">
                                    Total overtime pay
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="common_style">
                                    {tableData.Basic_pay}
                                  </td>
                                  <td className="common_style">
                                    {tableData.Basic_pay_per_day}
                                  </td>
                                  <td className="common_style">
                                    {tableData.Basic_pay_per_Hour}
                                  </td>
                                  <td className="common_style">
                                    {tableData.OT_Hours_weekday}
                                  </td>
                                  <td className="common_style">
                                    {tableData.OT_computation_on_weekday}
                                  </td>
                                  <td className="common_style">
                                    {tableData.OT_Hours_weekend}
                                  </td>
                                  <td className="common_style">
                                    {tableData.OT_computation_on_weekend}
                                  </td>
                                  <td className="common_style">
                                    {tableData.total_overTime}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <div className="d-flex flex-column labour-tool overtimeSec">
                      <h5
                        className="mt-4 mb-3 fw-bold"
                        style={{ color: "#bf9b2f !important" }}
                      >
                        Annual Leave Allowance{" "}
                      </h5>
                      <p className="">
                        Under the Employment Act of 2023, Article 71, workers
                        who have served the same employer or workplace
                        continuously for one year are entitled to an annual
                        leave allowance.
                      </p>

                      <ul>
                        <li>
                          <div className="bgColorYellow h-100">
                            <dl>
                              <dt>Eligibility</dt>
                              <dd>
                                Workers with at least one year of continuous
                                service with the same employer are eligible for
                                an annual leave allowance.
                              </dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorBlue h-100">
                            <dl>
                              <dt>Allowance</dt>
                              <dd>
                                The benefit shall be equivalent to at least one
                                month's basic salary or a specified percentage
                                of the annual basic salary as outlined in the
                                applicable collective bargaining agreement. In
                                certain cases, it may be calculated based on the
                                employee's annual gross salary.
                              </dd>
                              {/* <dd>The allowance may also be determined by other favourable terms provided by the employer.</dd> */}
                            </dl>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-column">
                      <h5 className="mt-4 mb-4">Tax Implications</h5>
                      <div className="row">
                        <dl className="col-lg-6 mb-0">
                          <div className="parantTax">
                            <div>
                              <RedeemIcon />
                            </div>
                            <div>
                              <dt className="mb-1">Tax-Exempt Amount</dt>
                              <dd>
                                <p>
                                  Leave allowance up to the monthly basic salary
                                  is tax-exempt.
                                </p>{" "}
                              </dd>
                            </div>
                          </div>
                        </dl>
                        <dl className="col-lg-6 mb-0">
                          <div className="parantTax">
                            <div>
                              <AirIcon />
                            </div>
                            <div>
                              <dt className="mb-1">Taxable Amount</dt>
                              <dd>
                                <p>
                                  Any leave allowance exceeding the monthly
                                  basic salary is subject to income tax at the
                                  highest marginal tax rate of 30%.
                                </p>
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <div className="ovrTime">
                      <form action="">
                        <div className="forInput">
                          <h6>Basic Salary </h6>
                          <input
                            type="text"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setBasicPay(value);
                              }
                            }}
                            name="basicPay"
                            value={basicPay}
                          />
                        </div>
                        <div className="forInput">
                          <h6>Leave Allowance Percentage</h6>
                          <input
                            type="text"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setLeave_allowence_percentage(value);
                              }
                            }}
                            name="leave_allowence_percentage"
                            value={leave_allowence_percentage}
                          />
                        </div>
                        <div className="subBtnLabour">
                          <button onClick={handleAllowanceData}>Submit</button>
                        </div>
                      </form>
                      {leave_all === null ? (
                        ""
                      ) : (
                        <>
                          <div className="ms-invoice-table table-responsive mt-5">
                            <h6>Total Leave Allowance</h6>
                            <table className="table table-hover text-right thead-light">
                              <thead>
                                <tr className="text-capitalize">
                                  <th className="text-center  common_style">
                                    Basic Salary
                                  </th>

                                  <th className="common_style">
                                    Annual Basic Salary
                                  </th>
                                  <th className="common_style">
                                    Leave Allowance % As per Industry CBA
                                  </th>
                                  <th className="common_style">Income Tax</th>
                                  <th className="common_style">
                                    Gross Leave Allowance
                                  </th>
                                  <th className="common_style">
                                    Net Leave Allowance
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="common_style">
                                    {leave_all.Basic_pay}
                                  </td>
                                  <td className="common_style">
                                    {leave_all.annual_Basic}
                                  </td>
                                  <td className="common_style">
                                    {leave_all.leave_allowence_percentage}
                                  </td>
                                  <td className="common_style">
                                    {leave_all.income_tax}
                                  </td>
                                  <td className="common_style">
                                    {leave_all.leave_allowence}
                                  </td>

                                  <td className="common_style">
                                    {leave_all.net_leave_allow}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    <div className="d-flex flex-column labour-tool overtimeSec">
                      <p className="mt-4 mb-3">
                        <b
                          className="fw-bold"
                          style={{ color: "#bf9b2f", fontSize: "18px" }}
                        >
                          End-of-Service Benefits:
                        </b>{" "}
                        Under the Employment Act 2023, Article 80, Employees who
                        serve continuously for 12 months with the same employer
                        are eligible for end-of-service benefits.
                      </p>
                      {/* <p>
                                                <b> Break in Employment: </b> Any break in service of less than 90 days is considered a continuation of employment. Breaks longer than 90 days are regarded as a break in service.
                                            </p> */}
                      {/* <h5 className='mb-3 fw-bold' style={{ "color": "#bf9b2f" }}>Tax Implications</h5> */}
                      <ul className="mb-0">
                        <li>
                          <div className="bgColorYellow h-100">
                            <dl>
                              <dt>Eligibility</dt>
                              <dd>
                                Employees must serve for 12 continuous months
                                with the same employer to qualify for
                                end-of-service benefits.
                              </dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorYellow  h-100">
                            <dl>
                              <dt>Tax Implications</dt>
                              <dd>
                                A 5% tax is applicable on any portion of the
                                end-of-service benefit that exceeds SLE 50,000.
                              </dd>
                            </dl>
                          </div>
                        </li>
                      </ul>
                      <h5 className="mb-3 fw-bold" style={{ color: "#bf9b2f" }}>
                        Break in Employment
                      </h5>
                      <ul className="mb-0">
                        <li>
                          <div className="bgColorYellow  h-100">
                            <dl>
                              <dt>Breaks Less Than 90 Days</dt>
                              <dd>
                                {" "}
                                Any break in service of less than 90 days is
                                considered a continuation of employment.
                              </dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorYellow h-100">
                            <dl>
                              <dt>Breaks Longer Than 90 Days</dt>
                              <dd>
                                Breaks lasting for 90 days or longer are
                                regarded as a break in service.
                              </dd>
                            </dl>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-column">
                      <h5
                        className="mb-2 mt-4 fw-bold"
                        style={{ color: "#bf9b2f", fontSize: "18px" }}
                      >
                        End-of-Service Benefit Calculation
                      </h5>
                      {/* <p>According to Article 73, Point 4 of the Employment Regulations, when a worker becomes entitled to end-of-service benefits or severance pay, the calculation for service periods beyond certain thresholds is as follows</p> */}
                      <div className="row justify-content-between p-1">
                        <dl className="col-lg-12">
                          <div className="parantTax">
                            <div>
                              <AirIcon />
                            </div>
                            <div>
                              <dt className="mb-1">
                                Service Beyond 3 Months but Less Than 6 Months
                              </dt>
                              <dd>
                                {" "}
                                <p>
                                  According to the Employment Regulations 2023
                                  Article 73 subsection 4, any period exceeding
                                  3 months, but less than 6 months, is counted
                                  as 6 months for calculating end-of-service
                                  benefits or severance pay.
                                </p>{" "}
                              </dd>
                            </div>
                          </div>
                        </dl>
                        <dl className="col-lg-12 mb-0">
                          <div className="parantTax">
                            <div>
                              <RedeemIcon />
                            </div>
                            <div>
                              <dt className="mb-1">
                                Service Beyond 6 Months but Less Than 1 Year
                              </dt>
                              <dd>
                                {" "}
                                <p>
                                  Any period exceeding 6 months but less than 1
                                  year is counted as 1 year for the same
                                  purpose.
                                </p>
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>

                      <h5
                        className="mb-1"
                        style={{
                          color: "#bf9b2f",
                          fontSize: "18px",
                          fontWeight: "700",
                        }}
                      >
                        The formular for Calculating End-of-Service Benefits
                      </h5>
                      <p className="mb-2">
                        To calculate your end-of-service benefits, use the
                        formula below:
                      </p>
                      <div className="row justify-content-between">
                        <dl className="col-lg-12">
                          <div className="parantTax mt-3">
                            <div>
                              <AutoFixHighIcon />
                            </div>
                            <div>
                              <dt>Formula</dt>
                              <dd style={{ color: "#667488" }}>
                                Basic Salary × Number of Days based on Years
                                Worked (as per the Collective Bargaining
                                Agreement) × Duration Worked / 22 Working Days
                              </dd>
                              <p className="mb-0">
                                For further guidance regarding these
                                calculations refer to the Employment Act 2023
                                and the Employment Regulations 2023.
                              </p>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="3">
                    <div className="ovrTime">
                      <form>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>Employment Start Date</h6>
                              <input
                                type="date"
                                onChange={(e) => {
                                  setContract_start_Date(e.target.value);
                                  setEmployment_end_Date(""); // Clear the end date when start date changes
                                }}
                                name="contract_start_Date"
                                value={contract_start_Date}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>Employment End Date</h6>
                              <input
                                type="date"
                                onChange={(e) =>
                                  setEmployment_end_Date(e.target.value)
                                }
                                name="employment_end_Date"
                                value={employment_end_Date}
                                min={calculateMinEndDate()} // Set min attribute based on the next day after the contract start date
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>
                                End of Service Benefit Days Per Year based on
                                the Industry Collective Bargaining Agreement
                              </h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setEOSB_days_per_year(value);
                                  }
                                }}
                                name="EOSB_days_per_year"
                                value={EOSB_days_per_year}
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-6"
                            style={{ "margin-top": "18px" }}
                          >
                            <div className="forInput">
                              <h6>Basic Salary</h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setBasic(value);
                                  }
                                }}
                                name="basic"
                                value={basic}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="subBtnLabour">
                          <button onClick={handleEOSBData}>Submit</button>
                        </div>
                      </form>
                      {EOSB === null ? (
                        ""
                      ) : (
                        <>
                          <div className="ms-invoice-table table-responsive mt-5">
                            <h6>End of Service Benefit Computation</h6>
                            <table className="table table-hover text-right thead-light">
                              <thead>
                                <tr
                                  className="text-capitalize"
                                  style={{ "white-space": "nowrap" }}
                                >
                                  <th className="common_style">Start Date</th>
                                  <th className="common_style">End Date</th>
                                  <th className="common_style">Year Served</th>
                                  <th className="common_style">
                                    EOSB Days/Year
                                  </th>
                                  <th className="common_style">Basic Salary</th>
                                  <th className="common_style">Gross EOSB</th>
                                  <th className="common_style">Tax on EOSB</th>
                                  <th className="common_style">Net on EOSB</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="common_style">
                                    {EOSB.contract_start_Date}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.Employment_end_Date}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.year_served &&
                                      Number(EOSB.year_served).toFixed(2)}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.EOSB_days_per_year}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.Basic_salary}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.Gross_EOSB}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.Tax_on_EOSB}
                                  </td>
                                  <td className="common_style">
                                    {EOSB.Net_EOSB}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </div>
                  </TabPanel>
                  <TabPanel value="4">
                    <div className="d-flex flex-column labour-tool overtimeSec">
                      <h5 className="mt-4  mb-3 fw-bold">
                        Net Salary & Allowances
                      </h5>

                      <ul>
                        <li>
                          <div className="bgColorYellow h-100">
                            <dl>
                              <dt>Basic Salary</dt>
                              <dd>
                                This is the fixed amount agreed upon in the
                                employment contract.
                              </dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorBlue h-100">
                            <dl>
                              <dt>Allowances</dt>
                              <dd>Add any allowance.</dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorBlue h-100">
                            <dl>
                              <dt>Gross Salary</dt>
                              <dd>
                                Gross Salary = Basic Salary + Total Allowances{" "}
                              </dd>
                            </dl>
                          </div>
                        </li>
                        <li>
                          <div className="bgColorYellow h-100">
                            <dl>
                              <dt>Deductions PAYE Tax</dt>
                              <dd>
                                Apply the PAYE Tax based on the Sierra Leone tax
                                brackets.
                              </dd>
                              <dd>
                                The tax rate increases progressively based on
                                the total earnings. The highest marginal tax
                                rate is 30%.
                              </dd>
                            </dl>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-column overtimeSec">
                      <h5 className="mt-4 mb-4 fw-bold">
                        Deductions and Net Salary
                      </h5>
                      <div className="row justify-content-between">
                        <dl className="col-lg-6">
                          <div className="parantTax">
                            <div>
                              <AirIcon />
                            </div>
                            <div>
                              <dt>Employee's NASSIT Contribution</dt>
                              <dd>
                                5% of the basic salary is deducted from the
                                employee's earnings.
                              </dd>
                            </div>
                          </div>
                        </dl>
                        <dl className="col-lg-6 p-1">
                          <div className="parantTax">
                            <div>
                              <RedeemIcon />
                            </div>
                            <div>
                              <dt>Employer's NASSIT Contribution</dt>
                              <dd>
                                10% of the basic salary is contributed by the
                                employer.
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="d-flex flex-column">
                      <div className="row justify-content-between">
                        <div className="col-lg-6">
                          <div className="parantTax">
                            <div>
                              <AutoFixHighIcon />
                            </div>
                            <div>
                              <dt>Other Deductions</dt>
                              <dd>
                                Deduct any other contributions, such as union
                                fees, loans etc depending on the employment
                                terms.
                              </dd>
                            </div>
                          </div>
                        </div>
                        <dl className="col-lg-6 p-1">
                          <div className="parantTax">
                            <div>
                              <AcUnitIcon />
                            </div>
                            <div>
                              <dt>Net Salary</dt>
                              <dd>
                                The Net Salary is what the employee takes home
                                after all deductions have been applied.
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value="4">
                    <div className="ovrTime">
                      <form action="">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6> Basic Salary</h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setPay(value);
                                  }
                                }}
                                name="pay"
                                value={pay}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="forInput">
                              <h6>Total Allowance </h6>
                              <input
                                type="text"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d*$/.test(value)) {
                                    setTransport_allowance(value);
                                  }
                                }}
                                name="transport_allowance"
                                value={transport_allowance}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                      {salary.length === 0 ? (
                        ""
                      ) : (
                        <>
                          <div className="ms-invoice-table table-responsive mt-5">
                            <h6>Total Net Salary</h6>
                            <table className="table table-hover text-right thead-light">
                              <thead>
                                <tr
                                  className="text-capitalize"
                                  style={{ "white-space": "nowrap" }}
                                >
                                  <th className="text-center  common_style">
                                    Basic Salary
                                  </th>
                                  <th className="common_style">
                                    Total Allowance
                                  </th>
                                  <th className="common_style">Gross Salary</th>
                                  <th className="common_style"> 5% Nassit</th>
                                  <th className="common_style">
                                    Non Taxable Pay
                                  </th>
                                  <th className="common_style">Taxable Pay</th>
                                  <th className="common_style">Paye</th>
                                  <th className="common_style">
                                    Total Deduction{" "}
                                  </th>
                                  <th className="common_style">Net Salary</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="common_style">
                                    {salary.Basic_pay}
                                  </td>
                                  <td className="common_style">
                                    {salary.total_Allowance}
                                  </td>
                                  <td className="common_style">
                                    {salary.gross_salary}
                                  </td>
                                  <td className="common_style">
                                    {salary.nassit}
                                  </td>
                                  <td className="common_style">
                                    {salary.non_taxable_pay}
                                  </td>
                                  <td className="common_style">
                                    {salary.taxable_pay}
                                  </td>
                                  <td className="common_style">
                                    {salary.PAYE}
                                  </td>
                                  <td className="common_style">
                                    {salary.total_deduction}
                                  </td>
                                  <td className="common_style">
                                    {salary.net_Salary}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                      <div className="subBtnLabour">
                        <button onClick={handleSalaryData}>Submit</button>
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BasicLabourTool;
