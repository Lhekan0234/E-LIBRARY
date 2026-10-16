import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import lib1Bg from '../components/lib_1.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      setLoading(false);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.category === 'reader') {
          navigate('/reader');
        } else if (userData.category === 'author') {
          navigate('/upload');
        } else {
          navigate('/reader');
        }
      } else {
        // Fallback default routing if role document is missing
        navigate('/reader');
      }
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${lib1Bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '440px', 
        width: '100%', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)', 
        padding: '35px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0, marginBottom: '20px', textAlign: 'center', fontWeight: '800' }}>
          Addeen E-Library Login
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter registered email"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter password"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#1e3a8a', 
              color: '#ffffff', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              fontSize: '1rem', 
              cursor: 'pointer',
              marginBottom: '15px' 
            }}
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
            <Link to="/reset-password" style={{ color: '#d97706', textDecoration: 'none', fontWeight: '600' }}>
              Reset Password?
            </Link>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '15px', borderTop: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.9rem' }}>
          Click <Link to="/register" style={{ color: '#1e3a8a', fontWeight: 'bold', textDecoration: 'underline' }}>here</Link> to register
        </div>
      </div>
    </div>
  );
}

export default Login;