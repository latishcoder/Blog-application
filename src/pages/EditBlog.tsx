import { useParams, useNavigate } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import initialBlogs from "../data/initialBlogs";

/**
 * Blog type (you can later move this to src/types/blog.ts)
 */
interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes?: number;
  createdAt?: string;
  coverImage?: string;
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const blog: Blog | undefined = initialBlogs.find(
    (b: Blog) => b.id === Number(id)
  );

  const handleUpdate = (data: Blog) => {
    console.log("Update blog:", data);
    navigate("/");
  };

  if (!blog) {
    return <p className="p-6">Blog not found</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <BlogForm blog={blog} onSubmit={handleUpdate} />
    </div>
  );
}
