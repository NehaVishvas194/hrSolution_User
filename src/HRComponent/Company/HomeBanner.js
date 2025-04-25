import React from 'react';
import dotted from '../Image/dotted.png';
import Girl from '../../Image/Girl2.png';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Api/BaseUrl';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function HomeBanner() {
  const [homedata, setHomeData] = useState("");

  const handleMarketData = () => {
    axios.get(`${baseUrl}get_cms_Home`)
      .then((res) => {
        console.log(res.data.Details);
        setHomeData(res.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleMarketData();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <>
      <section className="homeBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 wow slideInLeft">
              <div className="contentHomeBanner d-flex align-items-center h-100">
                <div>
                  <h2>

                    <span dangerouslySetInnerHTML={renderHTML(homedata.Description)}></span>
                    <div className="hero-dot-shape">
                      <img src={dotted} alt="" />
                    </div>
                  </h2>
                  <div>
                    <Link to="/SignUp">
                      <button className='find_button2 postjobbtn'>
                        Post your job*
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 wow slideInRight">
              <div className="bannerImg">
                <img src={Girl} alt="Girl" />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-shape d-none d-lg-block">
          <span className="circle" />
          <span className="circle circle-yellow" />
          <span className="shape-plus">+</span>
        </div>
      </section>
    </>
  );
}
