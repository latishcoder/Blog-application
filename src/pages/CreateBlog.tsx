import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import BlogForm from "../components/BlogForm";
import { blogAPI } from "../api/blogs";

/**
 * Blog type
 * (You can move this to src/types/blog.ts later)
 */
interface Blog {
  id?: number;
  title: string;
  content: string;
  author: string;
  category: string;
  likes?: number;
  createdAt?: string;
  coverImage?: string;
}

export default function CreateBlog() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: Blog) => blogAPI.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

      <BlogForm
        onSubmit={(data: Blog) => {
          createMutation.mutate(data);
        }}
        onCancel={() => navigate("/")}
      />

      {createMutation.isError && (
        <p className="text-red-500 mt-4">
          Failed to create blog. Please try again.
        </p>
      )}
    </div>
  );
}
