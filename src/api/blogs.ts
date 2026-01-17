import axios from "axios";

// ✅ use env (fallback for safety)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// ✅ axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const blogAPI = {
  // 🔹 Get all blogs (pagination + total count)
  getBlogs: async ({ page = 1, limit = 10 }) => {
    const response = await api.get("/blogs", {
      params: {
        _page: page,
        _limit: limit,
        _sort: "createdAt",
        _order: "desc",
      },
    });

    return {
      data: response.data,
      total: Number(response.headers["x-total-count"] || 0),
    };
  },

  // 🔹 Get single blog
  getBlog: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  // 🔹 Create blog
  createBlog: async (blog) => {
    const response = await api.post("/blogs", {
      ...blog,
      createdAt: new Date().toISOString(),
      likes: 0,
    });
    return response.data;
  },

  // 🔹 Update blog
  updateBlog: async ({ id, blog }) => {
    const response = await api.put(`/blogs/${id}`, blog);
    return response.data;
  },

  // 🔹 Update likes only
  updateLikes: async ({ id, likes }) => {
    const response = await api.patch(`/blogs/${id}`, { likes });
    return response.data;
  },

  // 🔹 Delete blog
  deleteBlog: async (id) => {
    await api.delete(`/blogs/${id}`);
    return id;
  },
};
