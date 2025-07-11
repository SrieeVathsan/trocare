import { useState } from 'react';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      const res = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('Password reset link sent to your email.');
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Failed to send reset request.');
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="forgot-icon">
          <img src={require('../assets/forgot-icon.png')} alt="Forgot Password Icon" />
        </div>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a reset link</p>

        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}

        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn">Send Reset Link</button>
        <p className="back-link">
          <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;