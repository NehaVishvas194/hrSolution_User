// // // import React, { useRef, useEffect, useState } from 'react';
// // // import grilsMob from '../Image/candi1.jpg';
// // // import womenFile from '../Image/candi2.jpg';
// // // import greenWomen from '../Image/candi3.jpg';
// // // import men2 from '../Image/candi4.jpeg';
// // // import 'flickity/dist/flickity.min.css'; // Import Flickity CSS
// // // import { baseUrl } from '../Api/BaseUrl';
// // // import axios from 'axios';

// // // export default function CandidatesSay() {
// // //   const [testimonial, settestimonial] = useState([])
// // //   useEffect(() => {
// // //     initFlickity();
// // //   }, []);

// // //   const flickityRef = useRef(null);

// // //   async function initFlickity() {
// // //     if (typeof window !== 'undefined' && flickityRef.current) {
// // //       const Flickity = (await import('flickity')).default;
// // //       new Flickity(flickityRef.current, {
// // //         contain: true, // Ensure only one slide is visible and centered
// // //         lazyLoad: true,
// // //         wrapAround: true,
// // //         autoPlay: true,
// // //         pageDots: true,
// // //         freeScroll: true,
// // //         prevNextButtons: false
// // //       });
// // //     }
// // //   }
// // //   const handleTestimonial = () => {
// // //     axios.get(`${baseUrl}getAll_testimonial`).then((response) => {
// // //       console.log(response.data.Details)
// // //       settestimonial(response.data.Details)
// // //     }).catch((error) => {
// // //       console.log(error)
// // //     })
// // //   }
// // //   useEffect(() => {
// // //     handleTestimonial()
// // //   }, [])

// // //   return (
// // //     <div className="testimonial-area grey-bg pt-80 pb-80 fix">
// // //       <div className="container">
// // //         <div className="row  wow fadeInDown">
// // //           <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
// // //             <div className="section-title text-center ml-50 mr-50 mb-45">
// // //               <h2>What Our Candidates Say</h2>
// // //               <p>
// // //                 Discover the voices of success! Our candidates speak for themselves
// // //                 about their transformative experiences
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="row  wow fadeInDown">
// // //           <div className="col-xl-5 col-lg-5">
// // //             <div className="candidateLeft">
// // //               <div className="clientPrent">
// // //                 <div className="manRed">
// // //                   <img src={grilsMob} alt="" />
// // //                 </div>
// // //                 <div className="manMaroon">
// // //                   <img src={womenFile} alt="" />
// // //                 </div>
// // //               </div>
// // //               <div className="clientPrent">
// // //                 <div className="grilGreen">
// // //                   <img src={greenWomen} alt="" />
// // //                 </div>
// // //                 <div className="manGreen">
// // //                   <img src={men2} alt="" />
// // //                 </div>
// // //               </div>
// // //               <div className="satisfyBoll">
// // //                 <i className="fi fi-rr-quote-right" />
// // //                 <h6>25K Satisfy Clients </h6>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="testimonialRight col-lg-7">
// // //             <div className=" ">
// // //               <div className="container">
// // //                 <div className="row">
// // //                   <div className="col-md-12">
// // //                     {
// // //                       testimonial && testimonial.length>0 && testimonial.map((item,index)=>{
// // //                         return(
// // //                           <>
// // //                           <div id="carousel" key={index} className="owl-carousel" data-flickity='{"groupCells": true }' ref={flickityRef}>
// // //                       <div class="carousel-cell testimonial" >
// // //                         <h3 class="title">{item.username}
// // //                           <span class="post ms-2">{item?.title}</span>
// // //                         </h3>
// // //                         <p class="description">
// // //                         {item?.Description}
// // //                         </p>
// // //                       </div>

// // //                     </div>
// // //                           </>
// // //                         )
// // //                       })
// // //                     }

// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useRef, useEffect, useState } from 'react';
// // import grilsMob from '../Image/candi1.jpg';
// // import womenFile from '../Image/candi2.jpg';
// // import greenWomen from '../Image/candi3.jpg';
// // import men2 from '../Image/candi4.jpeg';
// // import 'flickity/dist/flickity.min.css'; // Import Flickity CSS
// // import { baseUrl } from '../Api/BaseUrl';
// // import axios from 'axios';

// // export default function CandidatesSay() {
// //   const [testimonial, settestimonial] = useState([]);
// //   const flickityRef = useRef(null);

// //   useEffect(() => {
// //     initFlickity();
// //   }, [testimonial]);

