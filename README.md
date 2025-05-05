# 📚 University Timetable Management System

> A full-stack web application to automate university timetable management using MERN Stack (MongoDB, Express.js, React.js, Node.js).

---

## 🚀 Live Demo

[🌐 View Project Live](https://your-frontend-url.vercel.app)
(Replace with your deployed frontend URL)

---

## 🧠 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About The Project

The **University Timetable Management System** is designed to simplify and automate the creation, editing, and management of academic timetables.
It supports role-based login (Admin/Student), real-time notifications, email sharing of timetables, and a clean, responsive UI.
Built with the MERN stack, it ensures scalability, security, and user-friendliness.

---

## 🎯 Features

✅ Admin Login and Signup
✅ Student Login and Signup
✅ Manage Courses (CRUD)
✅ Manage Instructors (CRUD)
✅ Manage Rooms (CRUD)
✅ Automatic Timetable Generation
✅ Edit Timetable after Generation
✅ Download Timetable as PDF
✅ Send Timetable via Email (with attachment)
✅ Real-time Notifications using Socket.IO
✅ Fully Responsive Design (Mobile, Tablet, Desktop)
✅ Protected API Endpoints with JWT
✅ Deployment on Vercel (Frontend) and Railway/Render (Backend)

---

## 🛠 Tech Stack

| Part                    | Technology                                  |
| :---------------------- | :------------------------------------------ |
| Frontend                | React.js, Tailwind CSS, Vite                |
| Backend                 | Node.js, Express.js                         |
| Database                | MongoDB Atlas                               |
| Authentication          | JWT (JSON Web Tokens)                       |
| Real-time Communication | Socket.IO                                   |
| Email Service           | Nodemailer                                  |
| PDF Generator           | html2pdf.js                                 |
| Deployment              | Vercel (Frontend), Railway/Render (Backend) |

---

## 🛠 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/university-timetable-management.git
cd university-timetable-management
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌎 Environment Variables

Create a `.env` file in **backend/**:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_email
EMAIL_PASS=your_gmail_app_password
```

Create a `.env` file in **frontend/**:

```
VITE_API_BASE_URL=https://your-backend-url/api
```

---

## 📑 API Documentation

| Method | Endpoint                    | Description                 |
| :----: | :-------------------------- | :-------------------------- |
|  POST  | /api/auth/register          | Register Admin/Student      |
|  POST  | /api/auth/login             | Login                       |
|  POST  | /api/courses                | Create Course               |
|  GET   | /api/courses                | Get All Courses             |
|  POST  | /api/instructors            | Create Instructor           |
|  GET   | /api/instructors            | Get All Instructors         |
|  POST  | /api/rooms                  | Create Room                 |
|  GET   | /api/rooms                  | Get All Rooms               |
|  POST  | /api/timetable/generate     | Generate Timetable          |
|  PUT   | /api/timetable/update-entry | Edit Timetable Slot         |
|  GET   | /api/timetable              | View Timetable              |
|  POST  | /api/email/send             | Send Timetable PDF to Email |

---

## 🖼️ Screenshots

| Page                      | Preview             |
| :------------------------ | :------------------ |
| Login Page                | (Insert Screenshot) |
| Admin Dashboard           | (Insert Screenshot) |
| Manage Courses            | (Insert Screenshot) |
| Manage Instructors        | (Insert Screenshot) |
| Manage Rooms              | (Insert Screenshot) |
| Generate Timetable        | (Insert Screenshot) |
| Download Timetable as PDF | (Insert Screenshot) |
| Student Timetable View    | (Insert Screenshot) |

---

## 🔮 Future Enhancements

- Allow Students to Register themselves.
- Notification system with Push Notifications.
- Real-time Collaborative Timetable Editing.
- Advanced Conflict Handling (Instructor Preferences, Room Types).

---

## 🤝 Contributing

Contributions are welcome!
Please fork the repository, make your changes, and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.
Feel free to use and modify it for personal and educational purposes.
