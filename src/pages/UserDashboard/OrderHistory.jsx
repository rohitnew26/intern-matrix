import { useState, useEffect } from 'react';
import { fetchUserOrders } from '../../services/orderService';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, success, pending, failed

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.payment_status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      success: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Success' },
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
      failed: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Failed' },
    };

    const config = statusConfig[status] || { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatAmount = (cents) => {
    return `₹${(cents / 100).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Order History</h2>
        <div className="flex gap-2 flex-wrap">
          {['all', 'success', 'pending', 'failed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterType
                  ? 'bg-yellow-500 text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-lg">
          <p className="text-gray-400 text-lg">No orders found</p>
          <p className="text-gray-500 text-sm mt-2">
            {filter !== 'all' ? `No ${filter} orders to display` : 'Start learning by enrolling in courses'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                {/* Course Info */}
                <div className="flex gap-4 flex-1 w-full">
                  {order.course_image && (
                    <img
                      src={order.course_image}
                      alt={order.course_title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {order.course_title}
                    </h3>
                    {order.instructor_name && (
                      <p className="text-sm text-gray-400 mb-2">
                        by {order.instructor_name}
                      </p>
                    )}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm text-gray-500">
                      <span className="break-all">Order ID: {order.order_id}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{formatDate(order.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Amount */}
                <div className="text-left md:text-right space-y-2 w-full md:w-auto">
                  {getStatusBadge(order.payment_status)}
                  <p className="text-2xl font-bold text-white">
                    {formatAmount(order.amount_cents)}
                  </p>
                  {order.enrollment_id && (
                    <p className="text-xs text-green-400 font-medium">
                      ✓ Enrolled
                    </p>
                  )}
                  {order.error_message && (
                    <p className="text-xs text-red-400">
                      {order.error_message}
                    </p>
                  )}
                </div>
              </div>

              {/* Additional Info */}
              {order.payment_verified && (
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Payment Verified</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

