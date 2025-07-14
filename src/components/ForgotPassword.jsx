// File: src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !otp) {
      setError('Please enter both email and OTP.');
      return;
    }

    try {
      const otpRes = await fetch('/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (otpRes.ok) {
        navigate('/confirm-password');
      } else {
        const data = await otpRes.json();
        setError(data.message || 'Invalid OTP.');
      }
    } catch {
      setError('Failed to verify OTP.');
    }
  };

  const handleSendOtp = async () => {
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    try {
      const res = await fetch('/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage('OTP sent to your email.');
        setOtpSent(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Failed to send OTP request.');
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="forgot-icon">
          <img src={require('../assets/forgot-icon.png')} alt="Forgot Password Icon" />
        </div>
        <h2>Forgot Password</h2>
        <p>Enter your email and OTP to proceed</p>

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

        <div className="otp-label-group">
          <label>OTP Code</label>
          <button
            type="button"
            className="send-otp-toggle"
            onClick={handleSendOtp}
          >
            {otpSent ? 'Resend OTP' : 'Send OTP'}
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" className="btn">Submit</button>

        <p className="back-link">
          <a href="/login">Back to Login</a>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;