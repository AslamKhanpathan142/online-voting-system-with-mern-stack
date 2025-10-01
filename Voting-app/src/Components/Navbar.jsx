import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { motion } from 'framer-motion';

function Navbar() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // ✅ get user from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link to="/" className={styles.logo}>🗳️ Voting App</Link>
      <div className={styles.links}>
        {!token ? (
          <>
            <Link to="/login" className={styles.link}>Login</Link>
            <Link to="/signup" className={styles.link}>Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={styles.link}>Dashboard</Link>

            {/* ✅ Show only if user is admin */}
            {user?.isAdmin && (
              <Link to="/createpoll" className={styles.link}>Create Poll</Link>
            )}

            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;

