import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS for styling
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let islogin = useSelector((state) => state.auth.value);
  islogin = islogin || localStorage.getItem("BlogVerse-token");
  let userName = localStorage.getItem("BlogVerse-userName");
  let userAvatar = localStorage.getItem("BlogVerse-userAvatar");

  const handleLogout = () => {
    try {
      dispatch(logout());
      localStorage.removeItem("BlogVerse-token");
      localStorage.removeItem("BlogVerse-userName");
      localStorage.removeItem("BlogVerse-userAvatar");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Top Header Row */}
      <div className="hdr-header">
        <div className="hdr-header-left">
          <h1>Blog Verse</h1>
        </div>
        <div className="hdr-header-right">
          {!islogin && (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hdr-header-link ${isActive ? "hdr-active-link" : ""}`
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hdr-header-link ${isActive ? "hdr-active-link" : ""}`
                }
              >
                Login
              </NavLink>
            </>
          )}

          {islogin && (
            <>
              <div className="hdr-user-profile">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="hdr-user-avatar"
                />
                <span className="hdr-username">{userName}</span>
              </div>

              <button className="hdr-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Second Navigation Row */}
      <div className="hdr-sub-header">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
          }
        >
          Home
        </NavLink>

        {islogin && (
          <>
            <NavLink
              to="/your-blogs"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Your Blogs
            </NavLink>
            <NavLink
              to="/authors"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Authors
            </NavLink>
            <NavLink
              to="/liked-blogs"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Liked Blogs
            </NavLink>
            <NavLink
              to="/create-blog"
              className={({ isActive }) =>
                `hdr-nav-link ${isActive ? "hdr-active-link" : ""}`
              }
            >
              Create Blog
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
