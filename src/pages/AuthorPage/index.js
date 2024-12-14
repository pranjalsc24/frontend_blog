import React, { useEffect, useState } from "react";
import "./style.css"; // Import the CSS for styling
import { Loading } from "../../components";
import { allAuthors } from "../../api";
import { useNavigate } from "react-router-dom";

// Sample Data for Authors and their Blogs

const AuthorPage = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAuthors = async () => {
    try {
      const { data } = await allAuthors();

      if (data?.success) {
        setAuthors(data?.authors);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAuthors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="authorpg-page-container">
      {/* <h1>Authors</h1> */}
      <div className="authorpg-list">
        {authors.map((author) => (
          <div
            key={author._id}
            className="authorpg-card"
            onClick={() => navigate(`/author-details/${author._id}`)}
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="authorpg-avatar"
            />
            <div className="authorpg-details">
              <h3 className="authorpg-name">{author.name}</h3>
              <p className="authorpg-blog-count">
                Total Blogs: {author.blogCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorPage;
