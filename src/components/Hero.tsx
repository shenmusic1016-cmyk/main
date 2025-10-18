import { ArrowRight, Package, Globe, Clock } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div className="inline-block">
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Fast & Reliable Delivery
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Trusted
              <span className="text-orange-500"> Global Logistics</span> Partner
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Delivering excellence worldwide with innovative solutions, real-time tracking, and 24/7 customer support. Experience seamless logistics that keeps your business moving forward.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('tracking')}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 font-semibold flex items-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-orange-600/50"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
              >
                Our Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Globe className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Package className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-sm text-gray-400">Deliveries</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-3xl transform rotate-3 opacity-20 blur-2xl"></div>
              <img
                src="https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Logistics warehouse"
                className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 object-cover w-full h-[500px]"
              />

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">On-Time Delivery</div>
                    <div className="text-2xl font-bold text-gray-900">99.8%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
