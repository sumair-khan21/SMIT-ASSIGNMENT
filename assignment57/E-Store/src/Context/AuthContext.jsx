import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    checkUser();
    
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Check current user
  const checkUser = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

 // Sign up with email and password
const signUp = async (email, password, fullName) => {
  try {
    setError(null);
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'customer' // Default role
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;

    // Check if email confirmation is required
    if (data?.user?.identities?.length === 0) {
      return { 
        success: false, 
        message: 'This email is already registered. Please login instead.' 
      };
    }

    await supabase.auth.signOut();
    setUser(null); 

    console.log('✅ User signed up successfully');

    return { 
      success: true, 
      message: 'Account created successfully!',
      user: data.user 
    };
  } catch (error) {
    console.error('❌ Signup error:', error);
    setError(error.message);
    return { 
      success: false, 
      message: error.message 
    };
  } finally {
    setLoading(false);
  }
};

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      setUser(data.user);
      return { 
        success: true, 
        message: 'Logged in successfully!',
        user: data.user 
      };
    } catch (error) {
      setError(error.message);
      return { 
        success: false, 
        message: error.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { 
        success: false, 
        message: error.message 
      };
    }
  };

  // Sign out
const signOut = async () => {
  try {
    setError(null);
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    setUser(null);
    
    localStorage.removeItem('supabase.auth.token');
    
    console.log('✅ User signed out successfully');
    
    return { success: true, message: 'Logged out successfully' };
  } catch (error) {
    console.error('❌ Logout error:', error);
    setError(error.message);
    return { 
      success: false, 
      message: error.message 
    };
  }
};

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return { 
        success: true, 
        message: 'Password reset email sent! Check your inbox.' 
      };
    } catch (error) {
      setError(error.message);
      return { 
        success: false, 
        message: error.message 
      };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) throw error;
      
      setUser(data.user);
      return { 
        success: true, 
        message: 'Profile updated successfully!' 
      };
    } catch (error) {
      setError(error.message);
      return { 
        success: false, 
        message: error.message 
      };
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.user_metadata?.role === 'admin';
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    isAdmin,
    checkUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};