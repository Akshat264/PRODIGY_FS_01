import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const onLogin = (username) => {
          navigate('/', { state: { username } }); // Redirect to the root page with username
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        const data = await response.json();
        if (data.message === 'Login successful') {
            localStorage.setItem('token', data.token);
            onLogin(data.name); // Handle post-login actions (e.g., storing token, redirecting)
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>

            {/* Links to Register and Forgot Password */}
            <div className="login-links">
                <p>
                    Don't have an account? <Link to="/register" className="link">Register here</Link>
                </p>
                <p>
                    Forgot your password? <Link to="/forgot-password" className="link">Reset it here</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