// //   async function initFlickity() {
// //     if (typeof window !== 'undefined' && flickityRef.current) {
// //       const Flickity = (await import('flickity')).default;
// //       new Flickity(flickityRef.current, {
// //         contain: true,
// //         lazyLoad: true,
// //         wrapAround: true,
// //         autoPlay: true,
// //         pageDots: true,
// //         freeScroll: false,
// //         prevNextButtons: false,
// //         cellAlign: 'left',
// //         groupCells: 1
// //       });
// //     }
// //   }

// //   const handleTestimonial = () => {
// //     axios.get(`${baseUrl}getAll_testimonial`).then((response) => {
// //       console.log(response.data.Details);
// //       settestimonial(response.data.Details);
// //     }).catch((error) => {
// //       console.log(error);
// //     });
// //   }

// //   useEffect(() => {
// //     handleTestimonial();
// //   }, []);

// //   return (
// //     <div className="testimonial-area grey-bg pt-80 pb-80 fix">
// //       <div className="container">
// //         <div className="row  wow fadeInDown">
// //           <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
// //             <div className="section-title text-center ml-50 mr-50 mb-45">
// //               <h2>What Our Candidates Say</h2>
// //               <p>
// //                 Discover the voices of success! Our candidates speak for themselves
// //                 about their transformative experiences.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="row  wow fadeInDown">
// //           <div className="col-xl-5 col-lg-5">
// //             <div className="candidateLeft">
// //               <div className="clientPrent">
// //                 <div className="manRed">
// //                   <img src={grilsMob} alt="" />
// //                 </div>
// //                 <div className="manMaroon">
// //                   <img src={womenFile} alt="" />
// //                 </div>
// //               </div>
// //               <div className="clientPrent">
// //                 <div className="grilGreen">
// //                   <img src={greenWomen} alt="" />
// //                 </div>
// //                 <div className="manGreen">
// //                   <img src={men2} alt="" />
// //                 </div>
// //               </div>
// //               <div className="satisfyBoll">
// //                 <i className="fi fi-rr-quote-right" />
// //                 <h6>25K Satisfy Clients </h6>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="testimonialRight col-lg-7">
// //             <div className=" ">
// //               <div className="container">
// //                 <div className="row">
// //                   <div className="col-md-12">

// //                     {/* <div className="carousel" ref={flickityRef}>
// //                       {
// //                         testimonial && testimonial.length > 0 && testimonial.map((item, index) => (
// //                           <div key={index} className="carousel-cell testimonial">
// //                             <h3 className="title">{item.username}
// //                               <span className="post ms-2">{item?.title}</span>
// //                             </h3>
// //                             <p className="description">
// //                               {item?.Description}
// //                             </p>
// //                           </div>
// //                         ))
// //                       }
// //                     </div> */}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useRef, useEffect, useState } from 'react';
// import grilsMob from '../Image/candi1.jpg';
// import womenFile from '../Image/candi2.jpg';
// import greenWomen from '../Image/candi3.jpg';
// import men2 from '../Image/candi4.jpeg';
// import 'flickity/dist/flickity.min.css'; // Import Flickity CSS
// import { baseUrl } from '../Api/BaseUrl';
// import axios from 'axios';

// export default function CandidatesSay() {
//   const [testimonial, settestimonial] = useState([]);
//   const flickityRef = useRef(null);

//   useEffect(() => {
//     handleTestimonial();
//   }, []);

//   useEffect(() => {
//     initFlickity();
//   }, [testimonial]);

//   async function initFlickity() {
//     if (typeof window !== 'undefined' && flickityRef.current) {
//       const Flickity = (await import('flickity')).default;
//       new Flickity(flickityRef.current, {
//         contain: true,
//         lazyLoad: true,
//         wrapAround: true,
//         autoPlay: true,
//         pageDots: true,
//         freeScroll: true,
//         prevNextButtons: false,
//         cellAlign: 'left',
//         groupCells: 1,
//         imagesLoaded: true // Ensuring images are loaded before Flickity initializes
//       });
//     }
//   }

//   const handleTestimonial = () => {
//     axios.get(`${baseUrl}getAll_testimonial`).then((response) => {
//       console.log(response.data.Details);
//       settestimonial(response.data.Details);
//     }).catch((error) => {
//       console.log(error);
//     });
//   }

