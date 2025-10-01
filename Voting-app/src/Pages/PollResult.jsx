import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styles from '../styles/PollResult.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function PollResult() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPoll = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPoll(data);
    } catch (err) {
      console.error('Error fetching poll:', err);
      setPoll(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);
  const data = poll?.options?.map((opt) => ({
  name: opt.text,
  value: opt.votes,
}));

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Poll Result</h2>
      {loading ? (
        <p>Loading...</p>
      ) : !poll ? (
        <p>Poll not found or server error.</p>
      ) : (
        <>
          <h3>{poll.title}</h3>
          {data.length === 0 ? (
            <p>No vote data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  label
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}

export default PollResult;
