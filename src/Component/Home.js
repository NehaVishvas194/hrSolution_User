import React from "react";
import Header from "./Header";
import HomeBanner from "./HomeBanner";
import Popular from "./Popular";
import RecentJobs from "./RecentJobs";
import NumberData from "./NumberData";
import CandidatesSay from "./CandidatesSay";
import GetStarted from "./GetStarted";
import Newsletters from "./Newsletters";
import NewsBlog from "./NewsBlog";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Home() {
  return (
    <>
      <Header />
      <HomeBanner />
      <Popular />
      <RecentJobs />
      <NumberData />
      <div id="candidates-say">
        <CandidatesSay />
      </div>
      <GetStarted />
      <Newsletters />
      <Footer />
      {/* <Footer/> */}
    </>
  );
}
