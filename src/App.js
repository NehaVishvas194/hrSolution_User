import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import SignUp from "./HRComponent/Signup/SignUp";
import SignUpNext from "./HRComponent/Signup/SignUpNext";
import Signin from "./HRComponent/Signup/Signin";
import Protected from "./DashboardHR/Protected";
import Main from "./DashboardHR/SideBar";
import Dashboard from "./DashboardHR/Pages/Dashboard";
import GetAllJobs from "./DashboardHR/Pages/GetAllJobs";
import AddNewJob from "./DashboardHR/Pages/AddNewJob";
import NextAddJob from "./DashboardHR/Pages/NextAddJob";
import JobDetailEmp from "./DashboardHR/Pages/JobDetailEmp";
import Profile from "./DashboardHR/Pages/Profile/Profile";
import ChangePassword from "./DashboardHR/Pages/Profile/ChangePassword";
import JobDescription from "./DashboardHR/Pages/privacy & Policy Section/JobDescription";
import TearmCandition from "./DashboardHR/Pages/privacy & Policy Section/TearmCandition";
import JobDetailFemale from "./DashboardHR/Pages/JobDetailFemale";
import Services from "./Component/Services";
import ContentAs from "./Component/ContentAs";
import Blog from "./Component/Blog";
import ForgetPassword from "./DashboardHR/Pages/Profile/ForgetPassword";
import Home_Campany from "./HRComponent/Company/Home_Campany";
import TermCondition from "./Component/smartstartServices/TermCondition";
import GetOtpPage from "./DashboardHR/Pages/Profile/GetOtpPage";
import ResetPasswordPage from "./DashboardHR/Pages/Profile/ResetPasswordPage";
import PrivacyPolicy from "./Component/smartstartServices/PrivacyPolicy";
import MultistepForm from "./Component/MultistepForm";
// import PsychometricTest from './Component/PsychometricTest';
import FindJobPage from "./Component/FindJobPage";
import JobDetailpageTem from "./Component/JobDetailpageTem";
import AllJobs from "./Component/AllJobs";
import AboutUs from "./Component/AboutUs";
import AddJobDescription from "./DashboardHR/Pages/privacy & Policy Section/AddJobDescription";
import JobTital from "./DashboardHR/Pages/JobTital/JobTital";
import ShortJobTemp from "./Component/ShortJobTemp";
import JobDetailpage from "./Component/JobDetailpage";
import FixitFinder from "./Component/FixitFinder";
import HrConsultancy from "./Component/HrConsultancy";
import TraininhDev from "./Component/TraininhDev";
import Teleconsult from "./Component/Teleconsult";
import BasicLabourTool from "./Component/BasicLabourTool";
import OnlineCourses from "./Component/OnlineCourses";
import Vacancy from "./Component/Vacancy";
import EliteFemale from "./Component/EliteFemale";
import AcadmicCredintial from "./Component/AcadmicCredintial";
import SuccessfulCandidates from "./Component/SuccessfulCandidates";
import CareerAdvice from "./Component/CareerAdvice";
import UploadResume from "./Component/UploadResume";
import ClientPortfolio from "./Component/ClientPortfolio";
import GetAll_candidates from "./Component/GetAll_candidates";
import BlogDetails from "./Component/BlogDetails";
import ReadOnline from "./Component/ReadOnline";
import ReadOnlineTwo from "./Component/ReadOnlineTwo";
import ScrollToTop from "./Component/ScrollToTop";
import QuiceJob from "./Component/QuiceJob";
import Client_Pagedata from "./HRComponent/Company/Client_Pagedata";
import SkillOfJobTitle from "./DashboardHR/Pages/SkillOfJobTitle";
import Psychopersonal_ability from "./Component/Psychopersonal_ability";
import { MyContext } from "./MyContext";
import { useState } from "react";
import Candidate from "./DashboardHR/Pages/privacy & Policy Section/Candidate";
// import ResumeTemplate from '../src/Component/ResumeTemplate'
import CourseDetail from "./Component/CourseDetail";
import CVBuilder from "./Component/CVBuilder";
import CandidateDetail from "./DashboardHR/Pages/privacy & Policy Section/CandidateDetail";
// import ResumeTemplate from './Component/ResumeTemplate';
// import SubscribeUser from './Component/SubscribeUser'
import UserLogin from "./Component/UserLogin/UserLogin";
import UserSign from "./Component/UserLogin/UserSign";
import MyCourses from "./Component/UserLogin/MyCourses";
import MyCourseDetail from "./Component/UserLogin/MyCourseDetail";
import UserProfile from "./Component/UserLogin/UserProfile";
import CancelPage from "./Component/MonimePayment/CancelPage";
import SuccessPage from "./Component/MonimePayment/SuccessPage";
import Certificate from "./Component/UserLogin/Certificate";
import Report from "./DashboardHR/ReportClient/Report";
import Selectpackeg from "./HRComponent/Signup/Selectpackeg";
import Success from "./Component/MonimePayment/Success";
import FemaleTelentPool from "./DashboardHR/Pages/FemaleTelentPool";
import CancelPackege from "./Component/MonimePayment/CancelPackege";
import CandidatesSay from "./Component/CandidatesSay";
import Register from "./HRComponent/Signup/Register";
import OurClients from "./Component/OurClients";
// import ChooseTemplate from './Component/ChooseTemplate';
// import Psychometric from './DashboardHR/Psychometric/Psychometric';
// import TestCategery from './DashboardHR/Psychometric/TestCategery';

