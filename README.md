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

## 🎯 Key Features

- **Merchant Discovery**: Browse merchants with categories, ratings, and cashback offers
- **Service Booking**: Select services and time slots for appointments
- **Cashback System**: Earn ReZ Coins with every booking
- **Wallet Management**: Track earnings and transaction history
- **Responsive Design**: Optimized for mobile and desktop devices
- **Real-time Updates**: Instant wallet updates after bookings

## 🔍 Assumptions Made

### User Management
- **Single User System**: The app assumes one user (ID: 1) for simplicity
- **No Authentication**: No login/logout functionality implemented
- **Hardcoded User ID**: All bookings and wallet operations use userId = 1

### Data Storage
- **In-Memory Storage**: All data is stored in JavaScript arrays/objects
- **No Database**: Data resets when the server restarts
- **No Persistence**: Bookings and wallet data don't persist between sessions

### Business Logic
- **Simplified Cashback**: Cashback is calculated as `merchant.cashback * 10` ReZ Coins
- **Currency Conversion**: 1 ReZ Coin = ₹0.10 for display purposes
- **No Payment Processing**: Bookings are confirmed without actual payment
- **Static Time Slots**: Predefined time slots for each merchant
- **No Booking Conflicts**: Multiple users can book the same time slot

### Technical Assumptions
- **Development Environment**: Optimized for local development
- **CORS Enabled**: All origins allowed for simplicity
- **Error Handling**: Basic error handling implemented
- **No Rate Limiting**: No API rate limiting or security measures

### UI/UX Assumptions
- **Modern Browsers**: Assumes support for modern CSS features
- **High-Speed Internet**: Images loaded from external URLs (Pexels)
- **Desktop/Mobile**: Responsive design for common screen sizes

## 🚀 Future Enhancements

- User authentication and multi-user support
- Database integration (PostgreSQL/MongoDB)
- Real payment gateway integration
- Push notifications for booking reminders
- Advanced booking management (cancellation, rescheduling)
- Merchant dashboard for managing services and bookings
- Review and rating system
- Loyalty program with tiered rewards

## 📝 Development Notes

- The project uses TypeScript for better code quality and developer experience
- Tailwind CSS provides utility-first styling with consistent design tokens
- Component architecture follows React best practices with proper separation of concerns
- API responses include proper HTTP status codes and error handling
- The design system uses a cohesive color palette and spacing system

## 🤝 Contributing

This is a demo project for showcasing development skills. Feel free to fork and enhance with additional features!