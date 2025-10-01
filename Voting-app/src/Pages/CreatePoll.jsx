import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CreatePoll.module.css';
import { motion } from 'framer-motion';

function CreatePoll() {
  const [poll, setPoll] = useState({
    title: '',
    description: '',
    options: [''],
    expiresAt: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'option') {
      const updatedOptions = [...poll.options];
      updatedOptions[index] = value;
      setPoll({ ...poll, options: updatedOptions });
    } else {
      setPoll({ ...poll, [name]: value });
    }
  };

  const addOption = () => {
    setPoll(prev => ({ ...prev, options: [...prev.options, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanOptions = poll.options.filter(opt => opt.trim() !== '').map(opt => ({ text: opt }));

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: poll.title,
        description: poll.description,
        options: cleanOptions,
        expiresAt: poll.expiresAt || null,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Poll created successfully!');
      navigate('/dashboard');
    } else {
      alert(data.message || 'Poll creation failed');
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className={styles.title}>📝 Create New Poll</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Poll Title"
          value={poll.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Poll Description"
          value={poll.description}
          onChange={handleChange}
          required
        />
        {poll.options.map((opt, index) => (
          <input
            key={index}
            name="option"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleChange(e, index)}
            required
          />
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
        <input
          name="expiresAt"
          type="date"
          value={poll.expiresAt}
          onChange={handleChange}
        />
        <button type="submit">Create Poll</button>
      </form>
    </motion.div>
  );
}

export default CreatePoll;
