import React from 'react';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/api';
import { LocaleProvider } from '../contexts/LocaleContext';
import HomePageWrapper from './../pages/HomePage';

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              }
            }
          })
        }
      }
    }

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data
      }
    })
  }

  render() {
    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="contact-app">
          <header className="contact-app__header">
            <h1>Aplikasi Kontak</h1>
          </header>

          <main>
            <Routes>
              <Route path="*" element={<LoginPage loginSuccess={this.onLoginSuccess}/>} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
        </LocaleProvider>
      )
    }
    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="contact-app">
        <header className="contact-app__header">
          <h1>{this.state.localeContext.locale === 'id' ? 'Aplikasi Kontak' : 'Contact'}</h1>
          <Navigation />
        </header>

        <main>
          <Routes>
            <Route path='/' element={<HomePageWrapper />} />
            <Route path='/add' element={<AddPage />} />
          </Routes>
        </main>
      </div>
      </LocaleProvider>
    );
  }
}

export default ContactApp;