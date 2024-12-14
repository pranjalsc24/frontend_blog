import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS for styling
import { Loading, Message } from "../../components";
import { author } from "../../api";

const AuthorDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [length, setlength] = useState(0);
  const [loading, setLoading] = useState(true);

  const getAuthorDetails = async () => {
    try {
      const { data } = await author(id);

      if (data?.success) {
        setBlogs(data?.author?.blogs);
        setAuthorName(data?.author?.name);
        setAuthorAvatar(data?.author?.avatar);
        setlength(data?.author?.blogCount);
      }
    } catch (err) {
      console.log(err);

      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthorDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="allBlgPg-page-container">
      <div className="autr-dtls-author-info">
        <img
          src={authorAvatar}
          alt={authorName}
          className="autr-dtls-author-avatar"
        />
        <div className="autr-dtls-author-details">
          <h2>{authorName}</h2>
          <p>{length} Blogs</p>
        </div>
      </div>

      {/* <h1>All Blogs</h1> */}

      {length ? (
        <div className="allBlgPg-blogs-list">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="allBlgPg-blog-card"
              onClick={() => navigate(`/blog-details/${blog._id}`)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="allBlgPg-blog-image"
              />
              <div className="allBlgPg-blog-info">
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="allBlgPg-author-avatar"
                />
                <div className="allBlgPg-blog-text">
                  <h3 className="allBlgPg-blog-title">{blog.title}</h3>
                  <p className="allBlgPg-author-name">By {authorName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Message message="Author hasn't created any blog yet." />
      )}
    </div>
  );
};

export default AuthorDetails;
