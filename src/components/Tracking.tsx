import { useState } from 'react';
import { Search, Package, MapPin, Calendar, Weight, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
import { supabase, Shipment } from '../lib/supabase';

export default function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trackingNumber.trim())
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) {
        setError('Shipment not found. Please check your tracking number and try again.');
      } else {
        setShipment(data);
      }
    } catch (err) {
      setError('An error occurred while tracking your shipment. Please try again.');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'in_transit':
        return <Truck className="h-6 w-6 text-blue-600" />;
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      case 'customs':
        return <Package className="h-6 w-6 text-orange-600" />;
      default:
        return <Package className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'customs':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="tracking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-orange-600 font-semibold text-sm uppercase tracking-wide">Track Your Shipment</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Real-Time Shipment Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enter your tracking number to get instant updates on your shipment's location and status
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="relative">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., GDX1234567890)"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-lg"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>{loading ? 'Tracking...' : 'Track'}</span>
              </button>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try sample:</span>
            {['GDX1234567890', 'GDX0987654321', 'GDX5555666777'].map((sample) => (
              <button
                key={sample}
                onClick={() => setTrackingNumber(sample)}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium underline"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {shipment && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-6">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Tracking Number</div>
                    <div className="text-2xl font-bold">{shipment.tracking_number}</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    {getStatusIcon(shipment.status)}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-center mb-8">
                  <span className={`px-6 py-3 rounded-full font-semibold text-lg ${getStatusColor(shipment.status)}`}>
                    {formatStatus(shipment.status)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Sender Information</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-medium text-gray-900">{shipment.sender_name}</div>
                      <div className="text-gray-600 flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{shipment.sender_location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Receiver Information</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg font-medium text-gray-900">{shipment.receiver_name}</div>
                      <div className="text-gray-600 flex items-start space-x-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{shipment.receiver_location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  {shipment.current_location && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Current Location</div>
                      <div className="font-semibold text-gray-900 flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span>{shipment.current_location}</span>
                      </div>
                    </div>
                  )}

                  {shipment.estimated_delivery && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Estimated Delivery</div>
                      <div className="font-semibold text-gray-900 flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span>{formatDate(shipment.estimated_delivery)}</span>
                      </div>
                    </div>
                  )}

                  {shipment.weight && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Package Weight</div>
                      <div className="font-semibold text-gray-900 flex items-center space-x-2">
                        <Weight className="h-4 w-4 text-orange-600" />
                        <span>{shipment.weight} kg</span>
                      </div>
                    </div>
                  )}

                  {shipment.package_type && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Package Type</div>
                      <div className="font-semibold text-gray-900">{shipment.package_type}</div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 text-center">
                    Last updated: {formatDate(shipment.updated_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
