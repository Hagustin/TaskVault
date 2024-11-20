import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <nav className="nav">
      <div className="nav-title">
        <Link to="/">Krazy Kanban Board</Link>
      </div>
      <ul className="nav-list">
        {!loginCheck ? (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <button type="button" onClick={handleLogout} className="nav-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
