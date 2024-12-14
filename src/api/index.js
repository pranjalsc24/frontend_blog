import axios from "axios";
import toast from "react-hot-toast";

import { store } from "../redux/store";
import { logout } from "../slices/authSlice";

// Create Axios instance
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

// Set Authorization header for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("BlogVerse-token"); // Get token from local storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to headers
  }
  return config;
});

// Handle token expiration or tampering
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("BlogVerse-token");
      localStorage.removeItem("BlogVerse-userName");
      localStorage.removeItem("BlogVerse-userAvatar");

      store.dispatch(logout());
      window.location.href = "/login";
    } else if (error.response?.status === 429) {
      toast.error(
        "You have exceeded the rate limit. Please try again after 10 seconds."
      );
    }

    return Promise.reject(error);
  }
);

// Auth
export const register = (data) => API.post("/api/v1/auth/register", data);
export const loginApi = (data) => API.post("/api/v1/auth/login", data);

// Users
export const allAuthors = () => API.get("/api/v1/user/all-authors");
export const author = (id) => API.get(`/api/v1/user/getAuthor/${id}`);

// Blog
export const createBlog = (data) => API.post("/api/v1/blog/create-blog", data);
export const allBlogs = () => API.get("/api/v1/blog/all-blogs");
export const blog = (id) => API.get(`/api/v1/blog/getBlog/${id}`);
export const yourBlogs = () => API.get(`/api/v1/blog/your-blogs`);
export const likedBlogs = () => API.get(`/api/v1/blog/getLikedBlog`);

// Comment
export const createComment = (id, data) =>
  API.post(`/api/v1/comment/create-comment/${id}`, data);
export const allComments = (id) =>
  API.get(`/api/v1/comment/all-comments/${id}`);

// Like
export const addLike = (id) => API.post(`/api/v1/like/add-like/${id}`);
export const allLikes = (id) => API.get(`/api/v1/like/get-likes/${id}`);
export const removeLike = (id) => API.delete(`/api/v1/like/remove-like/${id}`);
