import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const AuthConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Get all possible token parameters
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');

        console.log('🔍 Confirmation params:', { token_hash, type, access_token: !!access_token });

        // ✨ METHOD 1: Handle PKCE flow (token_hash)
        if (token_hash && type === 'signup') {
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'signup',
          });

          if (error) throw error;

          // ✨ Sign out immediately after confirmation
          await supabase.auth.signOut();

          setStatus('success');
          setMessage('Email confirmed successfully!');

          setTimeout(() => {
            navigate('/login', { 
              state: { message: '✅ Email confirmed! Please login to continue.' } 
            });
          }, 3000);
          return;
        }

        // ✨ METHOD 2: Handle old flow (access_token in URL)
        if (access_token) {
          // Sign out the auto-logged-in session
          await supabase.auth.signOut();

          setStatus('success');
          setMessage('Email confirmed successfully!');

          setTimeout(() => {
            navigate('/login', { 
              state: { message: '✅ Email confirmed! Please login to continue.' } 
            });
          }, 3000);
          return;
        }

        // ✨ METHOD 3: Check if already confirmed via session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // User is already logged in from email confirmation
          await supabase.auth.signOut();

          setStatus('success');
          setMessage('Email confirmed successfully!');

          setTimeout(() => {
            navigate('/login', { 
              state: { message: '✅ Email confirmed! Please login to continue.' } 
            });
          }, 3000);
          return;
        }

        // If none of the above, show error
        setStatus('error');
        setMessage('Invalid or expired confirmation link');

      } catch (error) {
        console.error('❌ Confirmation error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to confirm email. The link may have expired.');
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {status === 'loading' && (
          <div className="text-center">
            <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Confirming your email...
            </h2>
            <p className="text-gray-600">Please wait a moment</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="text-6xl mb-4 animate-bounce">🐼</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Price Panda! 🎉
            </h2>
            <p className="text-gray-600 mb-4 text-lg">{message}</p>
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 mb-4">
              <p className="text-indigo-800 font-semibold">
                ✅ Your account is now verified!
              </p>
            </div>
            <div className="animate-pulse text-indigo-600 font-semibold">
              Redirecting to login page...
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Confirmation Failed
            </h2>
            <p className="text-red-600 mb-6">{message}</p>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 text-sm">
                💡 The confirmation link may have expired. Please try signing up again.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/signup')}
                className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Sign Up Again
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthConfirm;