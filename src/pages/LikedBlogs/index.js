import React, { useEffect, useState } from "react";
import { Loading, Message } from "../../components";
import { likedBlogs } from "../../api";
import { useNavigate } from "react-router-dom";

// Sample Data for Blogs and their Authors

const LikedBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBlogs = async () => {
    try {
      const { data } = await likedBlogs();

      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (err) {
      console.log(err);
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
    <>
      {blogs.length ? (
        <div className="allBlgPg-page-container">
          {/* <h1>Liked Blogs</h1> */}
          <div className="allBlgPg-blogs-list">
            {blogs.map((blog) => (
              <div key={blog.blogId} className="allBlgPg-blog-card">
                <img
                  src={blog.blogDetails.image}
                  alt={blog.blogDetails.title}
                  className="allBlgPg-blog-image"
                  onClick={() => navigate(`/blog-details/${blog.blogId}`)}
                />
                <div
                  className="allBlgPg-blog-info"
                  onClick={() =>
                    navigate(
                      `/author-details/${blog.blogDetails.authorDetails._id}`
                    )
                  }
                >
                  <img
                    src={blog.blogDetails.authorDetails.avatar}
                    alt={blog.blogDetails.authorDetails.name}
                    className="allBlgPg-author-avatar"
                  />
                  <div className="allBlgPg-blog-text">
                    <h3 className="allBlgPg-blog-title">
                      {blog.blogDetails.title}
                    </h3>
                    <p className="allBlgPg-author-name">
                      By {blog.blogDetails.authorDetails.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Message message="You haven't liked any blogs yet." />
      )}
    </>
  );
};

export default LikedBlogs;
