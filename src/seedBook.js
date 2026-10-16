import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const sampleBooks = [
  // --- ISLAMIC BOOKS (Classics & Global Scholarly Works) ---
  {
    title: "Sahih al-Bukhari (English Translation & Commentary)",
    author: "Imam Muhammad al-Bukhari",
    category: "Islamic Books",
    description: "The most authentic compilation of Hadith, covering matters of faith, jurisprudence, and daily Islamic ethics.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },
  {
    title: "Ihya Ulum al-Din (Revival of the Religious Sciences)",
    author: "Imam Al-Ghazali",
    category: "Islamic Books",
    description: "A monumental masterpiece on Islamic spirituality, moral psychology, and the inner dimensions of worship.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },
  {
    title: "Al-Raheeq Al-Makhtum (The Sealed Nectar)",
    author: "Safi-ur-Rahman al-Mubarakpuri",
    category: "Islamic Books",
    description: "Award-winning biographical study of the noble Prophet Muhammad (PBUH) highlighting historical contexts.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },
  {
    title: "Tafsir Ibn Kathir (Abridged)",
    author: "Hafiz Ibn Kathir",
    category: "Islamic Books",
    description: "One of the most comprehensive and accepted explanations of the Holy Quran using authentic traditions.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1500
  },
  {
    title: "Riyad as-Salihin (Gardens of the Righteous)",
    author: "Imam an-Nawawi",
    category: "Islamic Books",
    description: "A timeless collection of verses and authentic ahadith focusing on character development and spiritual discipline.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },

  // --- ACADEMIC RESEARCH WORKS ---
  {
    title: "Machine Learning Applications in West African E-Learning Platforms",
    author: "Dr. A. O. Balogun (LASU)",
    category: "Academic Research",
    description: "Peer-reviewed research exploring recommendation systems and payment gateway integrations for tertiary digital libraries.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 2000
  },
  {
    title: "Comparative Legal Frameworks of Islamic Banking in Sub-Saharan Africa",
    author: "Prof. H. M. Sanni",
    category: "Academic Research",
    description: "An analytical study on the economic viability and regulatory compliance of non-interest financing models.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 2000
  },
  {
    title: "Optimization of Distributed Cloud Databases for High-Traffic Educational Portals",
    author: "Engr. T. J. Adeleke",
    category: "Academic Research",
    description: "Technical whitepaper evaluating Firestore and NoSQL latency bottlenecks under high concurrent read/write loads.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 2000
  },

  // --- GENERAL BOOKS & LITERATURE ---
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    category: "General Books",
    description: "The seminal African novel capturing the complex impact of colonial encounters on traditional Igbo society.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },
  {
    title: "Atomic Habits: Proven Ways to Build Good Habits & Break Bad Ones",
    author: "James Clear",
    category: "General Books",
    description: "A practical guide on how small changes can produce remarkable behavioral results in daily productivity and study.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1000
  },
  {
    title: "Introduction to Algorithms in Modern Software Engineering",
    author: "Thomas H. Cormen",
    category: "General Books",
    description: "Comprehensive textbook covering data structures, sorting algorithms, graph theory, and computational complexity.",
    fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 1500
  }
];

export const seedDatabase = async () => {
  try {
    for (let book of sampleBooks) {
      await addDoc(collection(db, "books"), book);
    }
    console.log("Database seeded successfully with categories!");
    alert("Catalogue successfully populated with initial books!");
  } catch (error) {
    console.error("Error seeding database: ", error);
    alert("Seeding failed: " + error.message);
  }
};