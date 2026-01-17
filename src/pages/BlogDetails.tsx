import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogAPI } from "../api/blogs";

export default function BlogDetails() {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogAPI.getBlog(id),
  });

  if (isLoading) {
    return <p className="p-6 text-center">Loading blog...</p>;
  }

  if (isError || !blog) {
    return <p className="p-6 text-center">Blog not found</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span>✍️ {blog.author}</span>
        <span>📅 {blog.createdAt}</span>
        <span>❤️ {blog.likes}</span>
      </div>

      <p className="text-gray-800 leading-relaxed">{blog.content}</p>
    </div>
  );
}
