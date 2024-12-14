import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  AllBlogs,
  AuthorDetails,
  AuthorPage,
  BlogDetails,
  CreateBlog,
  LikedBlogs,
  Login,
  PageNotFound,
  Register,
  YourBlogs,
} from "./pages";
import "./App.css";
import { Header } from "./components";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/authors" element={<AuthorPage />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/your-blogs" element={<YourBlogs />} />
          <Route path="/liked-blogs" element={<LikedBlogs />} />
          <Route path="/author-details/:id" element={<AuthorDetails />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
