import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const DebugUser = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserData(user);
      console.log('🔍 User Metadata:', user?.user_metadata);
      console.log('🔍 User Role:', user?.user_metadata?.role);
    };
    checkUser();
  }, []);

  if (!userData) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p>Email: {userData.email}</p>
      <p>Role: <span className="font-bold text-yellow-300">{userData.user_metadata?.role || 'NO ROLE'}</span></p>
      <p className="text-green-300 mt-2">
        {userData.user_metadata?.role === 'admin' ? '✅ Is Admin' : '❌ Not Admin'}
      </p>
    </div>
  );
};

export default DebugUser;