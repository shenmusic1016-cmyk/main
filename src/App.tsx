import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Tracking from './components/Tracking';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Tracking />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
