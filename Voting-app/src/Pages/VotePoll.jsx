import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function VotePoll() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchPoll = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/polls/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setPoll(data);
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const handleVote = async () => {
    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls/${poll._id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        optionIndex: Number(selectedIndex), // ✅ important: convert to number
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
    } else {
      alert('Vote successful');
      fetchPoll(); // refresh poll
    }
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h2>{poll.title}</h2>
      <p>{poll.description}</p>
      {poll.options.map((opt, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name="option"
              value={index}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
            />
            {opt.text}
          </label>
        </div>
      ))}
      <button onClick={handleVote}>Vote</button>
    </div>
  );
}

export default VotePoll;
