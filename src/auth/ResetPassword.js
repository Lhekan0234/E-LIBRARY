import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      alert('Error sending reset email: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: '20px', fontSize: '0.95rem' }}>
        Enter your registered LASU E-Library email address and we will send you a link to reset your password.
      </p>
      
      <form onSubmit={handleResetPassword}>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>

      <div className="auth-links" style={{ textAlign: 'center', marginTop: '20px' }}>
        Remembered your password? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
}

export default ResetPassword;