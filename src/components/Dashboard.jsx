import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import Navbar from './Navbar';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Dashboard = ({ isLoggedIn, setIsLoggedIn, isDark, setIsDark }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user?.email) {
        setTransactions([]);
        return;
    }

    const allTransactions = JSON.parse(localStorage.getItem('transactions')) || {};
    const userTransactions = allTransactions[user.email] || [];
    setTransactions(userTransactions);
}, []);


    const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    const totalExpense = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    const balance = totalIncome - totalExpense;

    const getCategoryBreakdown = (type) => {
        const grouped = {};
        transactions
            .filter(tx => tx.type === type)
            .forEach(tx => {
                grouped[tx.category] = (grouped[tx.category] || 0) + parseFloat(tx.amount);
            });

        return Object.entries(grouped).map(([name, value]) => ({ name, value }));
    };

    const getCombinedCategoryData = () => {
        const combined = {};

        transactions.forEach(({ category, type, amount }) => {
            const amt = parseFloat(amount);
            if (!combined[category]) combined[category] = { category, income: 0, expense: 0 };
            combined[category][type] += amt;
        });

        return Object.values(combined);
    };

    const getDailyIncomeExpense = () => {
        const dailyTotals = {};
        transactions.forEach((tx) => {
            const { date, amount, type } = tx;
            const amt = parseFloat(amount);

            if (!dailyTotals[date]) {
                dailyTotals[date] = { date, income: 0, expense: 0, total: 0 };
            }

            if (type === 'income') {
                dailyTotals[date].income += amt;
            } else {
                dailyTotals[date].expense += amt;
            }

            dailyTotals[date].total += amt;
        });

        return Object.values(dailyTotals).sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const incomeData = getCategoryBreakdown('income');
    const expenseData = getCategoryBreakdown('expense');
    const dailyData = getDailyIncomeExpense();

    const mostIncomedCategory = incomeData.reduce((max, curr) => curr.value > max.value ? curr : max, { name: '', value: 0 });
    const mostSpentCategory = expenseData.reduce((max, curr) => curr.value > max.value ? curr : max, { name: '', value: 0 });


    return (
        <div className='dash-page'>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark}/>
            <div className="dashboard">
                {/* Summary Cards */}
                <div className="dashboard-summary">
                    <div className="dashboard-card dashboard-card-green">
                        <p className="dashboard-card-title">Total Income</p>
                        <h2>${totalIncome.toFixed(2)}</h2>
                    </div>
                    <div className="dashboard-card dashboard-card-red">
                        <p className="dashboard-card-title">Total Expenses</p>
                        <h2>${totalExpense.toFixed(2)}</h2>
                    </div>
                    <div className="dashboard-card dashboard-card-blue">
                        <p className="dashboard-card-title">Balance</p>
                        <h2>${balance.toFixed(2)}</h2>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="dashboard-recent-transactions">
                    <h3>Recent Transactions Summary</h3>
                    <div className='dashboard-tran-summary'>
                        <h3 className='dashboard-tran-summary-income'>Total Income - ${totalIncome.toFixed(2)}</h3>
                        <h3 className='dashboard-tran-summary-expense'>Total Expenses - ${totalExpense.toFixed(2)}</h3>
                        <h3 className='dashboard-tran-summary-income'>Most Category for Income - {mostIncomedCategory.name} - {mostIncomedCategory.value}</h3>
                        <h3 className='dashboard-tran-summary-expense'>Most Category for Expenses - {mostSpentCategory.name} - {mostSpentCategory.value}</h3>
                    </div>

                </div>

                {/* Charts */}



                <div className="dashboard-charts">

                    <div className='dashboard-chart-row'>

                        <div className="dashboard-chart-card">
                            <h3>Daily Income vs Expenses</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="income" stroke="#00C49F" strokeWidth={2.5} />
                                    <Line type="monotone" dataKey="expense" stroke="#FF8042" strokeWidth={2.5} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    <div className='dashboard-chart-row'>

                        <div className="dashboard-chart-card">
                            <h3>Income vs Expense</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Income', value: totalIncome },
                                            { name: 'Expense', value: totalExpense }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={80}
                                        label
                                    >
                                        <Cell fill="#4CAF50" />
                                        <Cell fill="#F44336" />
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="dashboard-chart-card">
                            <h3>Income by Category</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={incomeData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {incomeData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="dashboard-chart-card">
                            <h3>Expense by Category</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {expenseData.map((_, i) => (
                                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    <div className='dashboard-chart-row'>

                        <div className="dashboard-chart-card">
                            <h3>Top 5 Categories by Amount</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={
                                        [...incomeData, ...expenseData]
                                            .map(item => ({
                                                ...item,
                                                type: incomeData.includes(item) ? 'Income' : 'Expense'
                                            }))
                                            .sort((a, b) => b.value - a.value)
                                            .slice(0, 5)
                                    }
                                    layout="vertical"
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip formatter={(value) => `$${value}`} />
                                    <Bar dataKey="value">
                                        {
                                            [...incomeData, ...expenseData]
                                                .sort((a, b) => b.value - a.value)
                                                .slice(0, 5)
                                                .map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={incomeData.includes(entry) ? '#12b430' : '#ff2929'} />
                                                ))
                                        }
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>


                        <div className="dashboard-chart-card">
                            <h3>Total Transactions per Day</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={dailyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
