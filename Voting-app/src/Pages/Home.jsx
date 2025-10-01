import React from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="mainDiv">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.title}>🗳️ Online Voting System</h1>
        <p className={styles.subtitle}>
          A secure, simple and real-time voting platform built with MERN Stack.
        </p>

        <div className={styles.features}>
          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>🔐 Secure Authentication</h3>
            <p>
              Only registered users can vote. Admins can create and manage
              polls.
            </p>
          </motion.div>

          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>📊 Live Results</h3>
            <p>
              After voting, users can see real-time results with vote counts.
            </p>
          </motion.div>

          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>⚙️ Easy Management</h3>
            <p>
              Admins can create polls with multiple options and expiration
              dates.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
