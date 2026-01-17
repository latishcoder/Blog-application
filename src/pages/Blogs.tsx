import { useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import BlogCard from "../components/BlogCard";
import BlogForm from "../components/BlogForm";
import Toast from "../components/Toast";
import ConfirmDialog from "../components/ConfirmDialog";

import { blogAPI } from "../api/blogs";
import { Blog } from "../types/blog";

/**
 * Toast state type
 */
interface ToastState {
  message: string;
  type: "success" | "error";
}

export default function Blogs() {
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Blog | null>(null);

  /* =========================
     GET ALL BLOGS
  ========================== */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogAPI.getBlogs({ page: 1, limit: 50 }),
  });

  const blogs: Blog[] = data?.data ?? [];

  /* =========================
     CREATE BLOG
  ========================== */
  const createMutation = useMutation({
    mutationFn: (data: Blog) => blogAPI.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setShowForm(false);
      setToast({ message: "Blog created successfully 🎉", type: "success" });
    },
  });

  /* =========================
     UPDATE BLOG
  ========================== */
  const updateMutation = useMutation({
    mutationFn: ({ id, blog }: { id: number; blog: Blog }) =>
      blogAPI.updateBlog(id, blog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setEditingBlog(null);
      setToast({ message: "Blog updated ✨", type: "success" });
    },
  });

  /* =========================
     DELETE BLOG
  ========================== */
  const deleteMutation = useMutation({
    mutationFn: (id: number) => blogAPI.deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setConfirmDelete(null);
      setSelectedBlog(null);
      setToast({ message: "Blog deleted 🗑️", type: "success" });
    },
  });

  /* =========================
     LIKE BLOG
  ========================== */
  const likeMutation = useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) =>
      blogAPI.updateLikes({ id, likes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  /* =========================
     FILTER LOGIC
  ========================== */
  const categories: string[] = [
    "All",
    ...new Set(blogs.map(b => b.category)),
  ];

  const filteredBlogs = blogs.filter(blog => {
    const matchCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (isLoading) return <p className="p-6">Loading blogs...</p>;
  if (isError) return <p className="p-6">Failed to load blogs</p>;

  return (
    /* =========================
       🔥 BACKGROUND IMAGE GOES HERE
       Replace the URL with your own image
    ========================== */
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page content */}
      <div className="relative z-10 p-6 h-screen">

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Confirm Delete */}
        <ConfirmDialog
          isOpen={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() =>
            confirmDelete && deleteMutation.mutate(confirmDelete.id)
          }
          title="Delete Blog"
          message="Are you sure you want to delete this blog?"
        />

        {/* Header */}
        <div className="flex justify-between mb-6 text-white">
          <h1 className="text-3xl font-bold">DevBlogs</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex gap-2 bg-blue-600 hover:bg-blue-500 transition text-white px-4 py-2 rounded shadow-lg shadow-blue-500/40"
          >
            <Plus /> New Blog
          </button>
        </div>

        {/* Create / Edit Form */}
        {showForm || editingBlog ? (
          <div className="bg-white rounded-xl p-6 max-w-3xl mx-auto">
            <BlogForm
              blog={editingBlog ?? undefined}
              onSubmit={(data: Blog) =>
                editingBlog
                  ? updateMutation.mutate({
                      id: editingBlog.id,
                      blog: data,
                    })
                  : createMutation.mutate(data)
              }
              onCancel={() => {
                setShowForm(false);
                setEditingBlog(null);
              }}
            />
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex gap-4 mb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-md">
              <Search
                className="absolute left-2 top-2.5 text-gray-400"
                size={18}
              />
              <input
                placeholder="Search blog..."
                className="pl-8 p-2 w-full rounded bg-white/90"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* LEFT + RIGHT PANEL */}
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-260px)]">

              {/* LEFT PANEL */}
              <div className="col-span-4 overflow-y-auto pr-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                {filteredBlogs.map(blog => (
                  <div
                    key={blog.id}
                    onClick={() => setSelectedBlog(blog)}
                    className={`cursor-pointer mb-4 ${
                      selectedBlog?.id === blog.id
                        ? "ring-2 ring-blue-500 rounded-xl"
                        : ""
                    }`}
                  >
                    <BlogCard
                      blog={blog}
                      onEdit={setEditingBlog}
                      onDelete={() => setConfirmDelete(blog)}
                      onLike={() =>
                        likeMutation.mutate({
                          id: blog.id,
                          likes: blog.likes + 1,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              {/* RIGHT PANEL */}
              <div className="col-span-8 bg-white rounded-2xl shadow-2xl overflow-y-auto p-8">
                {selectedBlog ? (
                  <>
                    {selectedBlog.coverImage ? (
                      <img
                        src={selectedBlog.coverImage}
                        alt={selectedBlog.title}
                        className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100 rounded-xl mb-6 flex items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}

                    <h2 className="text-3xl font-bold mb-2">
                      {selectedBlog.title}
                    </h2>

                    <p className="text-sm text-gray-500 mb-4">
                      {selectedBlog.author} · ❤️ {selectedBlog.likes}
                    </p>

                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedBlog.content}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Select a blog to view details
                  </div>
                )}
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
