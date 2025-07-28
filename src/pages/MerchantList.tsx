import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowRight, Coins, MapPin } from 'lucide-react';


const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Merchant {
  id: number;
  name: string;
  category: string;
  cashback: number;
  rating: number;
  image: string;
  description: string;
  location: string;
}

export const MerchantList: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      const response = await axios.get(`${baseURL}/merchants`);
    
      
      setMerchants(response.data);
    } catch (error) {
      console.error('Error fetching merchants:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(merchants.map(m => m.category)))];
  
  const filteredMerchants = selectedCategory === 'All' 
    ? merchants 
    : merchants.filter(m => m.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover & Book with
          <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent block">
            Cashback Rewards
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Book services from top merchants and earn ReZ Coins with every purchase
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Merchants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerchants.map((merchant) => (
          <Link
            key={merchant.id}
            to={`/merchant/${merchant.id}`}
            className="group block"
          >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="relative">
                <img
                  src={merchant.image}
                  alt={merchant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Coins className="w-3 h-3" />
                    <span>{merchant.cashback}% back</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {merchant.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{merchant.rating}</span>
                  </div>
                </div>
                
                <p className="text-purple-600 text-sm font-medium mb-2">{merchant.category}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{merchant.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{merchant.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-600 font-medium">
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredMerchants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No merchants found in this category.</p>
        </div>
      )}
    </div>
  );
};