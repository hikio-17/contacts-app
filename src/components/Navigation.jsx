import React from 'react'
import { Link } from 'react-router-dom'
import { LocaleConsumer } from '../contexts/LocaleContext'
import { FiHome, FiLogOut, FiPlusCircle } from 'react-icons/fi'

const Navigation = () => {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <nav className='navigation'>
            <ul>
              <li>
                <button onClick={toggleLocale}>
                  {locale === 'id' ? 'en' : 'id'}
                </button>
              </li>
              <li>
                <Link to='/'>
                  <FiHome />
                </Link>
              </li>
              <li>
                <Link to='/add'>
                  <FiPlusCircle />
                </Link>
              </li>
              <li>
                <button>
                  <FiLogOut />
                </button>
              </li>
            </ul>
          </nav>
        )
      }}
    </LocaleConsumer>
  )
}

export default Navigation
