# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# Blog-application" 



# 📝 DevBlogs – Blog Application

A modern **Blog Application** built with **React, TypeScript, and TanStack Query**.  
Users can create, read, update, delete, and like blogs with a clean UI and smooth user experience.

This project demonstrates **frontend best practices**, **TypeScript migration**, and **API integration** using a mock backend.

---

## 🚀 Features

- 📄 View all blogs
- 🔍 Search blogs by title
- 🏷️ Filter blogs by category
- ➕ Create a new blog
- ✏️ Edit existing blogs
- 🗑️ Delete blogs with confirmation
- ❤️ Like blogs
- 🪟 Split layout (Blog list on left, blog details on right)
- 🔔 Toast notifications for actions
- 🌙 Dark background with highlighted UI (glassmorphism style)

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **TanStack React Query**
- **Lucide Icons**

### Backend (Mock API)
- **JSON Server**

---

## 📁 Project Structure

src/
├── api/ # API layer (axios + blog endpoints)
├── components/ # Reusable UI components
├── pages/ # Page-level components
├── types/ # Shared TypeScript types
├── utils/ # Utility functions
└── main.tsx # App entry point


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/blog-application.git
cd blog-application

2️⃣ Install dependencies
npm install

3️⃣ Start JSON Server (Mock Backend)
npm run server


The server will run at:

http://localhost:3001

4️⃣ Start the frontend
npm run dev


Open in browser:

http://localhost:5173

🔌 API Endpoints Used
Method	Endpoint	Description
GET	/blogs	Fetch all blogs
GET	/blogs/:id	Fetch blog by ID
POST	/blogs	Create a blog
PUT	/blogs/:id	Update a blog
PATCH	/blogs/:id	Update likes
DELETE	/blogs/:id	Delete a blog
🧠 Key Learnings

Migrated a full React app from JavaScript to TypeScript

Implemented React Query for efficient server state management

Designed reusable, type-safe UI components

Structured commits with meaningful messages

Followed clean architecture and separation of concerns

📌 Future Improvements

Authentication (Login / Signup)

Real backend (Node.js + MongoDB)

Pagination & infinite scroll

Image upload support

Optimistic updates for likes

👤 Author

Latish Salunkhe
MERN Stack Developer
