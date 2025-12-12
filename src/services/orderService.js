import { supabase } from '../lib/supabaseClient';

/**
 * Fetch all orders for the current user
 * @returns {Promise<Array>} Array of orders with enrollment status
 */
export async function fetchUserOrders() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('user_order_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    throw error;
  }
}

/**
 * Fetch a specific order by order_id
 * @param {string} orderId - The order ID to fetch
 * @returns {Promise<Object>} Order details
 */
export async function fetchOrderById(orderId) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('user_order_history')
      .select('*')
      .eq('user_id', user.id)
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
}

/**
 * Fetch pending orders (payment initiated but not completed)
 * @returns {Promise<Array>} Array of pending orders
 */
export async function fetchPendingOrders() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .eq('payment_status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pending orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch pending orders:', error);
    throw error;
  }
}

/**
 * Fetch failed orders
 * @returns {Promise<Array>} Array of failed orders
 */
export async function fetchFailedOrders() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .eq('payment_status', 'failed')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching failed orders:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch failed orders:', error);
    throw error;
  }
}

/**
 * Get order statistics for current user
 * @returns {Promise<Object>} Order statistics
 */
export async function getOrderStatistics() {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('orders')
      .select('payment_status, amount_cents')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching order statistics:', error);
      throw error;
    }

    const stats = {
      total: data.length,
      successful: data.filter(o => o.payment_status === 'success').length,
      pending: data.filter(o => o.payment_status === 'pending').length,
      failed: data.filter(o => o.payment_status === 'failed').length,
      totalSpent: data
        .filter(o => o.payment_status === 'success')
        .reduce((sum, o) => sum + (o.amount_cents || 0), 0),
    };

    return stats;
  } catch (error) {
    console.error('Failed to fetch order statistics:', error);
    throw error;
  }
}

/**
 * Create a pending order record before redirecting to payment
 * so the backend can complete enrollment even if local storage is cleared.
 */
export async function createPendingOrder({ userId, orderId, course, priceCents, currency = 'INR' }) {
  if (!userId) throw new Error('User ID is required');
  if (!orderId) throw new Error('Order ID is required');

  const payload = {
    user_id: userId,
    order_id: orderId,
    course_id: course?.id || null,
    course_title: course?.name || course?.title || 'Course',
    course_slug: course?.slug || course?.skillId || '',
    instructor_name: course?.instructor || course?.instructor_name || '',
    course_image: course?.image || course?.cover_image || '',
    amount_cents: typeof priceCents === 'number' ? priceCents : 0,
    currency,
    payment_status: 'pending',
    status: 'processing',
  };

  if (!payload.course_slug) {
    throw new Error('Course reference missing');
  }

  const { data, error } = await supabase
    .from('orders')
    .upsert(payload, { onConflict: 'order_id' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export default {
  fetchUserOrders,
  fetchOrderById,
  fetchPendingOrders,
  fetchFailedOrders,
  getOrderStatistics,
  createPendingOrder,
};
