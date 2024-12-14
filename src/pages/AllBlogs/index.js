import React, { useEffect, useState } from "react";
import "./style.css"; 
import { Loading } from "../../components";
import { allBlogs } from "../../api";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      const { data } = await allBlogs();

      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (err) {
      console.error("Error getting all blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="allBlgPg-page-container">
     
      <div className="allBlgPg-blogs-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="allBlgPg-blog-card">
            <img
              src={blog.image}
              alt={blog.title}
              className="allBlgPg-blog-image"
              onClick={() => navigate(`/blog-details/${blog._id}`)}
            />
            <div
              className="allBlgPg-blog-info"
              onClick={() =>
                navigate(`/author-details/${blog.authorDetails._id}`)
              }
            >
              <img
                src={blog.authorDetails.avatar}
                alt={blog.authorDetails.name}
                className="allBlgPg-author-avatar"
              />
              <div className="allBlgPg-blog-text">
                <h3 className="allBlgPg-blog-title">{blog.title}</h3>
                <p className="allBlgPg-author-name">
                  By {blog.authorDetails.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
