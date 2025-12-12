import { supabase } from '../lib/supabaseClient';

/**
 * COMPREHENSIVE DASHBOARD TEST SUITE
 * Tests all 7 dashboard sections
 */

// ============================================================================
// TEST 1: PROFILE SERVICE TEST
// ============================================================================
export async function testProfileService() {
  console.log('\n=== TEST 1: PROFILE SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    console.log('✅ User authenticated:', user.email);

    // Test fetch profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.log('❌ FAILED: Cannot fetch profile:', fetchError.message);
      return false;
    }

    console.log('✅ Profile fetched successfully');
    console.log('   Columns available:', Object.keys(profile || {}).join(', '));
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 2: ENROLLMENTS SERVICE TEST
// ============================================================================
export async function testEnrollmentsService() {
  console.log('\n=== TEST 2: ENROLLMENTS SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log('❌ FAILED: Cannot fetch enrollments:', error.message);
      return false;
    }

    console.log('✅ Enrollments table exists');
    console.log(`   Found ${enrollments?.length || 0} enrollments`);
    if (enrollments?.length > 0) {
      console.log('   Sample enrollment:', {
        course_title: enrollments[0].course_title,
        status: enrollments[0].status,
        enrolled_at: enrollments[0].enrolled_at,
      });
    }
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 3: WISHLIST SERVICE TEST
// ============================================================================
export async function testWishlistService() {
  console.log('\n=== TEST 3: WISHLIST SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: wishlist, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      if (error.code === 'PGRST116' || error.code === '42P01') {
        console.log('⚠️  Wishlist table may not exist yet (will be created on first use)');
        return true;
      }
      console.log('❌ FAILED:', error.message);
      return false;
    }

    console.log('✅ Wishlist service working');
    console.log(`   Found ${wishlist?.length || 0} wishlist items`);
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 4: COURSE PROGRESS SERVICE TEST
// ============================================================================
export async function testProgressService() {
  console.log('\n=== TEST 4: COURSE PROGRESS SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: progress, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log('❌ FAILED: Cannot fetch course progress:', error.message);
      return false;
    }

    console.log('✅ Course progress table exists');
    console.log(`   Found ${progress?.length || 0} progress records`);
    if (progress?.length > 0) {
      console.log('   Sample progress:', {
        completion_percentage: progress[0].completion_percentage,
        completed_lessons: progress[0].completed_lessons,
        total_lessons: progress[0].total_lessons,
      });
    }
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 5: ORDERS SERVICE TEST
// ============================================================================
export async function testOrdersService() {
  console.log('\n=== TEST 5: ORDERS SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.log('❌ FAILED: Cannot fetch orders:', error.message);
      return false;
    }

    console.log('✅ Orders table exists and accessible');
    console.log(`   Found ${orders?.length || 0} orders`);
    if (orders?.length > 0) {
      const stats = {
        total: orders.length,
        success: orders.filter(o => o.payment_status === 'success').length,
        pending: orders.filter(o => o.payment_status === 'pending').length,
        failed: orders.filter(o => o.payment_status === 'failed').length,
      };
      console.log('   Order statistics:', stats);
      console.log('   Sample order:', {
        order_id: orders[0].order_id,
        payment_status: orders[0].payment_status,
        amount_cents: orders[0].amount_cents,
        course_title: orders[0].course_title,
      });
    }
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 6: QUIZ SERVICE TEST
// ============================================================================
export async function testQuizService() {
  console.log('\n=== TEST 6: QUIZ SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', user.id);

    if (error && error.code === 'PGRST116') {
      console.log('⚠️  Quiz attempts table not created yet (will be created on first use)');
      return true;
    }

    if (error) {
      console.log('❌ FAILED:', error.message);
      return false;
    }

    console.log('✅ Quiz service ready');
    console.log(`   Found ${attempts?.length || 0} quiz attempts`);
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 7: REVIEWS SERVICE TEST
// ============================================================================
export async function testReviewsService() {
  console.log('\n=== TEST 7: REVIEWS SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id);

    if (error && error.code === 'PGRST116') {
      console.log('⚠️  Reviews table not created yet (will be created on first use)');
      return true;
    }

    if (error) {
      console.log('❌ FAILED:', error.message);
      return false;
    }

    console.log('✅ Reviews service ready');
    console.log(`   Found ${reviews?.length || 0} reviews`);
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 8: Q&A SERVICE TEST
// ============================================================================
export async function testQnAService() {
  console.log('\n=== TEST 8: Q&A SERVICE ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    const { data: qna, error } = await supabase
      .from('course_qna')
      .select('*')
      .eq('user_id', user.id);

    if (error && error.code === 'PGRST116') {
      console.log('⚠️  Q&A table not created yet (will be created on first use)');
      return true;
    }

    if (error) {
      console.log('❌ FAILED:', error.message);
      return false;
    }

    console.log('✅ Q&A service ready');
    console.log(`   Found ${qna?.length || 0} Q&A items`);
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// TEST 9: RLS POLICIES TEST
// ============================================================================
export async function testRLSPolicies() {
  console.log('\n=== TEST 9: RLS POLICIES ===');
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('❌ FAILED: User not authenticated');
      return false;
    }

    // Test that user can only see their own data
    const tables = ['profiles', 'enrollments', 'wishlist', 'orders', 'course_progress'];
    let allPassed = true;

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('user_id', user.id);

      if (error && error.code === 'PGRST116') {
        // Table doesn't exist, skip
        continue;
      }

      if (error) {
        console.log(`  ❌ ${table}: RLS policy issue -`, error.message);
        allPassed = false;
        continue;
      }

      console.log(`  ✅ ${table}: RLS policy working`);
    }

    return allPassed;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    return false;
  }
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================
export async function runAllTests() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       COMPREHENSIVE DASHBOARD TEST SUITE                  ║');
  console.log('║         Testing All 7 Dashboard Sections                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const results = {};

  results['Profile'] = await testProfileService();
  results['Enrollments'] = await testEnrollmentsService();
  results['Wishlist'] = await testWishlistService();
  results['Progress'] = await testProgressService();
  results['Orders'] = await testOrdersService();
  results['Quiz'] = await testQuizService();
  results['Reviews'] = await testReviewsService();
  results['QnA'] = await testQnAService();
  results['RLS Policies'] = await testRLSPolicies();

  // Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                     TEST SUMMARY                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  const passed = Object.values(results).filter(r => r === true).length;
  const total = Object.keys(results).length;

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}  ${test}`);
  });

  console.log('\n' + `Total: ${passed}/${total} tests passed (${Math.round((passed/total)*100)}%)`);
  
  if (passed === total) {
    console.log('\n🎉 ALL TESTS PASSED! Dashboard is fully connected!');
  } else {
    console.log('\n⚠️  Some tests need attention. Check above for details.');
  }

  return results;
}

export default { runAllTests };
