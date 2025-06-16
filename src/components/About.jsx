import React from 'react';

export default function About() {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>About Us</h1>
      <p style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p style={styles.text}>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p style={styles.text}>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
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
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  text: {
    fontSize: '1.125rem',
    color: '#475569',
    marginBottom: '1rem',
    lineHeight: 1.6,
  },
};
