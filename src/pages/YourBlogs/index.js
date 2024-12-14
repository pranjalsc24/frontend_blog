import React, { useEffect, useState } from "react";
import { Loading, Message } from "../../components";
import { yourBlogs } from "../../api";
import { useNavigate } from "react-router-dom";

const YourBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  const getAuthorDetails = async () => {
    try {
      const { data } = await yourBlogs();

      if (data?.success) {
        setBlogs(data?.author?.blogs);
        setAuthorId(data?.author?._id);
        setAuthorName(data?.author?.name);
        setAuthorAvatar(data?.author?.avatar);
      }
    } catch (err) {
      console.log(err);
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
    <>
      {blogs.length ? (
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
                  onClick={() => navigate(`/author-details/${authorId}`)}
                >
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
        </div>
      ) : (
        <Message message="You haven't created any blogs yet." />
      )}
    </>
  );
};

export default YourBlogs;
