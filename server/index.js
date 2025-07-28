const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data storage
let merchants = [
  {
    id: 1,
    name: 'Glow Beauty Salon',
    category: 'Beauty & Wellness',
    cashback: 15,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Premium beauty salon offering hair styling, facials, and spa treatments with expert beauticians.',
    services: ['Hair Cut & Style', 'Facial Treatment', 'Manicure & Pedicure', 'Hair Coloring'],
    timeSlots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'],
    location: 'Downtown Plaza, 2nd Floor'
  },
  {
    id: 2,
    name: 'FitZone Gym',
    category: 'Fitness',
    cashback: 20,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'State-of-the-art fitness center with modern equipment, personal trainers, and group classes.',
    services: ['Personal Training', 'Group Classes', 'Cardio Workout', 'Weight Training'],
    timeSlots: ['6:00 AM', '8:00 AM', '10:00 AM', '5:00 PM', '7:00 PM'],
    location: 'Central Mall, Ground Floor'
  },
  {
    id: 3,
    name: 'Tasty Bites Restaurant',
    category: 'Food & Dining',
    cashback: 12,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Fine dining restaurant serving authentic Indian cuisine with a modern twist and cozy ambiance.',
    services: ['Lunch Buffet', 'Dinner A La Carte', 'Private Dining', 'Catering Services'],
    timeSlots: ['12:00 PM', '1:30 PM', '7:00 PM', '8:30 PM', '9:30 PM'],
    location: 'Food Court, 3rd Floor'
  },
  {
    id: 4,
    name: 'Zen Spa Retreat',  
    category: 'Wellness',
    cashback: 18,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3757958/pexels-photo-3757958.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Luxurious spa offering holistic wellness treatments, massages, and relaxation therapies.',
    services: ['Full Body Massage', 'Aromatherapy', 'Hot Stone Therapy', 'Meditation Sessions'],
    timeSlots: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'],
    location: 'Wellness Center, 4th Floor'
  },
  {
    id: 5,
    name: 'Tech Repair Hub',
    category: 'Technology',
    cashback: 10,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/4050403/pexels-photo-4050403.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Professional device repair services for smartphones, laptops, and gadgets with quick turnaround.',
    services: ['Phone Repair', 'Laptop Service', 'Data Recovery', 'Screen Replacement'],
    timeSlots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'],
    location: 'Tech Plaza, 1st Floor'
  },
  {
    id: 6,
    name: 'Urban Coffee House',
    category: 'Cafe & Beverages',
    cashback: 8,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Cozy coffee shop with artisanal brews, fresh pastries, and comfortable workspace environment.',
    services: ['Specialty Coffee', 'Fresh Pastries', 'Light Meals', 'Co-working Space'],
    timeSlots: ['7:00 AM', '9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
    location: 'Main Street, Corner Shop'
  }
];

let bookings = [];

let wallets = {
  1: { userId: 1, balance: 250, transactions: [] }
};

// API Routes
app.get('/api/merchants', (req, res) => {
  res.json(merchants);
});

app.get('/api/merchants/:id', (req, res) => {
  const merchant = merchants.find(m => m.id === parseInt(req.params.id));
  if (!merchant) {
    return res.status(404).json({ error: 'Merchant not found' });
  }
  res.json(merchant);
});

app.post('/api/book', (req, res) => {
  const { merchantId, timeSlot, service, userId = 1 } = req.body;
  
  const merchant = merchants.find(m => m.id === parseInt(merchantId));
  if (!merchant) {
    return res.status(404).json({ error: 'Merchant not found' });
  }

  const booking = {
    id: bookings.length + 1,
    merchantId: parseInt(merchantId),
    merchantName: merchant.name,
    timeSlot,
    service,
    userId,
    cashbackEarned: Math.round(merchant.cashback * 10), // Simple cashback calculation
    bookingDate: new Date().toISOString(),
    status: 'confirmed'
  };

  bookings.push(booking);

  // Add cashback to wallet
  if (!wallets[userId]) {
    wallets[userId] = { userId, balance: 0, transactions: [] };
  }
  
  wallets[userId].balance += booking.cashbackEarned;
  wallets[userId].transactions.push({
    id: Date.now(),
    type: 'cashback',
    amount: booking.cashbackEarned,
    description: `Cashback from ${merchant.name}`,
    date: new Date().toISOString()
  });

  res.json(booking);
});

app.get('/api/wallet/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const wallet = wallets[userId] || { userId, balance: 0, transactions: [] };
  res.json(wallet);
});

app.post('/api/wallet/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount, description } = req.body;

  if (!wallets[userId]) {
    wallets[userId] = { userId, balance: 0, transactions: [] };
  }

  wallets[userId].balance += amount;
  wallets[userId].transactions.push({
    id: Date.now(),
    type: 'credit',
    amount,
    description,
    date: new Date().toISOString()
  });

  res.json(wallets[userId]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});