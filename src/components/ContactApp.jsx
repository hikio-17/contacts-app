import React from 'react';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import Register from '../pages/Register';
import Login from '../pages/Login';

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null
    }
  }

  render() {
    if (this.state.authedUser === null) {
      return (
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>Aplikasi Kontak</h1>
          </header>

          <main>
            <Routes>
              <Route path="*" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      )
    }
    return (
      <div className="contact-app">
        <header className="contact-app__header">
          <h1>Aplikasi Kontak</h1>
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<AddPage />} />
          </Routes>
        </main>
      </div>
    );
  }
}

export default ContactApp;