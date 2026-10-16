import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

function Catalogue() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pre-populated seed catalogue representing global Islamic, Academic, and Neutral works
  const initialCatalogue = [
    // Islamic Books (Theology, Hadith, Quranic Sciences, Islamic History)
    { id: '1', title: 'Sahih al-Bukhari (Complete English Translation)', author: 'Imam Al-Bukhari', category: 'Islamic Books', description: 'The most authentic collection of Hadith, compiling thousands of verified sayings and actions of Prophet Muhammad (PBUH).', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    { id: '2', title: 'Sahih Muslim', author: 'Imam Muslim', category: 'Islamic Books', description: 'Renowned collection of prophetic traditions meticulously verified across generations of scholars.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    { id: '3', title: 'Al-Raheeq Al-Makhtum (The Sealed Nectar)', author: 'Safi-ur-Rahman al-Mubarakpuri', category: 'Islamic Books', description: 'Award-winning biography of the Prophet Muhammad (PBUH) detailing early Islamic history and struggles.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    { id: '4', title: 'Riyad as-Salihin (Gardens of the Righteous)', author: 'Imam an-Nawawi', category: 'Islamic Books', description: 'A classic manual of Islamic morals, ethics, and spiritual development derived from Quran and Sunnah.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    { id: '5', title: 'Ihya Ulum al-Din (Revival of Religious Sciences)', author: 'Imam Al-Ghazali', category: 'Islamic Books', description: 'Monumental masterpiece on Islamic spirituality, jurisprudence, and purification of the heart.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    { id: '6', title: 'Tafsir Ibn Kathir (Abridged)', author: 'Hafiz Ibn Kathir', category: 'Islamic Books', description: 'The most famous and accepted exegesis (Tafsir) of the Holy Quran explaining verses through traditions.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2000 },
    
    // Academic Research Works
    { id: '9', title: 'Advanced Algorithms in Distributed Systems & Cloud Infrastructure', author: 'Dr. A. R. Adeleke', category: 'Academic Research', description: 'Peer-reviewed research paper examining fault-tolerant cloud routing and high-throughput databases.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2500 },
    { id: '10', title: 'Molecular Genetics and CRISPR Gene Editing Technologies', author: 'Prof. Elizabeth Vance', category: 'Academic Research', description: 'Comprehensive academic breakdown of genomic modifications, ethical boundaries, and biomedical applications.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2500 },
    { id: '11', title: 'Macroeconomic Impacts of Digital Currencies in Emerging Markets', author: 'Dr. Chukwuma Okafor', category: 'Academic Research', description: 'An empirical economic study on inflation control, fintech adoption, and monetary policy across West Africa.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 2500 },

    // General Books (Philosophy, General Literature, Science)
    { id: '13', title: 'Meditations', author: 'Marcus Aurelius', category: 'General Books', description: 'Timeless Stoic reflections on self-discipline, emotional resilience, and personal ethics.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 1500 },
    { id: '14', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'General Books', description: 'Exploration of cosmology, black holes, quantum mechanics, and the origins of the universe.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 1500 },
    { id: '15', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'General Books', description: 'A sweeping narrative exploring how biology and history shaped human societies and civilizations.', fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', price: 1500 }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch from Firestore and combine with global catalogue items
  useEffect(() => {
    const loadCatalogue = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const firestoreBooks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Merge user uploads with our comprehensive global catalogue
        setBooks([...initialCatalogue, ...firestoreBooks]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading books:", error);
        setBooks(initialCatalogue); // Fallback to seed data
        setLoading(false);
      }
    };

    if (user) {
      loadCatalogue();
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (checkingAuth) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  if (!user) {
    return (
      <div style={{ textAlign: 'center', maxWidth: '500px', margin: '100px auto', color: '#fff' }}>
        <h2>Authentication Required</h2>
        <p style={{ color: '#cbd5e1', margin: '20px 0' }}>Please log in to access the Global E-Library Catalogue.</p>
        <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>Login Now</Link>
      </div>
    );
  }

  // Filter books based on category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '20px', color: '#fff' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ color: '#ffb703', margin: 0 }}>Addeen Global E-Library Catalogue</h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '5px' }}>
            Access world-class Islamic texts, academic papers, and general literature.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/upload" style={{ background: '#ffb703', color: '#000', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>Upload Work</Link>
          <button onClick={handleLogout} style={{ background: '#e63946', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '30px', justifyContent: 'space-between', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by book title or author across categories..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: '1', minWidth: '280px', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff' }}
        />
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Islamic Books', 'Academic Research', 'General Books', 'Author Uploads'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 15px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                background: selectedCategory === cat ? '#ffb703' : 'rgba(255,255,255,0.1)',
                color: selectedCategory === cat ? '#000' : '#fff'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#cbd5e1' }}>Loading catalogue items...</p>
      ) : filteredBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
          <p style={{ color: '#cbd5e1' }}>No matching books found in this category.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} userEmail={user.email} />
          ))}
        </div>
      )}
    </div>
  );
}

// Individual Book Card with Paystack integration
function BookCard({ book, userEmail }) {
  const payWithPaystack = () => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      let handler = window.PaystackPop.setup({
        key: 'pk_test_5f0172fdaa8509d71791fe726c64007af3518bc6',
        email: userEmail,
        amount: (book.price || 1000) * 100, // Amount in kobo
        currency: 'NGN',
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        callback: function(response) {
          alert('Payment successful! Reference: ' + response.reference);
          window.open(book.fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
        },
        onClose: function() {
          alert('Transaction closed.');
        }
      });
      handler.openIframe();
    };
    document.body.appendChild(script);
  };

  return (
    <div style={{ 
      background: 'rgba(255, 255, 255, 0.07)', 
      border: '1px solid rgba(255, 255, 255, 0.15)', 
      borderRadius: '12px', 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', background: '#1d3557', padding: '3px 8px', borderRadius: '4px', color: '#ffb703' }}>{book.category || 'General Books'}</span>
          <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>Verified</span>
        </div>
        <h3 style={{ color: '#ffb703', fontSize: '1.15rem', marginBottom: '5px' }}>{book.title}</h3>
        <h5 style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px' }}>By {book.author}</h5>
        <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '20px' }}>
          {book.description}
        </p>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem' }}>₦{book.price || 1000}</span>
          <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>PDF / E-Book</span>
        </div>
        <button 
          onClick={payWithPaystack}
          style={{ width: '100%', padding: '10px', textAlign: 'center', cursor: 'pointer', background: '#1d3557', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}
        >
          Pay & Download
        </button>
      </div>
    </div>
  );
}

export default Catalogue;