import { createClient } from '@supabase/supabase-js';

// VITE uses import.meta.env (not process.env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables!');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
  throw new Error(
    '⚠️ Missing Supabase environment variables! Check your .env file and restart the dev server.'
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper: Check if user is admin
export const isAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.user_metadata?.role === 'admin';
};

// Helper: Handle Supabase errors
export const handleSupabaseError = (error) => {
  console.error('Supabase error:', error);
  return {
    success: false,
    error: error.message || 'An unknown error occurred'
  };
};

// Test connection (for debugging)
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('pandacategories')
      .select('count');
    
    if (error) throw error;
    console.log('✅ Supabase connected successfully!');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return false;
  }
};

// Log connection status on import (helpful for debugging)
console.log('🔌 Supabase Client Initialized');
console.log('📍 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseAnonKey ? '✓ Present' : '✗ Missing');