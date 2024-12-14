import React, { useState, useRef } from "react";
import "./style.css"; // CSS for styling
import toast from "react-hot-toast";
import { createBlog } from "../../api";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("img", image);

    try {
      const res = await createBlog(formData);

      if (res.data?.success) {
        toast.success("Blog created successfully!");
        navigate("/your-blogs");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response.data.message);
    } finally {
      setTitle("");
      setDescription("");
      setImage(null);
      fileInputRef.current.value = ""; // Clear file input
    }
  };

  return (
    <div className="crte-blg-create-blog">
      <div className="crte-blg-header">
        <h2>Create New Blog</h2>
      </div>
      <form onSubmit={handleFormSubmit} className="crte-blg-blog-form">
        {/* Title Input */}
        <div className="crte-blg-form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />

        {/* Description Input */}
        <div className="crte-blg-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />

        {/* Image Input (Optional) */}
        <div className="crte-blg-form-group">
          <label htmlFor="image">Upload Image (Optional)</label>
          <input
            type="file"
            id="img"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="crte-blg-image-input"
          />
        </div>

        <button type="submit" className="crte-blg-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
