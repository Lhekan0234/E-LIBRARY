import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import lib2Bg from '../components/lib_2.jpeg';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a Portal Category (Reader or Author).");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        email: email.trim(),
        category,
        createdAt: serverTimestamp()
      });

      setLoading(false);
      alert('Registration successful!');

      if (category === 'author') {
        navigate('/upload');
      } else {
        navigate('/reader');
      }
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      alert('Error registering user: ' + error.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${lib2Bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '460px', 
        width: '100%', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)', 
        padding: '35px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ color: '#1e3a8a', marginTop: 0, marginBottom: '20px', textAlign: 'center', fontWeight: '800' }}>
          Create Member Account
        </h2>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Enter your full name"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter email address"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Password (Min. 6 chars)</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Create password"
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Portal Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem', backgroundColor: '#ffffff', color: '#1e293b' }}
            >
              <option value="">Select Category</option>
              <option value="reader">Reader (Browse & Pay for Books)</option>
              <option value="author">Author (Publish & Upload Books)</option>
            </select>
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
              cursor: 'pointer' 
            }}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '0.9rem' }}>
          Already registered? <Link to="/login" style={{ color: '#d97706', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;