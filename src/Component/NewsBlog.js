import React from 'react'
import Blog1 from '../Image/news1.jpg'
import Blog2 from '../Image/news2.jpg'
import Blog3 from '../Image/news1.jpg'
import { baseUrl } from '../Api/BaseUrl'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function NewsBlog() {
  const [header, setHeader] = useState([])
  const [blog, setBlog] = useState([])
  const handelHeaderData = () => {
    axios.get(`${baseUrl}getcmsBlog_section1`).then((respons) => {
      console.log(respons.data.Details)
      setHeader(respons.data.Details)
    }).catch((error) => {
      console.log(error)
    })
  }
  const hangelBlogdata = () => {
    axios.get(`${baseUrl}getBlogDetails`).then((respons) => {
      console.log(respons.data.Blogs)
      setBlog(respons.data.Blogs)
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    handelHeaderData()
    hangelBlogdata()
  }, [])
  return (
    <>
      <div className="blog__area-2 pt-75 pb-50">
        <div className="container">
          <div className="row wow fadeInDown">
            <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-10 offset-md-1">
              {header.map((info) => (
                <div className="section-title text-center mb-45">
                  <h2>{info.Heading}</h2>
                  <p>
                    {info.Description}
                  </p>
                </div>

              ))}

            </div>
          </div>
          <div className="row wow fadeInDown">
            {blog.map((info) => (
              <div className="col-xl-4 col-md-6">
                <div className="blog__item-2 mb-30 ">
                  <div className="blog__thumb fix">
                    <a href="/blog-details/1">
                      <img src={`http://13.51.205.211:4101/${info.photo}`} />
                    </a>
                  </div>
                  <div className="blog__content-2">
                    <div className="blog__date text-center">
                      <h4> 20 </h4>
                      <span> Jan </span>
                    </div>
                    <div className="blog__meta blog__meta-2">
                      <span>
                        <i className="fi fi-rr-circle-user" />
                        <a href="#">{info.name}</a>
                      </span>
                      <span>
                        <i className="fi fi-rr-comment" />
                        <a href="#">Com (05)</a>
                      </span>
                    </div>
                    <h4>
                      <a href="/blog-details/1">{info.Heading}</a>
                    </h4>
                    <p>
                      {info.Description}
                    </p>
                    <a className="b-btn b-btn-grey" href="/blog-details/1">
                      Read More <i className="ffi fi-sr-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>

  )
}
