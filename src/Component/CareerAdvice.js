import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from './Header'
import Footer from './Footer'
import bgimg from '../Image/humenwithhamer.jpg'
import candidatesimg from '../Image/logo.jpg'
import axios from "axios";
import { baseUrl } from "../Api/BaseUrl";


const CareerAdvice = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const bannercss = { backgroundImage: `url(${bgimg})` };
  const [traning, setTraning] = useState([]);

  const handleGetTraning = () => {
    axios
      .get(`${baseUrl}all_carrer_details`)
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
    <div>
      <Header />
      <section>
        <div className='Page_title' style={bannercss}>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <h2>Career Advice</h2>
                <p className="fs-6" style={{ "color": "white" }}>The Right Career Tips to Take You Further.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Slider {...settings}>
        <div className="careerSlider my-4">
          <div className="container">
            <div className="row">
              {traning.map((info) => (
                <div className="col-md-4">
                  <div className="careerSlider_inner">
                    <div className="careerSlider_inner_img">
                      <img src={"https://sisccltd.com/hrsolutions/" + info.image} alt="career img" />
                    </div>
                    <div className="careerSlider_inner_content">
                      <img src={candidatesimg} />
                      <h5>{info.Heading}</h5>
                      <h5>{info.Description}</h5>
                      {/* <h4 className="heading3" dangerouslySetInnerHTML={renderHTML(info.Description)}>fsdfgdgfh</h4> */}
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slider>
      <Footer />
    </div>
  )
}

export default CareerAdvice