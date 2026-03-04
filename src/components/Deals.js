import React, { useState, useEffect } from 'react';
import './Component.css';

const API_URL = 'http://localhost:8080/deals';

function Deals() {
  const [deals, setDeals] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    stage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch deals');
      }
      const data = await response.json();
      setDeals(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching deals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.title || !formData.amount || !formData.stage) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add deal');
      }

      setFormData({
        title: '',
        amount: '',
        stage: ''
      });
      fetchDeals();
    } catch (err) {
      setError(err.message);
      console.error('Error adding deal:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this deal?')) {
      return;
    }

    setError(null);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete deal');
      }

      fetchDeals();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting deal:', err);
    }
  };

  return (
    <div className="component-container">
      <h2>Deals Management</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-container">
        <h3>Add New Deal</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="form-input"
              step="0.01"
            />
            <input
              type="text"
              name="stage"
              placeholder="Stage"
              value={formData.stage}
              onChange={handleInputChange}
              className="form-input"
            />
            <button type="submit" className="btn-add">Add Deal</button>
          </div>
        </form>
      </div>

      <div className="table-container">
        <h3>Deals List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Stage</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No deals found</td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>{deal.id}</td>
                    <td>{deal.title}</td>
                    <td>${deal.amount ? deal.amount.toFixed(2) : '0.00'}</td>
                    <td>{deal.stage}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(deal.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
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

export default Deals;
