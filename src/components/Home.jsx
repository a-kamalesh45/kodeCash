import React from 'react'
import './Home.css'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const Home = ({ isLoggedIn, setIsLoggedIn, isDark, setIsDark}) => {

  const handleLogout = () => {
  localStorage.removeItem("currentUser");
  localStorage.setItem('isLoggedIn', 'false');
  setIsLoggedIn(false);
};

  return (
    <div className='homepage'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark} />
      <div className='homesection'>
        <div className='hero-text'>
          <h1>
            Track better.
          </h1>
          <h1>
            Spend wiser.
          </h1>
          <h1>
            Save faster.
          </h1>
          <h2>
            Discover, upload, and unlock valuable documents while earning DocGems. UpDownDocs rewards every contribution—because knowledge should move both ways.
          </h2>
          {!isLoggedIn ? (<div>
            <Link to={'/login'}><button className="cta-button">Log In</button></Link>
            <Link to={'/signup'}><button className="cta-button">Sign Up</button></Link>
          </div>) : (<div>
            <Link to={'/add-transaction'}><button className="cta-button">Get Started</button></Link>
            <button className="cta-button" onClick={handleLogout}>Log Out</button>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Home
