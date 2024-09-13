import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import View from './View';
import AddForm from './AddForm';
import Navbar from './Navbar';
// import Auth0ProviderWithNavigate from './auth0Provider';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/add" element={<AddForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

