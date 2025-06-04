import React, { useState } from 'react';
import './AddTransaction.css';
import Navbar from './Navbar';
import rightBg from '../assets/form-bg.png';


const AddTransaction = ({isLoggedIn, setIsLoggedIn, isDark, setIsDark}) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    category: '',
    type: 'income',
    description: '',
    recurring: false,
    recurringPeriod: '',
  });

  const [incomeCategories, setIncomeCategories] = useState([
    'Salary',
    'Freelancing',
    'Investments',
    'Other Income',
  ]);

  const [expenseCategories, setExpenseCategories] = useState([
    'Food',
    'Rent',
    'Utilities',
    'Transport',
    'Shopping',
    'Other Expense',
  ]);

  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const availableCategories =
    formData.type === 'income' ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === 'type') {
        updated.category = '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, date, category, description } = formData;

    if (!amount || !date || !category || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const newTransaction = { ...formData, id: Date.now() };
    const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user?.email) {
  alert("No user is logged in.");
  return;
}


const allTransactions = JSON.parse(localStorage.getItem('transactions')) || {};
const userTransactions = allTransactions[user.email] || [];

const updatedTransactions = [...userTransactions, newTransaction];
allTransactions[user.email] = updatedTransactions;

localStorage.setItem('transactions', JSON.stringify(allTransactions));

    setFormData({
      amount: '',
      date: '',
      category: '',
      type: 'income',
      description: '',
      recurring: false,
      recurringPeriod: '',
    });

    setShowNewCategoryInput(false);
    setNewCategory('');
    alert('Transaction added!');
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    if (formData.type === 'income') {
      setIncomeCategories((prev) => [...prev, newCategory]);
    } else {
      setExpenseCategories((prev) => [...prev, newCategory]);
    }

    setFormData((prev) => ({
      ...prev,
      category: newCategory,
    }));

    setNewCategory('');
    setShowNewCategoryInput(false);
  };

  return (
    <div className='page-wrapper'>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>
      <div className='add-tran'>
        <form className="add-tran-transaction-form" onSubmit={handleSubmit}>
          <h2>Add New Transaction</h2>

          <div className="add-tran-form-group">
            <label>Amount ($)</label>
            <input
              placeholder='Enter amount'
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-tran-form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-tran-form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="add-tran-form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {availableCategories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {!showNewCategoryInput && (
              <button
                type="button"
                className="add-tran-small-button"
                onClick={() => setShowNewCategoryInput(true)}
              >
                + Add new category
              </button>
            )}
            {showNewCategoryInput && (
              <div className="add-tran-form-group add-tran-new-cat-row">
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" className="add-tran-small-button" onClick={handleAddCategory}>
                  Add
                </button>
              </div>
            )}
          </div>

          <div className="add-tran-form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="add-tran-form-group add-tran-checkbox-group">
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
            />
            <label>Mark as recurring</label>
          </div>

          {formData.recurring && (
            <div className="add-tran-form-group">
              <label>Recurring Period</label>
              <select
                name="recurringPeriod"
                value={formData.recurringPeriod}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select period</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          )}

          <button type="submit" className="add-tran-submit-btn">
            Add Transaction
          </button>
        </form>

        <div className='add-tran-right-form'>
          <img src={rightBg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
