import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/reader?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/reader');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      
      {/* 1. Header / Navigation Bar */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e3a8a', letterSpacing: '-0.5px' }}>
              Addeen <span style={{ color: '#d97706' }}>E-Library</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center', fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>
            <Link to="/reader" style={{ textDecoration: 'none', color: '#334155' }}>Catalogue</Link>

            <Link to="/upload" style={{ textDecoration: 'none', color: '#334155' }}>Author Portal</Link>

          </nav>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', color: '#1e3a8a', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Sign In
            </Link>
            <Link to="/register" style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#1e3a8a', color: '#ffffff', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
              Register
            </Link>
          </div>
        </div>

        {/* Search Strip */}
        <div style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '12px 20px' }}>
          <form onSubmit={handleSearch} style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#475569', fontSize: '0.9rem' }}>Search by</span>
            <select 
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#334155', fontWeight: '500' }}
            >
              <option value="All">Catalogue</option>
              <option value="Fiqh">Fiqh</option>
              <option value="Hadith">Hadith</option>
              <option value="Tafseer">Tafseer</option>
              <option value="Academic">Academic Research</option>
            </select>
            <input 
              type="text" 
              placeholder="Search millions of Islamic texts, research papers, and books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: '8px 15px', borderRadius: '4px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.95rem' }}
            />
            <button 
              type="submit" 
              style={{ backgroundColor: '#16a34a', color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🔍 Search
            </button>
          </form>
        </div>
      </header>

      {/* 2. Hero Section with Banner Image and Floating "Top Requests" Box */}
      <section style={{ position: 'relative', width: '100%', minHeight: '380px', backgroundColor: '#0f172a', overflow: 'hidden' }}>
        
        {/* Background Image Banner */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          opacity: 0.65 
        }}></div>

        {/* Graphic Geometric Accents */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: '120px', height: '100%', backgroundColor: '#ec4899', clipPath: 'polygon(0 0, 0 100%, 100% 50%)', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '140px', height: '100%', backgroundColor: '#0284c7', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', opacity: 0.85 }}></div>

        {/* Hero Content Container */}
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '50px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '380px' }}>
          
          <div style={{ maxWidth: '600px', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '15px' }}>
              Welcome to Addeen E-Library
            </h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#f1f5f9' }}>
              Your global digital repository for classical Islamic literature, peer-reviewed academic research, and universal general works.
            </p>
          </div>

          {/* Floating "Top Requests" Card Overlay */}
          <div style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '4px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)', 
            width: '280px', 
            overflow: 'hidden', 
            zIndex: 10 
          }}>
            <div style={{ backgroundColor: '#000000', color: '#ffffff', padding: '12px 20px', fontWeight: 'bold', fontSize: '1.05rem' }}>
              Top requests
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {[
                { label: 'Account login', link: '/login' },
                { label: 'Register as Reader', link: '/register' },
                { label: 'Author Publishing Portal', link: '/upload' },
                { label: 'Browse Fiqh & Hadith', link: '/reader' },
                { label: 'Academic Research Papers', link: '/reader' },
                { label: 'Children\'s Collection', link: '/reader' }
              ].map((item, idx) => (
                <li key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <Link 
                    to={item.link} 
                    style={{ display: 'block', padding: '12px 20px', color: '#0284c7', textDecoration: 'none', fontSize: '0.92rem', fontWeight: '600' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 3. Feature Grid Cards */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px 60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          
          <Link to="/reader" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '2.5rem' }}>📖</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Islamic Literature</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>Explore Fiqh, Hadith, Tafseer, Seerah, and Aqeedah texts.</p>
              </div>
            </div>
          </Link>

          <Link to="/reader" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem' }}>🎓</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Academic Research</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>Peer-reviewed papers, journals, and university publications.</p>
              </div>
            </div>
          </Link>

          <Link to="/reader" style={{ textDecoration: 'none', color: '#334155' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem' }}>🎨</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Children's Collection</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>Illustrated stories of prophets and moral character building.</p>
              </div>
            </div>
          </Link>

          <Link to="/reader" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem' }}>📚</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Novels & Literature</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>African classics, general literature, and historical fiction.</p>
              </div>
            </div>
          </Link>

          <Link to="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem' }}>✍️</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Author Publishing</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>Publish your books to our repository and set custom access.</p>
              </div>
            </div>
          </Link>

          <Link to="/reader" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '2.5rem' }}>🔍</div>
              <div>
                <h3 style={{ margin: 0, color: '#0284c7', fontSize: '1.15rem', fontWeight: '700' }}>Using the Library</h3>
                <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '0.88rem' }}>Learn how Pay-and-Download and user memberships operate.</p>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '30px 20px', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} Addeen E-Library System. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;