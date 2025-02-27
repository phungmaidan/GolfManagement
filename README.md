# Calendar/Golf Management System

A full-stack application for managing golf schedules and bookings, built with React and Node.js.

## 🚀 Features

- User authentication and authorization
- Dashboard interface
- Real-time updates with Socket.IO
- Responsive design
- Protected routes

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Socket.IO Client
- Axios

### Backend
- Node.js
- Express.js
- SQL Server
- Socket.IO
- JWT Authentication

## 📦 Installation

### Prerequisites
- Node.js >= 18.x (Frontend)
- Node.js >= 22.13.x (Backend)
- SQL Server

### Setup Steps

1. Clone the repository
```bash
git clone [repository-url]
```

2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # Configure your environment variables
npm run dev
```

## 🚀 Development

### Frontend
- Development server: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

### Backend
- Development server: `npm run dev`
- Production build: `npm run production`
- Linting: `npm run lint`

## 🔒 Environment Variables

Make sure to set up your `.env` file in the backend directory with the following variables:
- SQL_USER
- SQL_PASSWORD
- SQL_SERVER
- SQL_DATABASE
- SQL_PORT
- ACCESS_TOKEN_SECRET_SIGNATURE
- REFRESH_TOKEN_SECRET_SIGNATURE
- And others as specified in `.env.example`

## 👥 Author

- dan_nguyenph

## 📝 License

This project is private and proprietary.