function App() {
  console.log("date:-06-05-2025 time:-02:10");
  const [text, setText] = useState("");
  return (
    <div className="App">
      {/* <AnimaCarsor></AnimaCarsor> */}
      <ScrollToTop />
      <MyContext.Provider value={{ text, setText }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/SignUp" element={<SignUp />} /> */}
          <Route path="/SignUp" element={<Register />} />
          <Route path="/Package" element={<Selectpackeg />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/ContentAs" element={<ContentAs />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Client" element={<Home_Campany />} />
          <Route path="/TermCondition" element={<TermCondition />} />
          <Route path="/findjobpage" element={<FindJobPage />} />
          {/* <Route path="/templates" element={<ResumeTemplate />} /> */}
          {/* <Route path="/choosetemplate" element={<ChooseTemplate />} /> */}
          <Route path="/GetOtpPage" element={<GetOtpPage />} />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
          <Route path="/JobDetailpageTem" element={<JobDetailpageTem />} />
          <Route path="/JobDetailpage" element={<JobDetailpage />} />
          <Route path="/multistepform" element={<MultistepForm />} />
          {/* <Route path="/PsychometricTest" element={<PsychometricTest />} /> */}
          <Route path="/showjobs" element={<AllJobs />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/testimonial" element={<CandidatesSay />} /> */}
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/shortjobtemp" element={<ShortJobTemp />} />
          <Route path="fixitfinder" element={<FixitFinder />} />
          <Route path="hrconsultancy" element={<HrConsultancy />} />
          <Route path="teleconsult" element={<Teleconsult />} />
          <Route path="basiclabourtool" element={<BasicLabourTool />} />
          <Route path="traingdev" element={<TraininhDev />} />
          <Route path="onlinecourse" element={<OnlineCourses />} />
          <Route path="Vacancy" element={<Vacancy />} />
          <Route path="EliteFemale" element={<EliteFemale />} />
          <Route path="AcadmicCredintial" element={<AcadmicCredintial />} />
          <Route
            path="SuccessfulCandidates"
            element={<SuccessfulCandidates />}
          />
          <Route path="CareerAdvice" element={<CareerAdvice />} />
          <Route path="UploadResume" element={<UploadResume />} />
          <Route path="ClientPortfolio" element={<ClientPortfolio />} />
          <Route path="ourClients" element={<OurClients />} />
          {/* <Route path="GetAll_candidates" element={<GetAll_candidates />} /> */}
          <Route path="BlogDetails" element={<BlogDetails />} />
          <Route path="ReadOnline" element={<ReadOnline />} />
          <Route path="ReadOnlineTwo" element={<ReadOnlineTwo />} />
          <Route path="QuiceJob" element={<QuiceJob />} />
          <Route path="Client_Pagedata" element={<Client_Pagedata />} />
          <Route path="personalability" element={<Psychopersonal_ability />} />
          <Route path="CourseDetail" element={<CourseDetail />} />
          <Route path="CVBuilder" element={<CVBuilder />} />
          {/* <Route path="SubscribeUser" element={<SubscribeUser />} /> */}
          <Route path="login" element={<UserLogin />} />
          <Route path="UserSign" element={<UserSign />} />
          <Route path="Courses" element={<MyCourses />} />
          <Route path="MyCourseDetail" element={<MyCourseDetail />} />
          <Route path="Profile" element={<UserProfile />} />
          <Route path="Cancel" element={<CancelPage />} />
          <Route path="SuccessPage" element={<SuccessPage />} />
          <Route path="Success-Paymet" element={<Success />} />
          <Route path="Certificate" element={<Certificate />} />
          <Route path="cancel-package" element={<CancelPackege />} />
          <Route path="/admin" element={<Protected Component={Main} />}>
            <Route index element={<Dashboard />} />
            <Route path="GetAllJobs" element={<GetAllJobs />} />
            <Route path="AddNewJob" element={<AddNewJob />} />
            <Route path="NextAddJob" element={<NextAddJob />} />
            <Route path="JobDetailEmp" element={<JobDetailEmp />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ChangePassword" element={<ChangePassword />} />
            <Route path="jobDescription" element={<JobDescription />} />
            <Route path="AddJobDescription" element={<AddJobDescription />} />
            <Route path="SkillOfJobTitle" element={<SkillOfJobTitle />} />
            <Route path="JobTital" element={<JobTital />} />
            <Route path="Candidate" element={<Candidate />} />
            <Route path="CandidateDetail" element={<CandidateDetail />} />
            <Route path="Report" element={<Report />} />
            <Route path="FemaleTelentPool" element={<FemaleTelentPool />} />
            {/* <Route path="Psychometric" element={<Psychometric />} />
            <Route path="TestCategery" element={<TestCategery />} /> */}
            {/* <Route path="TearmCandition" element={<PrivacyPolicy />} /> */}
            <Route path="JobDetailFemale" element={<JobDetailFemale />} />
          </Route>
        </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
