# ReZ App - Cashback & Booking Platform

A modern cashback and booking application where users can discover merchants, book services, and earn ReZ Coins as rewards.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **React Router DOM** for client-side routing
- **Tailwind CSS** for utility-first styling and responsive design
- **Lucide React** for consistent iconography
- **Axios** for HTTP client requests

### Backend
- **Node.js** with Express.js for RESTful API server
- **CORS** middleware for cross-origin requests
- **In-memory data storage** (arrays) for simplicity

## 🏃‍♂️ How to Run

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the backend server
npm start
```
The backend server will run on `http://localhost:3001`

### Frontend Setup
```bash
# In the root directory, install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will run on `http://localhost:5173`

### Running Both Servers
You can run both servers simultaneously:
```bash
# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start frontend (in root directory)
npm run dev
```

## 📋 Project Structure

```
rez-app/
├── server/                 # Backend Express server
│   ├── index.js           # Main server file with APIs
│   └── package.json       # Backend dependencies
├── src/                   # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route-based page components
│   └── App.tsx           # Main app component with routing
└── README.md             # This file
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/merchants` | GET | Get all merchants |
| `/api/merchants/:id` | GET | Get specific merchant details |
| `/api/book` | POST | Create a new booking |
| `/api/wallet/:userId` | GET | Get user's wallet information |
| `/api/wallet/:userId/add` | POST | Add funds to user's wallet |


