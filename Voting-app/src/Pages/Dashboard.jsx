import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Dashboard() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchPolls = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPolls(data);
    } catch (err) {
      alert("Error fetching polls");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/polls/${pollId}/vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ optionIndex }), // ✅ corrected
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("Vote submitted!");
      fetchPolls(); // refresh poll results
    } else {
      alert(data.message || "Vote failed");
    }
  } catch (err) {
    alert("Something went wrong.");
  }
};

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🗳️ All Active Polls</h2>
      {loading ? (
        <p>Loading polls...</p>
      ) : (
        <div className={styles.pollList}>
          {polls.map((poll) => (
            <motion.div
              key={poll._id}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>{poll.title}</h3>
              <p>{poll.description}</p>

              {poll.hasVoted ? (
                <div className={styles.results}>
                  <h4>🟢 Results</h4>
                  {poll.options.map((opt) => (
                    <div key={opt._id} className={styles.resultLine}>
                      <span>{opt.text}</span>
                      <span>{opt.votes} votes</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.options}>
                  {poll.options.map((opt, index) => (
                    <button
                      key={opt._id}
                      onClick={() => handleVote(poll._id, index)} // ✅ sending index
                    >
                      {opt.text}
                    </button>
                  ))}
                  <Link to={`/poll/${poll._id}/result`}>View Results</Link>

                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
