import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./style.css"; // Import your CSS
import { allLikes, addLike, removeLike } from "../../api"; // Add removeLike and addLike API calls
import { useNavigate } from "react-router-dom";

const PostHeader = () => {
  const { id } = useParams(); // Get the ID from the route parameters
  const navigate = useNavigate();

  const [likeData, setLikeData] = useState({ likeCount: 0, userLiked: false }); // State for like-related properties
  const [author, setAuthor] = useState({});

  // Fetch like data and set state
  const fetchLikeData = async () => {
    try {
      const { data } = await allLikes(id); // Replace with your API call
      if (data?.success) {
        const { authorDetails, likeCount, userLiked } = data.result;
        setAuthor(authorDetails);
        setLikeData({ likeCount, userLiked });
      }
    } catch (error) {
      console.error("Error fetching like data:", error);
    }
  };

  // Fetch like data on mount
  useEffect(() => {
    fetchLikeData();
  }, [id]); // Re-run when `id` changes

  // Handle Like/Unlike button click
  const handleLikeToggle = async () => {
    try {
      const { data } = likeData.userLiked
        ? await removeLike(id)
        : await addLike(id);
      if (data?.success) {
        fetchLikeData();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL copied!");
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  return (
    <div className="post-header">
      <div
        className="post-header-left"
        onClick={() => navigate(`/author-details/${author._id}`)}
      >
        <img
          src={author.avatar}
          alt={author.name}
          className="post-header-avatar"
        />
        <p className="post-header-name">{author.name}</p>
      </div>
      <div className="post-header-right">
        <button
          className={`post-header-like ${likeData.userLiked ? "liked" : ""}`}
          onClick={handleLikeToggle}
        >
          👍{" "}
          <span className="post-header-like-count">{likeData.likeCount}</span>
        </button>
        <button className="post-header-share" onClick={handleShareClick}>
          🔗 <span>Share</span>
        </button>
        <button className="post-header-comment">
          💬 <span>Comment</span>
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
