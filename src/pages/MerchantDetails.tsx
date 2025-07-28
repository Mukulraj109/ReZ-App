import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, MapPin, Clock, ArrowLeft, Coins, CheckCircle } from 'lucide-react';

interface Merchant {
  id: number;
  name: string;
  category: string;
  cashback: number;
  rating: number;
  image: string;
  description: string;
  services: string[];
  timeSlots: string[];
  location: string;
}

export const MerchantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMerchant();
    }
  }, [id]);

  const fetchMerchant = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/merchants/${id}`);
      setMerchant(response.data);
      setSelectedService(response.data.services[0]);
    } catch (error) {
      console.error('Error fetching merchant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!merchant || !selectedService || !selectedTimeSlot) return;

    setBooking(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/book`, {
        merchantId: merchant.id,
        timeSlot: selectedTimeSlot,
        service: selectedService,
        userId: 1
      });

      navigate('/confirmation', { 
        state: { 
          booking: response.data,
          merchant: merchant
        } 
      });
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Merchant not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Merchants</span>
      </button>

      {/* Merchant Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <img
            src={merchant.image}
            alt={merchant.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute top-6 right-6">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span>{merchant.cashback}% Cashback</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{merchant.name}</h1>
              <p className="text-purple-600 font-medium mb-2">{merchant.category}</p>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{merchant.rating} rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{merchant.location}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">{merchant.description}</p>
        </div>
      </div>

      {/* Booking Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Service</h2>

        {/* Service Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Service
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {merchant.services.map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedService === service
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{service}</span>
                  {selectedService === service && (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Time Slot
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {merchant.timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`p-3 rounded-lg border-2 text-center font-medium transition-all duration-200 ${
                  selectedTimeSlot === slot
                    ? 'border-purple-600 bg-purple-600 text-white'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                }`}
              >
                <Clock className="w-4 h-4 mx-auto mb-1" />
                <span className="text-sm">{slot}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Summary */}
        {selectedService && selectedTimeSlot && (
          <div className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cashback:</span>
                <span className="font-medium text-green-600">{merchant.cashback * 10} ReZ Coins</span>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={handleBooking}
          disabled={!selectedService || !selectedTimeSlot || booking}
          className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {booking ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Booking...</span>
            </>
          ) : (
            <>
              <span>Confirm Booking</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};