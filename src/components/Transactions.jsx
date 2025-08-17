import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: "income", amount: "", category: "" });
  const [activeChart, setActiveChart] = useState('pie');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://financetracker-backend-6xbt.onrender.com/api/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch transactions");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        "https://financetracker-backend-6xbt.onrender.com/api/transactions",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ type: "income", amount: "", category: "" });
      fetchTransactions();
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const getTypeColor = (type) => type === 'income' ? 'text-success' : 'text-danger';
  const getTypeIcon = (type) => type === 'income' ? '↑' : '↓';

  // Chart data
  const chartData = useMemo(() => {
    const incomeByCategory = {};
    const expenseByCategory = {};
    const dailyTotals = {};

    transactions.forEach(t => {
      const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (t.type === 'income') incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
      else expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;

      dailyTotals[date] = dailyTotals[date] || { income: 0, expense: 0 };
      dailyTotals[date][t.type] += t.amount;
    });

    return { incomeByCategory, expenseByCategory, dailyTotals };
  }, [transactions]);

  const pieData = {
    labels: Object.keys(chartData.expenseByCategory),
    datasets: [{
      data: Object.values(chartData.expenseByCategory),
      backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#FF6384','#C9CBCF'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const barData = {
    labels: Object.keys(chartData.incomeByCategory),
    datasets: [
      { label: 'Income', data: Object.values(chartData.incomeByCategory), backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
      { label: 'Expenses', data: Object.keys(chartData.expenseByCategory).map(cat => chartData.expenseByCategory[cat] || 0), backgroundColor: 'rgba(255, 99, 132, 0.6)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }
    ]
  };

  const lineData = {
    labels: Object.keys(chartData.dailyTotals),
    datasets: [
      { label: 'Income', data: Object.values(chartData.dailyTotals).map(d => d.income), borderColor: 'rgb(75,192,192)', backgroundColor: 'rgba(75,192,192,0.2)', tension: 0.4 },
      { label: 'Expenses', data: Object.values(chartData.dailyTotals).map(d => d.expense), borderColor: 'rgb(255,99,132)', backgroundColor: 'rgba(255,99,132,0.2)', tension: 0.4 }
    ]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } } };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">

          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-4"><div className="card bg-success bg-opacity-10 border-0 text-center py-3"><h5>Total Income</h5><p>{formatCurrency(totalIncome)}</p></div></div>
            <div className="col-md-4"><div className="card bg-danger bg-opacity-10 border-0 text-center py-3"><h5>Total Expenses</h5><p>{formatCurrency(totalExpenses)}</p></div></div>
            <div className="col-md-4"><div className="card bg-primary bg-opacity-10 border-0 text-center py-3"><h5>Balance</h5><p>{formatCurrency(balance)}</p></div></div>
          </div>

          {/* Add Transaction Form */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-3">
                  <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <input type="number" placeholder="Amount" className="form-control" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
                </div>
                <div className="col-md-4">
                  <input type="text" placeholder="Category" className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
                </div>
                <div className="col-md-1">
                  <button className="btn btn-primary w-100" disabled={isSubmitting}>{isSubmitting ? '...' : 'Add'}</button>
                </div>
              </form>
            </div>
          </div>

          {/* Charts */}
          {transactions.length > 0 && (
            <div className="row mb-4">
              <div className="col-md-6"><Pie data={pieData} options={chartOptions} /></div>
              <div className="col-md-6">{activeChart === 'bar' ? <Bar data={barData} options={chartOptions} /> : <Line data={lineData} options={chartOptions} />}</div>
            </div>
          )}

          {/* Transactions Table */}
          <div className="card shadow-sm border-0">
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead><tr><th>Type</th><th>Amount</th><th>Category</th><th>Date</th></tr></thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i}>
                      <td>{getTypeIcon(t.type)} {t.type}</td>
                      <td>{formatCurrency(t.amount)}</td>
                      <td>{t.category}</td>
                      <td>{new Date(t.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
