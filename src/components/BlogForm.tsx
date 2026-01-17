import { useState } from "react";
import { Blog } from "../types/blog";

/**
 * Props type
 */
interface BlogFormProps {
  blog?: Blog;
  onSubmit: (data: Blog) => void;
  onCancel: () => void;
}

/**
 * Form state type
 * (Exclude id & system fields)
 */
type BlogFormData = Omit<
  Blog,
  "id" | "likes" | "createdAt"
>;

const BlogForm: React.FC<BlogFormProps> = ({
  blog,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: blog?.title ?? "",
    content: blog?.content ?? "",
    category: blog?.category ?? "React",
    author: blog?.author ?? "",
    coverImage: blog?.coverImage ?? "",
  });

 const handleSubmit = () => {
  if (!formData.title || !formData.author || !formData.content) return;

  onSubmit({
    id: blog?.id ?? Date.now(),
    likes: blog?.likes ?? 0,
    createdAt: blog?.createdAt,
    ...formData,
  });
};

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter blog title..."
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author
        </label>
        <input
          type="text"
          value={formData.author}
          onChange={e =>
            setFormData({ ...formData, author: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Your name..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={e =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>React</option>
          <option>CSS</option>
          <option>JavaScript</option>
          <option>Node.js</option>
          <option>TypeScript</option>
        </select>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          rows={8}
          value={formData.content}
          onChange={e =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder="Write your blog content..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {blog ? "Update Blog" : "Create Blog"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
