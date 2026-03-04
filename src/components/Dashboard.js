import React, { useState, useEffect } from 'react';
import './Component.css';

const CUSTOMERS_API = 'http://localhost:8080/customers';
const ORDERS_API = 'http://localhost:8080/orders';
const PRODUCTS_API = 'http://localhost:8080/products';

function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const [customersRes, ordersRes, productsRes] = await Promise.all([
        fetch(CUSTOMERS_API),
        fetch(ORDERS_API),
        fetch(PRODUCTS_API)
      ]);

      const customers = await customersRes.json();
      const orders = await ordersRes.json();
      const products = await productsRes.json();

      const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      setStats({
        totalCustomers: customers.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalProducts: products.length
      });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="dashboard-grid">
          <div className="stat-card stat-customers">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Customers</h3>
              <p className="stat-number">{stats.totalCustomers}</p>
            </div>
          </div>

          <div className="stat-card stat-orders">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-number">{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card stat-revenue">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-number">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card stat-products">
            <div className="stat-icon"></div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <p className="stat-number">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
