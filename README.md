# 🚀 EzHire — Modern Job Portal

EzHire is a comprehensive, full-stack job portal designed to simulate a real-world hiring platform, featuring a robust monolithic backend and an intuitive frontend interface.

---

## 📌 What This Project Demonstrates

- Monolithic backend architecture for streamlined development and deployment
- Unified REST APIs for core business logic
- Full-stack system using Next.js + Node.js
- Real-world flows like:
  - User authentication and authorization
  - Profile management (skills, experience, bio)
  - Job posting and application tracking
  - Subscription payments

---

## ✨ Features

### 👤 User
- Register / Login
- Profile Management
- Apply to jobs
- Track application status
- AI Resume Analyzer
- AI Career Guidance

### 🧑‍💼 Recruiter
- Post jobs
- Manage applicants
- Update job status

### 🔐 Authentication
- JWT-based authentication
- Secure password hashing
- Forgot Password / Reset Password flow

### 💳 Payments
- Razorpay subscription integration

---

## 🧰 Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Infrastructure
- Database (PostgreSQL)

---

## 🏗️ Architecture Overview

The application follows a monolithic architecture, consolidating all core features into a single backend service to simplify the deployment process, reduce operational overhead, and provide faster internal communication.

- **Frontend:** Provides a responsive, dynamic user interface with Next.js.
- **Backend:** A unified Express application serving robust REST APIs for Authentication, User management, Job operations, and Payments.

---

## 📁 Project Structure

```
.
├── frontend/      # Next.js frontend application
└── backend/       # Unified Express backend application
```

---

## ⚙️ Prerequisites

- Node.js (v18+)
- Database
- npm / yarn

---

## 🚀 Setup & Run

### 1. Clone Repository

```bash
git clone https://github.com/Prashantbhati7/EzHire-Monolith.git
cd ezhire-monolith
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

### 3. Setup Environment Variables

Create `.env` files in both `frontend` and `backend` directories.

**Backend requires variables like:**
- Database connection URL  
- JWT Secret  
- Razorpay keys (for payment service)
- Server Port configuration

---

### 4. Run the Application

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend application (in a new terminal):

```bash
cd frontend
npm run dev
```

---

### 5. Open App

Visit the application at:
```
http://localhost:3000
```

---

## 👤 Author

**Prashant Bhati**
