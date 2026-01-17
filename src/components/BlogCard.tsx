import calculateReadingTime from "../utils/readingTime";
import {
  Edit2,
  Trash2,
  User,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";

import LikeButton from "./LikeButton";
import { Blog } from "../types/blog";

/**
 * Props type
 */
interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
  onLike: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  onEdit,
  onDelete,
  onLike,
}) => {
  const readingTime = calculateReadingTime(blog.content);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          {blog.category}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(blog)}
            className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            title="Edit blog"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(blog)}
            className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Delete blog"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
        {blog.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {blog.content}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1.5">
          <User size={14} />
          <span>{blog.author}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>{readingTime} min read</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <LikeButton
          likes={blog.likes}
          isLiked={false}
          onClick={() => onLike(blog)}
          disabled={false}
        />

        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
          Read more
          <BookOpen size={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
