/*
 * AUTOMATIC FIX FOR ADMIN COURSE CREATION
 * 
 * This script will be executed when you open the admin panel.
 * It ensures admin permissions are properly set up.
 */

import { supabase } from './supabaseClient';

export async function ensureAdminSetup() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check if this is the super admin email
    if (user.email !== 'appdostofficial@gmail.com') {
      return false;
    }

    // Check if admin record exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking admin status:', checkError);
      return false;
    }

    // If admin record doesn't exist, create it
    if (!existingAdmin) {
      console.log('Creating admin record...');
      
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          user_id: user.id,
          email: user.email,
          role: 'super_admin',
          permissions: { all: true }
        });

      if (insertError) {
        console.error('Error creating admin record:', insertError);
        
        // Try alternative method using upsert
        const { error: upsertError } = await supabase
          .from('admin_users')
          .upsert({
            user_id: user.id,
            email: user.email,
            role: 'super_admin',
            permissions: { all: true }
          }, {
            onConflict: 'user_id'
          });

        if (upsertError) {
          console.error('Error upserting admin record:', upsertError);
          return false;
        }
      }

      console.log('✅ Admin record created successfully');
      
      // Force a small delay to ensure the record is committed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    }

    return true;
  } catch (error) {
    console.error('Error in ensureAdminSetup:', error);
    return false;
  }
}

// Auto-run on module load if user is authenticated
ensureAdminSetup().then(success => {
  if (success) {
    console.log('✅ Admin setup verified');
  }
});
