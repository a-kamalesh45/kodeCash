import React, { useEffect, useState } from 'react';
import './AllTransactions.css';
import Navbar from './Navbar';
import edit from '../assets/edit.svg';
import deleted from '../assets/delete.svg';
import EditTransactionForm from './EditTransactionForm';




const AllTransactions = ({ isLoggedIn, setIsLoggedIn }) => {
  const [transactions, setTransactions] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleEdit = (id) => {
    const selectedTx = transactions.find(tx => tx.id === id);
    setSelectedId(selectedTx); // store full transaction, not just ID
    setShowForm(true);
  };


  const handleFormSubmit = (data) => {
    // update transaction logic here
    setShowForm(false);
  };


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) {
      setTransactions([]);
      return;
    }

    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || {};
    const userTransactions = allTransactions[user.email] || [];
    setTransactions(userTransactions);
  }, []);


  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (!isConfirmed) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) return;

    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || {};
    const userTransactions = allTransactions[user.email] || [];

    const updatedUserTx = userTransactions.filter(tx => tx.id !== id);
    allTransactions[user.email] = updatedUserTx;

    setTransactions(updatedUserTx);
    localStorage.setItem("transactions", JSON.stringify(allTransactions));
  };



  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDeleteCategory = (category, type) => {
    const targetCategory = type === 'income' ? 'Other Income' : 'Other Expense';

    const isConfirmed = window.confirm(
      `This will move all "${category}" ${type} transactions to "${targetCategory}". Do you want to continue?`
    );
    if (!isConfirmed) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) return;

    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || {};
    const userTransactions = allTransactions[user.email] || [];

    // Update category instead of deleting
    const updatedUserTx = userTransactions.map(tx => {
      if (tx.category === category && tx.type === type) {
        return { ...tx, category: targetCategory };
      }
      return tx;
    });

    allTransactions[user.email] = updatedUserTx;

    setTransactions(updatedUserTx);
    localStorage.setItem("transactions", JSON.stringify(allTransactions));

    alert(`All "${category}" ${type} transactions were moved to "${targetCategory}".`);
  };


  return (
    <div className={`page-wrapper ${showForm ? 'blurred' : ''}`}>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="transactions-container">
        <div className="category-summary">
          <h3>Category Totals</h3>
          <div className="category-grid">
            {['income', 'expense'].map(type => {
              const categories = {};

              transactions
                .filter(tx => tx.type === type)
                .forEach(tx => {
                  categories[tx.category] = (categories[tx.category] || 0) + Number(tx.amount);
                });

              return Object.entries(categories).map(([category, total]) => (
                <div key={`${type}-${category}`} className={`category-card ${type}`}>
                  <div className="category-name">{category}</div>
                  <div className="category-total">
                    {type === 'income' ? '+' : '-'}${total}
                  </div>
                  <button
                    className="delete-category-btn"
                    onClick={() => handleDeleteCategory(category, type)}
                  >
                    Delete Category
                  </button>
                </div>
              ));
            })}
          </div>
        </div>

        <div className="transactions-header">
          <h2>All Transactions</h2>
          <p>Manage your income and expense history</p>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No transactions found.</td>
                </tr>
              ) : (
                sortedTransactions.map((tx) => {
                  const [year, month, day] = tx.date.split('-');
                  const monthName = new Date(tx.date).toLocaleString('default', { month: 'short' });

                  return (
                    <tr key={tx.id} className={`tx-row ${tx.type}`}>
                      <td className="date-column" data-label="Date">
                        <div className="date-block">
                          <span className="day">{parseInt(day)}</span>
                          <span className="month">{monthName}</span>
                        </div>
                      </td>
                      <td data-label="Type">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
                      <td data-label="Category">{tx.category}</td>
                      <td data-label="Description">{tx.description}</td>
                      <td className={`amount ${tx.type}`} data-label="Amount">
                        {tx.type === 'income' ? '+' : '-'}${tx.amount}
                      </td>
                      <td data-label="Actions">
                        <button className="action-button edit" onClick={() => handleEdit(tx.id)}>
                          <img src={edit} alt="edit" />
                        </button>
                        <button className="action-button delete" onClick={() => handleDelete(tx.id)}>
                          <img src={deleted} alt="delete" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && selectedId && (
        <div className="transaction-edit-form">
          <EditTransactionForm transaction={selectedId} onSubmit={handleFormSubmit} />
          <button className="close-button" onClick={() => setShowForm(false)}>✕</button>
        </div>
      )}

    </div>
  );
};

export default AllTransactions;
