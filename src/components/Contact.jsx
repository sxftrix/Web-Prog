import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(`Thank you, ${name || 'user'}, for reaching out! We'll get back to you soon.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.intro}>
        If you have any questions or feedback, please fill out the form below and send us a message.
      </p>
      <form style={styles.form} onSubmit={handleSubmit} aria-label="Contact form">
        <input
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Your message"
          aria-label="Your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          required
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>
          Send Message
        </button>
        {success && <p style={styles.successMessage} role="alert">{success}</p>}
      </form>
    </div>
  );
}

const styles = {
  pageContainer: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  intro: {
    fontSize: '1.125rem',
    color: '#475569',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    border: '1.5px solid #cbd5e1',
    fontSize: '1rem',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '0.85rem',
    fontWeight: '700',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    color: '#16a34a',
    fontWeight: '700',
    marginTop: '1rem',
    textAlign: 'center',
  },
};
