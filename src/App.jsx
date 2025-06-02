import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AllTransactions from './components/AllTransactions';
import SearchTransactions from './components/SearchTransactions';
import Home from './components/Home';
import Login from './components/Login';
import { useState } from 'react';
import Signup from './components/SignUp';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/add-transaction" element={<AddTransaction isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/all-transactions" element={<AllTransactions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/search-transactions" element={<SearchTransactions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>} />
      </Routes>
    </Router>
  );
}

export default App;
