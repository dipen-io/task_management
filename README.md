# 📋 Task Manager

A full-stack task management application built with the **MERN stack**, featuring secure JWT authentication, Role-Based Access Control (RBAC), and a clean modern UI.

---

## 🚀 Key Features

- **Dual-Token Auth** — Short-lived Access Tokens (15 min) + HttpOnly Refresh Tokens (7 days)
- **Role-Based Access Control** — Admins manage everything; Employees only access their assigned tasks
- **Smart Update Routing** — Employees can only update task status; Admins can modify full task payloads
- **Data Validation** — All inputs validated and sanitized with `express-validator`
- **Clean Architecture** — Routes → Controllers → Services separation of concerns
- **Secure Passwords** — Hashed with `bcrypt` before storage

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + TypeScript | UI Framework |
| React Router v7 | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password hashing |
| express-validator | Input validation |
| cookie-parser | HttpOnly cookie handling |

---

## 📁 Project Structure

```
task_manager/
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios API functions
│   │   ├── components/    # Reusable components (Sidebar, ProtectedRoute, etc.)
│   │   ├── context/       # AuthContext (global auth state)
│   │   ├── pages/         # Route-level pages
│   │   │   ├── admin/     # Admin dashboard, task management
│   │   │   └── employee/  # Employee task view
│   │   └── router.tsx     # App routes
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/      # Login, signup, refresh token
│   │   │   ├── task/      # Task CRUD, assign, update
│   │   │   └── user/      # User management
│   │   ├── middleware/
│   │   │   ├── auth.js        # protect + authorize
│   │   │   ├── asyncHandler.js
│   │   │   └── input-validate.js
│   │   ├── utils/
│   │   │   ├── AppError.js
│   │   │   └── ApiResponse.js
│   │   └── constant/
│   │       └── roles.js   # ROLES.ADMIN, ROLES.EMPLOYEE
```

---

## 🔐 Authentication Flow

```
POST /api/auth/login
  → validates credentials
  → returns accessToken (15min) + sets refreshToken cookie (7 days)

POST /api/auth/refresh
  → reads HttpOnly cookie
  → returns new accessToken

POST /api/auth/logout
  → clears refreshToken cookie
```

---

## 👥 Role Permissions

| Action | Admin | Employee |
|---|---|---|
| View all tasks | ✅ | ❌ |
| View assigned tasks | ✅ | ✅ |
| Create task | ✅ | ❌ |
| Assign task | ✅ | ❌ |
| Update full task | ✅ | ❌ |
| Update task status | ✅ | ✅ (own tasks only) |
| Delete task | ✅ | ❌ |
| View all employees | ✅ | ❌ |

---

## 📡 API Endpoints

### Auth
```
POST   /api/auth/signup      # Register new user
POST   /api/auth/login       # Login
POST   /api/auth/refresh     # Refresh access token
POST   /api/auth/logout      # Logout
```

### Tasks
```
GET    /api/task/            # Get all tasks        [Admin]
GET    /api/task/my-tasks    # Get assigned tasks   [Employee]
GET    /api/task/:id         # Get single task      [Admin, Assignee]
POST   /api/task/create      # Create task          [Admin]
PATCH  /api/task/:id         # Update task          [Admin: full | Employee: status only]
PATCH  /api/task/:id/assign  # Assign task          [Admin]
DELETE /api/task/:id         # Delete task          [Admin]
```

### Users
```
GET    /api/user/employees   # Get all employees    [Admin]
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

---

## 🧠 Design Decisions

**Why dual tokens?**
Access tokens expire in 15 minutes to limit exposure if stolen. The refresh token lives in an HttpOnly cookie — JavaScript cannot access it, protecting against XSS attacks.

**Why move `/my-tasks` above `/:id` in routes?**
Express matches routes top-to-bottom. A dynamic route like `/:id` would catch `/my-tasks` and treat `"my-tasks"` as a MongoDB ID, causing a cast error. Specific routes always go above dynamic ones.

**Why separate Admin and Employee update logic?**
Using a single PATCH endpoint with role-based field filtering prevents privilege escalation — employees cannot sneak in extra fields by crafting a custom request body.

---

## 📄 License

MIT
