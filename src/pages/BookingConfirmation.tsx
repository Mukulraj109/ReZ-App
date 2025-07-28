import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Coins, Home, Wallet } from 'lucide-react';

interface Booking {
  id: number;
  merchantName: string;
  timeSlot: string;
  service: string;
  cashbackEarned: number;
  bookingDate: string;
  status: string;
}

interface Merchant {
  name: string;
  location: string;
  image: string;
}

export const BookingConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const booking = location.state?.booking as Booking;
  const merchant = location.state?.merchant as Merchant;

  useEffect(() => {
    if (!booking) {
      navigate('/');
      return;
    }

    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, [booking, navigate]);

  if (!booking) {
    return null;
  }

  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full opacity-70"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600 text-lg">Your service has been successfully booked</p>
      </div>

      {/* Cashback Earned */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6 mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Coins className="w-8 h-8" />
          <span className="text-3xl font-bold">{booking.cashbackEarned}</span>
        </div>
        <p className="text-green-100">ReZ Coins Earned!</p>
        <p className="text-sm text-green-100 mt-2">Cashback has been added to your wallet</p>
      </div>

      {/* Booking Details */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        {merchant?.image && (
          <img
            src={merchant.image}
            alt={booking.merchantName}
            className="w-full h-32 object-cover"
          />
        )}
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{booking.merchantName}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Date</p>
                <p className="text-gray-600">{bookingDate}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Time</p>
                <p className="text-gray-600">{booking.timeSlot}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Service</p>
                <p className="text-gray-600">{booking.service}</p>
              </div>
            </div>

            {merchant?.location && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{merchant.location}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-mono text-sm font-medium">#{booking.id.toString().padStart(6, '0')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          to="/wallet"
          className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-center block hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Wallet className="w-5 h-5" />
          <span>View Wallet</span>
        </Link>
        
        <Link
          to="/"
          className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl font-semibold text-center block border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Home className="w-5 h-5" />
          <span>Book Another Service</span>
        </Link>
      </div>

      {/* Important Note */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Important:</strong> Please arrive 5-10 minutes before your scheduled time. 
          Contact the merchant directly for any changes to your booking.
        </p>
      </div>
    </div>
  );
};