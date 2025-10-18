import { useState } from 'react';
import { Package, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <Package className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-gray-900">GD<span className="text-orange-600">Express</span></span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('tracking')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Track Shipment
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Contact
            </button>
            <button
              onClick={() => scrollToSection('tracking')}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Get Quote
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('tracking')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md font-medium"
            >
              Track Shipment
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection('tracking')}
              className="block w-full text-left px-3 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-md font-medium mt-2"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
