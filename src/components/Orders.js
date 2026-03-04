import React, { useState, useEffect } from 'react';
import './Component.css';

const ORDERS_API = 'http://localhost:8080/orders';
const CUSTOMERS_API = 'http://localhost:8080/customers';
const PRODUCTS_API = 'http://localhost:8080/products';

function Orders() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(CUSTOMERS_API);
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_API);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const addOrderItem = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const existingItem = orderItems.find(item => item.productId === product.id);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setOrderItems(orderItems.filter(item => item.productId !== productId));
    } else {
      setOrderItems(orderItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: parseInt(quantity) }
          : item
      ));
    }
  };

  const removeItem = (productId) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedCustomer) {
      setError('Please select a customer');
      return;
    }

    if (orderItems.length === 0) {
      setError('Please add at least one product');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(ORDERS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: parseInt(selectedCustomer),
          orderItems: orderItems
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      setSuccess('Order created successfully!');
      setSelectedCustomer('');
      setOrderItems([]);
      fetchProducts(); // Refresh to get updated stock
    } catch (err) {
      setError(err.message);
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Create New Order</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-column">
            <div className="form-group">
              <label>Select Customer:</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="form-input"
              >
                <option value="">-- Choose Customer --</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Add Products:</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addOrderItem(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="form-input"
              >
                <option value="">-- Select Product to Add --</option>
                {products.filter(p => p.stock > 0).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>

            {orderItems.length > 0 && (
              <div className="order-items-section">
                <h3>Order Items</h3>
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map(item => (
                      <tr key={item.productId}>
                        <td>{item.productName}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, e.target.value)}
                            min="1"
                            className="quantity-input"
                          />
                        </td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="btn-remove"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3"><strong>Total:</strong></td>
                      <td colSpan="2"><strong>${calculateTotal().toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-add btn-auth"
              disabled={loading || orderItems.length === 0 || !selectedCustomer}
            >
              {loading ? 'Processing...' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Orders;
