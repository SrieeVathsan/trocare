import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userData from '../data/userLoginData.json'; // ✅ mock data
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

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = form;

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // ✅ Compare with mock data from JSON
    if (email === userData.email && password === userData.password) {
      document.cookie = 'jwt=mockToken123; path=/'; // Simulate auth token
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin} noValidate>
        <div className="login-icon">
          <img src={require('../assets/login-icon.png')} alt="Login Icon" />
        </div>
        <h2>Welcome Back</h2>
        <p>Please sign in to your account</p>

        {error && <p className="error-msg">{error}</p>}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
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
              alt={showPassword ? 'Hide password' : 'Show password'}
            />
          </span>
        </div>

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
        </div>

        <button type="submit" className="btn">Sign In</button>

        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;