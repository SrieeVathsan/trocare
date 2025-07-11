import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Added Link
import './Login.css';
import eyeOpen from '../assets/eye-open.png';
import eyeClosed from '../assets/eye-closed.png';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        navigate('/upload');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-icon">
          <img src={require('../assets/login-icon.png')} alt="Login Icon" />
        </div>
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>

        {error && <p className="error-msg">{error}</p>}

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt="Toggle visibility"
            />
          </span>
        </div>

        <div className="form-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password">Forgot password?</Link> {/* <-- Updated */}
        </div>

        <button type="submit" className="btn">Sign In</button>

        <p className="signup-text">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;