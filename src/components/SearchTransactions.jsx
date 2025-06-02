import React, { useEffect, useState } from 'react';
import './SearchTransactions.css';
import Navbar from './Navbar';


const SearchTransactions = ({ isLoggedIn, setIsLoggedIn}) => {
    const [transactions, setTransactions] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [search, setSearch] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user?.email) {
            setTransactions([]);
            setFiltered([]);
            return;
        }

        const allTransactions = JSON.parse(localStorage.getItem('transactions')) || {};
        const userTransactions = allTransactions[user.email] || [];

        setTransactions(userTransactions);
        setFiltered(userTransactions);
    }, []);


    useEffect(() => {
        let result = [...transactions];

        if (search) {
            result = result.filter(tx => {
                const combined = `${tx.date} ${tx.amount} ${tx.type} ${tx.category} ${tx.description}`.toLowerCase();
                return combined.includes(search.toLowerCase());
            });
        }


        if (type) {
            result = result.filter(tx => tx.type === type);
        }

        if (category) {
            result = result.filter(tx => tx.category === category);
        }

        if (fromDate) {
            result = result.filter(tx => new Date(tx.date) >= new Date(fromDate));
        }

        if (toDate) {
            result = result.filter(tx => new Date(tx.date) <= new Date(toDate));
        }

        setFiltered(result);
    }, [search, type, category, fromDate, toDate, transactions]);

    const categories = Array.from(new Set(transactions.map(tx => tx.category)));

    return (
        <div className='page-wrapper'>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <div className="search-page">
                <h2>Search & Filter Transactions</h2>

                <div className="filters">
                    <input
                        type="text"
                        placeholder="Search description..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className='search-tran-date-filter'>
                        <h3>From:</h3>
                        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                        <h3>To:</h3>
                        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </div>

                <div className="results">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No matching transactions</td></tr>
                            ) : (
                                filtered.map(tx => (
                                    <tr key={tx.id}>
                                        <td>{tx.date}</td>
                                        <td>{tx.type}</td>
                                        <td>{tx.category}</td>
                                        <td>{tx.description}</td>
                                        <td className={tx.type === 'income' ? 'green' : 'red'}>
                                            {tx.type === 'income' ? '+' : '-'}${tx.amount}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchTransactions;
