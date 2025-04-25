import React, { useEffect, useState } from "react";
import blogImage from "../Image/blogcard2.webp";
import blogcard from "../Image/blogcard3.png";

import bannerHome2 from "../Image/blog.jpg";
import bannerBlog from "../Image/bannerBlog.jpg";
import Banner from "../Image/onlineCourse.jpg";
import Header from "./Header";
import Footer from "./Footer";
import { baseUrl } from "../Api/BaseUrl";
import axios from "axios";
import { common } from "@mui/material/colors";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const handelBlogData = () => {
    axios
      .get(`${baseUrl}getBlogDetails`)
      .then((response) => {
        console.log(response.data.Blogs);
        setBlog(response.data.Blogs);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handelBlogData();
  }, []);
  const renderHTML = (html) => {
    return { __html: html };
  };
  return (
    <>
      <Header />
      {/* nav end */}
      <section
        className="gridBanner"
        style={{ backgroundImage: `url(${bannerHome2})` }}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2>Blog </h2>
              <p className="mt-2">Insights and Updates from the HR World.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="blogCardSec">
        <div className="container my-0">
          <div className="row">
            {blog.map((info) => (
              <div className="col-lg-4  col-md-6 col-sm-6 pe-3">
                <div className="cardBlog">
                  <div className="blogCardImg">
                    <img
                      src={"https://sisccltd.com/hrsolutions/" + info.photo}
                      alt=""
                    />
                  </div>
                  <small
                    className="postBlog"
                    dangerouslySetInnerHTML={renderHTML(info.name)}
                  ></small>
                  <div className="contentBlogCard flex-grow-1">
                    <h5
                      dangerouslySetInnerHTML={renderHTML(info?.Heading)}
                    ></h5>
                    <p
                      dangerouslySetInnerHTML={renderHTML(
                        info?.Description?.length > 20
                          ? `${info?.Description?.substring(0, 100)}...`
                          : info?.Description
                      )}
                    ></p>
                  </div>
                  <div className="bannerBtnHome position-relative">
                    <Link
                      to="/BlogDetails"
                      state={{ data: blog, id: info._id }}
                    >
                      <button> Read More </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}