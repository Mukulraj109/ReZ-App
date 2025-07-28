
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MerchantList } from './pages/MerchantList';
import { MerchantDetails } from './pages/MerchantDetails';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { Wallet } from './pages/Wallet';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
        <Header />
        <Routes>
          <Route path="/" element={<MerchantList />} />
          <Route path="/merchant/:id" element={<MerchantDetails />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;