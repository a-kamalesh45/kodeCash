import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AllTransactions from './components/AllTransactions';
import SearchTransactions from './components/SearchTransactions';
import Home from './components/Home';
import Login from './components/Login';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import Signup from './components/SignUp';
import ChangeMode from './components/ChangeMode';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');


  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('isDark') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isDark', isDark ? 'true' : 'false');
  }, [isDark]);

  return (
    <Router>
      <ChangeMode isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/add-transaction" element={<AddTransaction isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/all-transactions" element={<AllTransactions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/search-transactions" element={<SearchTransactions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
