import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS for styling
import { createComment, allComments } from "../../api";

const Comment = () => {
  const id = useParams().id; // Get the ID from the route parameters
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [newComment, setNewComment] = useState(""); // State for the new comment

  // Fetch all comments
  const getAllComments = async () => {
    try {
      const { data } = await allComments(id);

      if (data?.success) {
        setComments(data?.comments);
        setCommentsCount(data?.commentCount);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    getAllComments(); // Fetch comments when the component mounts
  }, []);

  // Handle the submission of a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (newComment.trim()) {
      try {
        const { data } = await createComment(id, { content: newComment }); // Call the createComment API
        if (data?.success) {
          setNewComment(""); // Clear the input field
          getAllComments(); // Re-fetch comments to update the list
        }
      } catch (err) {
        console.error("Error creating comment:", err);
      }
    }
  };

  return (
    <div className="comment-section">
      <h1 className="comments-header">{commentsCount} Comments</h1>
      {/* Comment submission form */}
      <div className="comment-form">
        <textarea
          className="comment-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="submit-comment-btn" onClick={handleCommentSubmit}>
          Submit
        </button>
      </div>

      <br />

      {/* Render comments */}
      {comments.map((comment) => (
        <div key={comment._id} className="comment">
          <img
            src={comment.user.avatar}
            alt={comment.user.name}
            className="comment-avatar"
            onClick={() => navigate(`/author-details/${comment.user._id}`)}
          />
          <div className="comment-content">
            <p
              className="comment-username"
              onClick={() => navigate(`/author-details/${comment.user._id}`)}
            >
              {comment.user.name}
            </p>
            <p className="comment-text">
              <pre> {comment.content} </pre>{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