//   return (
//     <div className="testimonial-area grey-bg pt-80 pb-80 fix">
//       <div className="container">
//         <div className="row wow fadeInDown">
//           <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
//             <div className="section-title text-center ml-50 mr-50 mb-45">
//               <h2>What Our Candidates Say</h2>
//               <p>
//                 Discover the voices of success! Our candidates speak for themselves
//                 about their transformative experiences.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="row wow fadeInDown">
//           <div className="col-xl-5 col-lg-5">
//             <div className="candidateLeft">
//               <div className="clientPrent">
//                 <div className="manRed">
//                   <img src={grilsMob} alt="" />
//                 </div>
//                 <div className="manMaroon">
//                   <img src={womenFile} alt="" />
//                 </div>
//               </div>
//               <div className="clientPrent">
//                 <div className="grilGreen">
//                   <img src={greenWomen} alt="" />
//                 </div>
//                 <div className="manGreen">
//                   <img src={men2} alt="" />
//                 </div>
//               </div>
//               <div className="satisfyBoll">
//                 <i className="fi fi-rr-quote-right" />
//                 <h6>25K Satisfy Clients</h6>
//               </div>
//             </div>
//           </div>
//           <div className="testimonialRight col-lg-7">
//             <div className="">
//               <div className="container">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="main-carousel" ref={flickityRef}>
//                       {testimonial && testimonial.length > 0 && testimonial.map((item, index) => (
//                         <div key={index} className="carousel-cell testimonial">
//                           <h3 className="title">{item.username}
//                             <span className="post ms-2">{item?.title}</span>
//                           </h3>
//                           <p className="description">
//                             {item?.Description}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useRef, useEffect, useState } from "react";
import grilsMob from "../Image/candi1.jpg";
import womenFile from "../Image/candi2.jpg";
import greenWomen from "../Image/candi3.jpg";
import men2 from "../Image/candi4.jpeg";
import "flickity/dist/flickity.min.css"; // Import Flickity CSS
import { baseUrl } from "../Api/BaseUrl";
import axios from "axios";

export default function CandidatesSay() {
  const [testimonial, setTestimonial] = useState([]);
  const flickityRef = useRef(null);

  useEffect(() => {
    handleTestimonial();
  }, []);

  useEffect(() => {
    if (testimonial.length > 0) {
      initFlickity();
    }
  }, [testimonial]);

  const handleTestimonial = () => {
    axios
      .get(`${baseUrl}getAll_testimonial`)
      .then((response) => {
        console.log(response.data.Details);
        setTestimonial(response.data.Details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function initFlickity() {
    if (typeof window !== "undefined" && flickityRef.current) {
      const Flickity = (await import("flickity")).default;
      new Flickity(flickityRef.current, {
        contain: true,
        lazyLoad: true,
        wrapAround: true,
        autoPlay: true,
        pageDots: true,
        freeScroll: true,
        prevNextButtons: false,
        cellAlign: "left",
        groupCells: 1,
        imagesLoaded: true, // Ensuring images are loaded before Flickity initializes
      });
    }
  }

  return (
    <div
      className="testimonial-area grey-bg pt-80 pb-80 fix"
      id="candidate-say"
    >
      <div className="container">
        <div className="row wow fadeInDown">
          <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
            <div className="section-title text-center ml-50 mr-50 mb-45">
              <h2>What Our Candidates Say</h2>
              <p>
                Discover the voices of success! Our candidates speak for
                themselves about their transformative experiences.
              </p>
            </div>
          </div>
        </div>
        <div className="row wow fadeInDown">
          <div className="col-xl-5 col-lg-5">
            <div className="candidateLeft">
              <div className="clientPrent">
                <div className="manRed">
                  <img src={grilsMob} alt="" />
                </div>
                <div className="manMaroon">
                  <img src={womenFile} alt="" />
                </div>
              </div>
              <div className="clientPrent">
                <div className="grilGreen">
                  <img src={greenWomen} alt="" />
                </div>
                <div className="manGreen">
                  <img src={men2} alt="" />
                </div>
              </div>
              <div className="satisfyBoll">
                <i className="fi fi-rr-quote-right" />
                <h6>10 Clients Satisfied</h6>
              </div>
            </div>
          </div>
          <div className="testimonialRight col-lg-7">
            <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="main-carousel" ref={flickityRef}>
                      {testimonial.length > 0 &&
                        testimonial.map((item, index) => (
                          <div
                            key={index}
                            className="carousel-cell testimonial"
                          >
                            <h3 className="title">
                              {item.username}
                              <span className="post ms-2">{item?.title}</span>
                            </h3>
                            <p className="description">{item?.Description}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
