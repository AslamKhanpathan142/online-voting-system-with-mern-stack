import React, { useEffect, useState } from "react";
import styles from "../styles/MyPolls.module.css";

function MyPolls() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPolls = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/polls/mypolls`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setPolls(data.polls || []);
    } catch (err) {
      console.error("Failed to fetch your polls:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPolls();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Created Polls</h2>

      {loading ? (
        <p>Loading...</p>
      ) : polls.length === 0 ? (
        <p>You haven't created any polls yet.</p>
      ) : (
        <ul className={styles.pollList}>
          {polls.map((poll) => (
            <li key={poll._id} className={styles.pollCard}>
              <h3>{poll.title}</h3>
              <p>Status: {poll.isExpired ? "Expired" : "Active"}</p>
              <p>Total Votes: {poll.totalVotes || 0}</p>

              <ul>
                {poll.options?.map((opt, i) => (
                  <li key={i}>
                    {opt.text} – {opt.votes} votes
                  </li>
                ))}
              </ul>
              <Link to={`/poll/${poll._id}/result`}>View Result</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPolls;
