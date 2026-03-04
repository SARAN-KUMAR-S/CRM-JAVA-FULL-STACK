import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Orders from './components/Orders';
import SalesHistory from './components/SalesHistory';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('login');
  };

  if (!isLoggedIn && activeTab !== 'login') {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Shop CRM System</h1>
        </header>
        <div className="content">
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  if (activeTab === 'login' && !isLoggedIn) {
    return (
      <div className="App">
        <header className="app-header">
          <h1>Shop CRM System</h1>
        </header>
        <div className="content">
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="App app-with-sidebar">
      <header className="app-header">
        <h1>Shop CRM System</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>
      
      <div className="app-body">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button 
              className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className={activeTab === 'customers' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('customers')}
            >
              Customers
            </button>
            <button 
              className={activeTab === 'products' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button 
              className={activeTab === 'orders' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button 
              className={activeTab === 'sales' ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveTab('sales')}
            >
              Sales History
            </button>
          </nav>
        </aside>

        <main className="main-content">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'customers' && <Customers />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'sales' && <SalesHistory />}
        </main>
      </div>
    </div>
  );
}

export default App;
