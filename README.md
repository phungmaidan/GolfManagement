# Calendar/Golf Management System

A full-stack application for managing golf schedules and bookings, built with React and Node.js.

## 🚀 Features

- User authentication and authorization with JWT
- Dashboard interface for administrators and staff
- Real-time booking updates with Socket.IO
- Guest management and reservations
- Responsive design for desktop and mobile devices
- Protected routes with role-based access control
- Comprehensive booking system with status tracking
- SQL Server database integration
- Redis caching for improved performance

## 🛠️ Tech Stack

### Frontend
- React 19
- Redux Toolkit with Redux Persist
- React Router DOM v7
- Tailwind CSS v4
- Socket.IO Client
- Axios for API requests
- React Hook Form for form handling
- Lucide React for icons
- React Toastify for notifications

### Backend
- Node.js (>= 22.13.x)
- Express.js
- SQL Server with Sequelize ORM
- Socket.IO for real-time communication
- JWT Authentication
- Redis for caching
- Winston for logging
- Joi for validation
- Babel for ES6+ support

## 📦 Installation

### Prerequisites
- Node.js >= 18.x (Frontend)
- Node.js >= 22.13.x (Backend)
- SQL Server
- Redis (optional, for caching)

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
- Linting: `npm run lint`

### Backend
- Development server: `npm run dev`
- Production build: `npm run prod`
- Linting: `npm run lint`
- Testing: `npm run test`
- Database seeding: `npm run seed`

## 🔒 Environment Variables

Make sure to set up your `.env` file in the backend directory with the following variables:

### Required Environment Variables
```
# Environment
NODE_ENV=development
# Server Configuration
PORT=3000
CORS_ORIGIN=http://localhost:3001
# Database configuration
DB_HOST=localhost
DB_NAME=golf_booking
DB_USER=sa
DB_PASSWORD=YourStrongPassword123
DB_PORT=1433
# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here
JWT_EXPIRATION=1h
JWT_REFRESH_EXPIRATION=7d
# Rate Limiting
RATE_LIMIT_WINDOW_MS=15*60*1000  # 15 minutes
RATE_LIMIT_MAX=100  # 100 requests per window
# Redis configuration
REDIS_URL=redis://localhost:6379
# Logging
LOG_LEVEL=debug
# Socket.IO
SOCKET_CORS_ORIGIN=http://localhost:3001
```

## 📁 Project Structure

### Backend
- `/src/controllers` - Request handlers
- `/src/middlewares` - Middleware functions
- `/src/models` - Sequelize models (com, fre, mrm, sys)
- `/src/routes` - API routes
- `/src/services` - Business logic
- `/src/utils` - Utility functions
- `/src/validations` - Request validation schemas
- `/src/sockets` - Socket.IO event handlers
- `/src/config` - Configuration files

### Frontend
- `/src/components` - Reusable React components
- `/src/pages` - Application pages
- `/src/redux` - Redux state management
- `/src/apis` - API integration
- `/src/hooks` - Custom React hooks
- `/src/utils` - Utility functions
- `/src/assets` - Static assets

## 👥 Author

- dan_nguyenph

## 📝 License

This project is private and proprietary.
