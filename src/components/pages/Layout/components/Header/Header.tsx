import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <header className='header'>
      <nav className='container'>
        <ul className='layout-links'>
          <li>
            <Link to='/' className='header-img-container'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/cart' className='header-img-container'>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
