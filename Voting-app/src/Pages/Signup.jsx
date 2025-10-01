import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Signup.module.css';
import { motion } from 'framer-motion';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
       localStorage.setItem("user", JSON.stringify(data.user)); // Save user object
      alert('Signup successful!');
      navigate('/dashboard');
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
          I am an admin
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </motion.div>
  );
}

export default Signup;
