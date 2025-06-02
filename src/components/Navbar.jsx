import './Navbar.css';
import logo from '../assets/logo-nav.png'
import { Link } from 'react-router-dom';
import search from '../assets/search.svg'
import dashbrd from '../assets/dashbrd.svg'
import view from '../assets/view.svg'
import add from '../assets/add.svg'
import login from '../assets/login.svg'
import sign from '../assets/sign.svg'
import { useEffect } from 'react';
import { useState } from 'react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    }, [])

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
    }

    const handleHamburg = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="navbar">
            <div className='navbar2'>
                <Link to="/" className="logo-link">
                    <div className="logo">
                        <img src={logo} alt="KodeCash" />
                        <div>
                            <span className="logo-text-1">Kode</span>
                            <span className="logo-text-2">Cash</span>
                        </div>
                    </div>
                </Link>
                {isLoggedIn ? (<nav className="nav-links">
                    <li><Link className="nav-btn" to="/dashboard"><img className="icon" src={dashbrd} alt="" />DASHBOARD</Link></li>
                    <li><Link className="nav-btn" to="/add-transaction"><img className="icon" src={add} alt="" />ADD TRANSACTIONS</Link></li>
                    <li><Link className="nav-btn" to="/all-transactions"><img className="icon" src={view} alt="" />ALL TRANSACTIONS</Link></li>
                    <li><Link className="nav-btn" to="/search-transactions"><img className="icon" src={search} alt="" />SEARCH</Link></li>
                </nav>) : (<nav className="nav-links">
                    <li><Link className="nav-btn" to="/login"><img className="icon" src={login} alt="" />LOGIN</Link></li>
                    <li><Link className="nav-btn" to="/signup"><img className="icon" src={sign} alt="" />SIGN UP</Link></li>
                </nav>)}
            </div>
            <button className="hamburger-btn" onClick={handleHamburg}>{!menuOpen ? `☰`:`×`}</button>
            {isLoggedIn ? (<div className={`nav-links-hamburg ${menuOpen ? 'open' : ''}`}>
                <nav >
                    <li><div className="logo">
                        <img src={logo} alt="KodeCash" />
                        <div>
                            <span className="logo-text-1">Kode</span>
                            <span className="logo-text-2">Cash</span>
                        </div>
                    </div></li>
                    <li><Link className="nav-btn" to="/dashboard" onClick={closeMenu}><img className="icon" src={dashbrd} alt="" />DASHBOARD</Link></li>
                    <li><Link className="nav-btn" to="/add-transaction" onClick={closeMenu}><img className="icon" src={add} alt="" />ADD TRANSACTIONS</Link></li>
                    <li><Link className="nav-btn" to="/all-transactions" onClick={closeMenu}><img className="icon" src={view} alt="" />ALL TRANSACTIONS</Link></li>
                    <li><Link className="nav-btn" to="/search-transactions" onClick={closeMenu}><img className="icon" src={search} alt="" />SEARCH</Link></li>

                </nav></div>) : (<div className={`nav-links-hamburg ${menuOpen ? 'open' : ''}`}>
                    <nav>
                        <li><Link className="nav-btn" to="/login" onClick={closeMenu}><img className="icon" src={login} alt="" />LOGIN</Link></li>
                        <li><Link className="nav-btn" to="/signup" onClick={closeMenu}><img className="icon" src={sign} alt="" />SIGN UP</Link></li>
                    </nav></div>)}
        </header>
    );
};

export default Navbar;
