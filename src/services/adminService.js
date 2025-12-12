import { supabase } from '../lib/supabaseClient';

/**
 * Admin Service - Handles all admin-related operations with NEW SCHEMA
 */

// Check if current user is admin
export async function isAdmin() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check admin_users table
    const { data: adminCheck } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminCheck) {
      return true;
    }

    // If admin record doesn't exist, they need to run SQL fix
    return false;

    // Check admin_users table for other admins
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isAdmin:', error);
    return false;
  }
}

// Get admin user details
export async function getAdminDetails() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting admin details:', error);
    return null;
  }
}

// ============================================================================
// COURSE MANAGEMENT
// ============================================================================

export async function getAllCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

export async function getCourseById(courseId) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}

export async function createCourse(courseData) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Check admin status
    const { data: adminCheck } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!adminCheck) {
      throw new Error(
        'Admin record not found. Please run the SQL fix from ADMIN_FIX.html:\n' +
        '1. Open ADMIN_FIX.html\n' +
        '2. Copy the SQL\n' +
        '3. Run it in Supabase SQL Editor\n' +
        '4. Log out and log back in'
      );
    }

    // Insert the course - use maybeSingle() to avoid error if no row returned
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select();

    if (error) {
      if (error.message.includes('row-level security')) {
        throw new Error(
          'RLS Policy Error: The database policies are not set correctly.\n\n' +
          'SOLUTION:\n' +
          '1. Open ADMIN_FIX.html (in your project folder)\n' +
          '2. Click "Copy SQL to Clipboard"\n' +
          '3. Go to https://supabase.com/dashboard/project/hhdronajrkxnetwqppkg/sql/new\n' +
          '4. Paste and click "Run"\n' +
          '5. Log out and log back in\n\n' +
          'This will fix the permissions permanently.'
        );
      }
      throw error;
    }

    // Return the first item if array, or the data itself
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function updateCourse(courseId, updates) {
  try {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', courseId)
      .select();

    if (error) throw error;
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}

// ============================================================================
// ORDER MANAGEMENT
// ============================================================================

export async function getAllOrders(filters = {}) {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        profiles!orders_user_id_fkey(full_name, email)
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('payment_status', filters.status);
    }
    if (filters.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters.search) {
      query = query.or(`course_title.ilike.%${filters.search}%,order_id.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export async function getOrderById(orderId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles!orders_user_id_fkey(full_name, email, phone)
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// ============================================================================
// ENROLLMENT MANAGEMENT
// ============================================================================

export async function getAllEnrollments(filters = {}) {
  try {
    let query = supabase
      .from('enrollments')
      .select(`
        *,
        profiles!enrollments_user_id_fkey(full_name, email)
      `)
      .order('enrolled_at', { ascending: false });

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.branch) {
      query = query.eq('branch', filters.branch);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
}

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

export async function getDashboardStats() {
  try {
    // Get total courses
    const { count: totalCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    // Get total orders
    const { count: totalOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });

    // Get successful payments
    const { count: successfulPayments, data: paymentsData } = await supabase
      .from('orders')
      .select('price_cents', { count: 'exact' })
      .eq('payment_status', 'success');

    // Calculate total revenue
    const totalRevenue = paymentsData?.reduce((sum, order) => sum + (order.price_cents || 0), 0) || 0;

    // Get total enrollments
    const { count: totalEnrollments } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Get recent orders
    const { data: recentOrders } = await supabase
      .from('orders')
      .select(`
        *,
        profiles!orders_user_id_fkey(full_name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    return {
      totalCourses: totalCourses || 0,
      totalOrders: totalOrders || 0,
      successfulPayments: successfulPayments || 0,
      totalRevenue: totalRevenue / 100, // Convert from paise to rupees
      totalEnrollments: totalEnrollments || 0,
      recentOrders: recentOrders || []
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}

export async function getRevenueByMonth(months = 6) {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const { data, error } = await supabase
      .from('orders')
      .select('created_at, price_cents, payment_status')
      .eq('payment_status', 'success')
      .gte('created_at', startDate.toISOString());

    if (error) throw error;

    // Group by month
    const monthlyRevenue = {};
    data?.forEach(order => {
      const month = new Date(order.created_at).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (order.price_cents / 100);
    });

    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue
    }));
  } catch (error) {
    console.error('Error fetching revenue by month:', error);
    throw error;
  }
}

export async function getCourseEnrollmentStats() {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select('course_title, branch')
      .eq('status', 'active');

    if (error) throw error;

    // Count enrollments by course
    const courseCounts = {};
    data?.forEach(enrollment => {
      const key = enrollment.course_title;
      courseCounts[key] = (courseCounts[key] || 0) + 1;
    });

    return Object.entries(courseCounts)
      .map(([course, count]) => ({ course, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 courses
  } catch (error) {
    console.error('Error fetching course enrollment stats:', error);
    throw error;
  }
}
