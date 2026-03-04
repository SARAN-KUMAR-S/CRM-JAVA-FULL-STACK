import React, { useState, useEffect } from 'react';
import './Component.css';

const ORDERS_API = 'http://localhost:8080/orders';
const CUSTOMERS_API = 'http://localhost:8080/customers';

function SalesHistory() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...orders];

      if (filterCustomer) {
        filtered = filtered.filter(order => order.customerId === parseInt(filterCustomer));
      }

      if (filterDate) {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
          return orderDate === filterDate;
        });
      }

      setFilteredOrders(filtered);
    };
    
    applyFilters();
  }, [orders, filterCustomer, filterDate]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ORDERS_API);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(CUSTOMERS_API);
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const clearFilters = () => {
    setFilterCustomer('');
    setFilterDate('');
  };

  const getTotalRevenue = () => {
    return filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  };

  return (
    <div className="component-container">
      <h2>Sales History</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <h3>Filter Orders</h3>
        <div className="form-row">
          <select
            value={filterCustomer}
            onChange={(e) => setFilterCustomer(e.target.value)}
            className="form-input"
          >
            <option value="">All Customers</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="form-input"
          />

          <button onClick={clearFilters} className="btn-add">
            Clear Filters
          </button>
        </div>

        <div className="sales-summary">
          <p><strong>Total Orders:</strong> {filteredOrders.length}</p>
          <p><strong>Total Revenue:</strong> ${getTotalRevenue().toFixed(2)}</p>
        </div>
      </div>

      <div className="table-container">
        <h3>Orders List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{getCustomerName(order.customerId)}</td>
                    <td>{formatDate(order.orderDate)}</td>
                    <td>${order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      {order.orderItems && order.orderItems.length > 0 ? (
                        <details>
                          <summary>{order.orderItems.length} items</summary>
                          <ul className="order-items-list">
                            {order.orderItems.map((item, idx) => (
                              <li key={idx}>
                                {item.productName} x {item.quantity} = ${item.subtotal.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        'No items'
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default SalesHistory;
