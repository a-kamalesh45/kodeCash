import React, { useEffect, useState } from 'react';
import './EditTransactionForm.css';

const EditTransactionForm = ({ transaction, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    type: 'income',
    category: '',
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

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem('transactions')) || [];
    const updated = existing.map((tx) =>
      tx.id === transaction.id ? { ...formData, id: transaction.id } : tx
    );

    localStorage.setItem('transactions', JSON.stringify(updated));
    onSubmit(formData);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Edit Transaction</h2>

      <label>Amount</label>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <label>Date</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <label>Type</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

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
          className="small-button"
          onClick={() => setShowNewCategoryInput(true)}
        >
          + Add new category
        </button>
      )}

      {showNewCategoryInput && (
        <div className="form-group new-cat-row">
          <input
            type="text"
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="button" className="small-button" onClick={handleAddCategory}>
            Add
          </button>
        </div>
      )}

      <label>Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>
        <input
        className='edit-tran-recurring-checkbox'
          type="checkbox"
          name="recurring"
          checked={formData.recurring}
          onChange={handleChange}
        />
        Recurring
      </label>

      {formData.recurring && (
        <>
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
        </>
      )}

      <button type="submit">Update Transaction</button>
    </form>
  );
};

export default EditTransactionForm;
