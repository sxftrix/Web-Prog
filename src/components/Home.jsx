import React from 'react';

export default function Home() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Welcome to the Home Page</h1>
      <p style={styles.text}>
        You are successfully logged in! Start managing your tasks efficiently and boost your productivity.
      </p>
      <img
        src="https://placehold.co/600x300/f59e0b/ffffff?text=Task+Dashboard+Placeholder"
        alt="Placeholder image of task dashboard with modern design"
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  pageContainer: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: 700,
    margin: '0 auto',
    fontFamily: "'Inter', sans-serif",
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.125rem',
    color: '#475569',
    marginBottom: '2rem',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '12px',
  },
};
