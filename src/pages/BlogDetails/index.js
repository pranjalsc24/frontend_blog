import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS for styling
import { Comment, Loading, PostHeader } from "../../components";
import { blog } from "../../api";

// Format the date to a readable format
const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: true,
  };
  return new Date(date).toLocaleString("en-US", options);
};

const BlogDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBlogDetails = async () => {
    try {
      const { data } = await blog(id);

      if (data?.success) {
        setBlogPost(data?.blog);
      }
    } catch (err) {
      console.log(err);

      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="blgdtls-container">
        <img
          src={blogPost.image}
          alt={blogPost.title}
          className="blgdtls-image"
        />
        <h1>{blogPost.title}</h1>
        <br />
        <div className="blgdtls-author-time-container">
          {/* <div className="blgdtls-author-container">
            <img
              src={blogPost.authorDetails.avatar}
              alt={blogPost.authorDetails.name}
              className="blgdtls-author-image"
            />
            <p className="blgdtls-author">{blogPost.authorDetails.name}</p>
          </div> */}
          <p className="blgdtls-date-time">{formatDate(blogPost.createdAt)}</p>
        </div>
        <div className="blgdtls-content">
          <p>
            <pre>{blogPost.description}</pre>
          </p>
        </div>
      </div>
      <PostHeader />
      <Comment />
    </>
  );
};

export default BlogDetails;
