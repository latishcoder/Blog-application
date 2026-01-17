import { Routes, Route } from "react-router-dom";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
    </Routes>
  );
}
