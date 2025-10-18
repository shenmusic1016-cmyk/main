import { useEffect, useRef, useState } from 'react';
import { Truck, Plane, Ship, Package, MapPin, Shield } from 'lucide-react';

interface Service {
  icon: typeof Truck;
  title: string;
  description: string;
  image: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Truck,
    title: 'Ground Freight',
    description: 'Reliable road transportation for domestic and regional deliveries with real-time tracking.',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['Door-to-door delivery', 'Temperature controlled', 'Oversized cargo', 'Same-day service']
  },
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast international shipping solutions with priority handling and customs clearance.',
    image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['Express delivery', 'Global network', 'Customs support', 'Cargo insurance']
  },
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Cost-effective sea transportation for bulk shipments with full container services.',
    image: 'https://images.pexels.com/photos/2144905/pexels-photo-2144905.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['FCL & LCL options', 'Port-to-port', 'Hazmat certified', 'Bulk shipping']
  },
  {
    icon: Package,
    title: 'Warehousing',
    description: 'Secure storage facilities with inventory management and distribution services.',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['Climate control', 'Security 24/7', 'Inventory tracking', 'Pick & pack']
  },
  {
    icon: MapPin,
    title: 'Last Mile Delivery',
    description: 'Efficient final-stage delivery with flexible scheduling and customer notifications.',
    image: 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['Flexible timing', 'SMS updates', 'Contactless option', 'Returns handling']
  },
  {
    icon: Shield,
    title: 'Customs Brokerage',
    description: 'Expert customs clearance and compliance services for international shipments.',
    image: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: ['Documentation', 'Duty calculation', 'Compliance check', 'Fast processing']
  }
];

export default function Services() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const scrollPosition = window.scrollY - sectionTop + window.innerHeight / 2;
        setScrollY(scrollPosition);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Comprehensive Logistics Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From air to ocean, ground to warehousing - we provide end-to-end logistics services tailored to your business needs
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            const parallaxOffset = (scrollY - index * 200) * 0.1;

            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300`}
              >
                <div className="md:w-1/2 h-[400px] overflow-hidden relative">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(${Math.max(-50, Math.min(50, parallaxOffset))}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <div className="md:w-1/2 p-8 md:p-12">
                  <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-orange-600" />
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center space-x-2">
                    <span>Learn More</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
